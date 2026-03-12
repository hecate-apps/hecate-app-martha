-module(get_session_by_id).
-export([get/1]).

-spec get(binary()) -> {ok, map()} | {error, not_found | term()}.
get(SessionId) ->
    project_agent_sessions_store:get_session(SessionId).
