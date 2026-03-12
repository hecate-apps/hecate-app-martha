%%% @doc Top-level supervisor for the reviewer agent role.
-module(run_reviewer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_reviewer_sup,
          start => {initiate_reviewer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_reviewer_sup,
          start => {complete_reviewer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_reviewer_sup,
          start => {fail_reviewer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => escalate_review_gate_sup,
          start => {escalate_review_gate_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
