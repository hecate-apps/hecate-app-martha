%%% @doc Supervisor for initiate_tester desk.
-module(initiate_tester_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => tester_initiated_v1_to_pg,
          start => {tester_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_tester_initiated_run_tester_llm,
          start => {on_tester_initiated_run_tester_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
