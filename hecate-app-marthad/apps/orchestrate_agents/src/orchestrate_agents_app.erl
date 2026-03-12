%%% @doc orchestrate_agents OTP application.
-module(orchestrate_agents_app).
-behaviour(application).

-export([start/2, stop/1]).

-spec start(application:start_type(), term()) -> {ok, pid()} | {error, term()}.
start(_StartType, _StartArgs) ->
    orchestrate_agents_sup:start_link().

-spec stop(term()) -> ok.
stop(_State) ->
    ok.
