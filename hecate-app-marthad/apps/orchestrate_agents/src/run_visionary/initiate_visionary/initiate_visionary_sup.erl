%%% @doc Supervisor for initiate_visionary desk.
-module(initiate_visionary_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => visionary_initiated_v1_to_pg,
          start => {visionary_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_venture_initiated_initiate_visionary,
          start => {on_venture_initiated_initiate_visionary, start_link, []},
          restart => permanent, type => worker},
        #{id => on_visionary_initiated_run_visionary_llm,
          start => {on_visionary_initiated_run_visionary_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
