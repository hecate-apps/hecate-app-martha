-module(get_active_sessions).
-export([get/0]).

-spec get() -> {ok, [map()]}.
get() ->
    project_agent_sessions_store:list_active_sessions().
