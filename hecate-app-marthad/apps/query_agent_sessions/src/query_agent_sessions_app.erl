-module(query_agent_sessions_app).
-behaviour(application).
-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    query_agent_sessions_sup:start_link().

stop(_State) ->
    ok.
