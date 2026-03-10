%%% @doc Supervisor for planning_concluded_v1 projection desk.
-module(planning_concluded_v1_to_division_plannings_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{
            id => pg_listener,
            start => {on_planning_concluded_v1_from_pg_project_to_sqlite_division_plannings, start_link, []},
            restart => permanent,
            type => worker
        }
    ],
    {ok, {#{strategy => one_for_one, intensity => 10, period => 10}, Children}}.
