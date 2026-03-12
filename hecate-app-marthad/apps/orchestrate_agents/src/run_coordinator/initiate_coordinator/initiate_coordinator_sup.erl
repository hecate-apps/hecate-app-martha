%%% @doc Supervisor for initiate_coordinator desk.
-module(initiate_coordinator_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => coordinator_initiated_v1_to_pg,
          start => {coordinator_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_venture_initiated_initiate_coordinator,
          start => {on_venture_initiated_initiate_coordinator, start_link, []},
          restart => permanent, type => worker},
        #{id => on_coordinator_initiated_run_coordinator_llm,
          start => {on_coordinator_initiated_run_coordinator_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
