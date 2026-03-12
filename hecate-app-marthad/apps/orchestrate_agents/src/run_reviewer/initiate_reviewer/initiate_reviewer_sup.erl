%%% @doc Supervisor for initiate_reviewer desk.
-module(initiate_reviewer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => reviewer_initiated_v1_to_pg,
          start => {reviewer_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_team_formed_initiate_reviewer,
          start => {on_team_formed_initiate_reviewer, start_link, []},
          restart => permanent, type => worker},
        #{id => on_reviewer_initiated_run_reviewer_llm,
          start => {on_reviewer_initiated_run_reviewer_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
