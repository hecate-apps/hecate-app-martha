%%% @doc Supervisor for initiate_explorer desk.
-module(initiate_explorer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => explorer_initiated_v1_to_pg,
          start => {explorer_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_vision_gate_passed_initiate_explorer,
          start => {on_vision_gate_passed_initiate_explorer, start_link, []},
          restart => permanent, type => worker},
        #{id => on_explorer_initiated_run_explorer_llm,
          start => {on_explorer_initiated_run_explorer_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
