-module(get_session_by_id_api).
-export([init/2, routes/0]).

routes() -> [{"/api/agents/sessions/:session_id", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    SessionId = cowboy_req:binding(session_id, Req0),
    case get_session_by_id:get(SessionId) of
        {ok, Session} ->
            app_marthad_api_utils:json_ok(#{session => Session}, Req0);
        {error, not_found} ->
            app_marthad_api_utils:json_error(404, <<"Session not found">>, Req0);
        {error, Reason} ->
            app_marthad_api_utils:json_error(500, Reason, Req0)
    end.
