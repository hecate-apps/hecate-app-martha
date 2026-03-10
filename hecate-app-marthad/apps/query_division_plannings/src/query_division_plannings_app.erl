-module(query_division_plannings_app).
-behaviour(application).
-export([start/2, stop/1]).

start(_StartType, _StartArgs) ->
    query_division_plannings_sup:start_link().

stop(_State) ->
    ok.
