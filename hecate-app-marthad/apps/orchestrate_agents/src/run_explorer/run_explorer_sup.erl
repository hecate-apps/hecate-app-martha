%%% @doc Top-level supervisor for the explorer agent role.
-module(run_explorer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_explorer_sup,
          start => {initiate_explorer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_explorer_sup,
          start => {complete_explorer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_explorer_sup,
          start => {fail_explorer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => escalate_boundary_gate_sup,
          start => {escalate_boundary_gate_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
