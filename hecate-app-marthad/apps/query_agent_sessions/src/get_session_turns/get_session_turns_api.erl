-module(get_session_turns_api).
-export([init/2, routes/0]).

routes() -> [{"/api/agents/sessions/:session_id/turns", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    SessionId = cowboy_req:binding(session_id, Req0),
    QS = cowboy_req:parse_qs(Req0),
    case proplists:get_value(<<"turn">>, QS) of
        undefined ->
            {ok, Turns} = get_session_turns:get(SessionId),
            TokenSummary = project_agent_sessions_store:total_tokens_by_session(SessionId),
            {TotalIn, TotalOut} = TokenSummary,
            app_marthad_api_utils:json_ok(#{
                turns => Turns,
                total_turns => length(Turns),
                tokens_in => TotalIn,
                tokens_out => TotalOut
            }, Req0);
        TurnBin ->
            case catch binary_to_integer(TurnBin) of
                TurnNum when is_integer(TurnNum) ->
                    case get_session_turns:get(SessionId, TurnNum) of
                        {ok, Turn} ->
                            app_marthad_api_utils:json_ok(#{turn => Turn}, Req0);
                        {error, not_found} ->
                            app_marthad_api_utils:json_error(404, <<"Turn not found">>, Req0)
                    end;
                _ ->
                    app_marthad_api_utils:json_error(400, <<"Invalid turn number">>, Req0)
            end
    end.
