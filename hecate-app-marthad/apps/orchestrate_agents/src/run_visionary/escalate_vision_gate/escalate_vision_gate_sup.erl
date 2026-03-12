%%% @doc Supervisor for escalate_vision_gate desk (includes pass/reject sub-desks).
-module(escalate_vision_gate_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => vision_gate_escalated_v1_to_pg,
          start => {vision_gate_escalated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => pass_vision_gate_sup,
          start => {pass_vision_gate_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => reject_vision_gate_sup,
          start => {reject_vision_gate_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => on_visionary_completed_escalate_vision_gate,
          start => {on_visionary_completed_escalate_vision_gate, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
