%%% @doc Mesh publish proxy for Martha.
%%%
%%% In-VM mode: publishes directly via hecate_mesh (same BEAM VM).
%%% Standalone mode: routes via OTP pg process groups to hecate-daemon.
%%%
%%% The module auto-detects the mode by checking if hecate_mesh is
%%% loaded and exported.
%%% @end
-module(app_marthad_mesh_proxy).

-export([publish/2]).

%% hecate_mesh is dynamically loaded (only present in-VM)
-dialyzer({nowarn_function, try_hecate_mesh/2}).

-define(PG_SCOPE, hecate_app_marthad).
-define(PG_GROUP, martha_mesh_bridge).

-spec publish(Topic :: binary(), Payload :: map()) -> ok | {error, not_connected}.
publish(Topic, Payload) ->
    case try_hecate_mesh(Topic, Payload) of
        ok -> ok;
        unavailable -> publish_via_pg(Topic, Payload)
    end.

%%% Internal

try_hecate_mesh(Topic, Payload) ->
    case code:ensure_loaded(hecate_mesh) of
        {module, hecate_mesh} ->
            case erlang:function_exported(hecate_mesh, publish, 2) of
                true ->
                    hecate_mesh:publish(Topic, Payload),
                    ok;
                false ->
                    unavailable
            end;
        _ ->
            unavailable
    end.

publish_via_pg(Topic, Payload) ->
    Members = get_bridge_members(),
    case Members of
        [] ->
            logger:warning("[app_marthad_mesh_proxy] No mesh bridge members, "
                          "dropping publish to ~s", [Topic]),
            {error, not_connected};
        _ ->
            Msg = {mesh_publish, Topic, Payload},
            lists:foreach(fun(Pid) -> Pid ! Msg end, Members),
            ok
    end.

get_bridge_members() ->
    try pg:get_members(?PG_SCOPE, ?PG_GROUP) of
        Members -> Members
    catch
        error:_ -> []
    end.
