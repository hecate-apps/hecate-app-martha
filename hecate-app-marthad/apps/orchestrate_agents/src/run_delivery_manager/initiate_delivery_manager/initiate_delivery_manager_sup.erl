%%% @doc Supervisor for initiate_delivery_manager desk.
-module(initiate_delivery_manager_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => delivery_manager_initiated_v1_to_pg,
          start => {delivery_manager_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_team_formed_initiate_delivery_manager,
          start => {on_team_formed_initiate_delivery_manager, start_link, []},
          restart => permanent, type => worker},
        #{id => on_delivery_manager_initiated_run_delivery_manager_llm,
          start => {on_delivery_manager_initiated_run_delivery_manager_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
