%%% @doc Top-level supervisor for the stormer agent role.
-module(run_stormer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_stormer_sup,
          start => {initiate_stormer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_stormer_sup,
          start => {complete_stormer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_stormer_sup,
          start => {fail_stormer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => escalate_design_gate_sup,
          start => {escalate_design_gate_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
