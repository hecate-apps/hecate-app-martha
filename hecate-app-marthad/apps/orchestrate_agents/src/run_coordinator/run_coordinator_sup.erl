%%% @doc Top-level supervisor for the coordinator agent role.
-module(run_coordinator_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_coordinator_sup,
          start => {initiate_coordinator_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_coordinator_sup,
          start => {complete_coordinator_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_coordinator_sup,
          start => {fail_coordinator_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_coordinator_turn_sup,
          start => {complete_coordinator_turn_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => receive_coordinator_input_sup,
          start => {receive_coordinator_input_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
