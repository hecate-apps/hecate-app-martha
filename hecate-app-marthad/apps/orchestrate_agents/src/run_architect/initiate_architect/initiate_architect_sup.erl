%%% @doc Supervisor for initiate_architect desk.
-module(initiate_architect_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => architect_initiated_v1_to_pg,
          start => {architect_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_team_formed_initiate_architect,
          start => {on_team_formed_initiate_architect, start_link, []},
          restart => permanent, type => worker},
        #{id => on_architect_initiated_run_architect_llm,
          start => {on_architect_initiated_run_architect_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
