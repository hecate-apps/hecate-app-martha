%%% @doc Supervisor for initiate_stormer desk.
-module(initiate_stormer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => stormer_initiated_v1_to_pg,
          start => {stormer_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_team_formed_initiate_stormer,
          start => {on_team_formed_initiate_stormer, start_link, []},
          restart => permanent, type => worker},
        #{id => on_stormer_initiated_run_stormer_llm,
          start => {on_stormer_initiated_run_stormer_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
