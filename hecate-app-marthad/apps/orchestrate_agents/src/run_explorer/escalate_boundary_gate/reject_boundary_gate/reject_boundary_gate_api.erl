%%% @doc HTTP handler for rejecting the boundary_gate.
-module(reject_boundary_gate_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/explorer/gates/boundary-gate/reject", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} -> do_reject(Params, Req1);
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_reject(Params, Req) ->
    SessionId = hecate_plugin_api:get_field(session_id, Params),
    case SessionId of
        undefined ->
            hecate_plugin_api:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                rejected_by => hecate_plugin_api:get_field(rejected_by, Params),
                rejection_reason => hecate_plugin_api:get_field(rejection_reason, Params)
            },
            case reject_boundary_gate_v1:new(CmdParams) of
                {ok, _Cmd} ->
                    hecate_plugin_api:json_ok(200, #{status => <<"rejected">>}, Req);
                {error, Reason} ->
                    hecate_plugin_api:bad_request(Reason, Req)
            end
    end.
