%%% @doc guide_division_planning application behaviour
-module(guide_division_planning_app).
-behaviour(application).

-export([start/2, stop/1]).

-spec start(application:start_type(), term()) -> {ok, pid()} | {error, term()}.
start(_StartType, _StartArgs) ->
    guide_division_planning_sup:start_link().

-spec stop(term()) -> ok.
stop(_State) ->
    ok.
