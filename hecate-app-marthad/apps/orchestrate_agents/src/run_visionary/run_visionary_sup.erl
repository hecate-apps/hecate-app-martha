%%% @doc Top-level supervisor for the visionary agent role.
%%% Supervises initiate, complete, and fail desk supervisors.
%%% Gate desks (escalate_vision_gate, pass/reject) added in Phase 2.
-module(run_visionary_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_visionary_sup,
          start => {initiate_visionary_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_visionary_sup,
          start => {complete_visionary_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_visionary_sup,
          start => {fail_visionary_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => escalate_vision_gate_sup,
          start => {escalate_vision_gate_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
