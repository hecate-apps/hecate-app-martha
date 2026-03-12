%%% @doc Supervisor for escalate_review_gate desk (includes pass/reject sub-desks).
-module(escalate_review_gate_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => review_gate_escalated_v1_to_pg,
          start => {review_gate_escalated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => pass_review_gate_sup,
          start => {pass_review_gate_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => reject_review_gate_sup,
          start => {reject_review_gate_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => on_reviewer_completed_escalate_review_gate,
          start => {on_reviewer_completed_escalate_review_gate, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
