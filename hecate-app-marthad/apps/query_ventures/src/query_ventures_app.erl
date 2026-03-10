%%% @doc Application callback for query_ventures.
-module(query_ventures_app).
-behaviour(application).

-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    query_ventures_sup:start_link().

stop(_State) ->
    ok.
