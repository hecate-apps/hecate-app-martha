%%% @doc HTTP handler for passing the boundary_gate.
-module(pass_boundary_gate_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/explorer/gates/boundary-gate/pass", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} -> do_pass(Params, Req1);
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_pass(Params, Req) ->
    SessionId = app_marthad_api_utils:get_field(session_id, Params),
    case SessionId of
        undefined ->
            app_marthad_api_utils:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                passed_by => app_marthad_api_utils:get_field(passed_by, Params)
            },
            case pass_boundary_gate_v1:new(CmdParams) of
                {ok, _Cmd} ->
                    app_marthad_api_utils:json_ok(200, #{status => <<"passed">>}, Req);
                {error, Reason} ->
                    app_marthad_api_utils:bad_request(Reason, Req)
            end
    end.
