-module(get_session_turns).
-export([get/1, get/2]).

-spec get(binary()) -> {ok, [map()]}.
get(SessionId) ->
    project_agent_sessions_store:list_turns_by_session(SessionId).

-spec get(binary(), non_neg_integer()) -> {ok, [map()]} | {error, not_found}.
get(SessionId, TurnNumber) ->
    project_agent_sessions_store:get_turn(SessionId, TurnNumber).
