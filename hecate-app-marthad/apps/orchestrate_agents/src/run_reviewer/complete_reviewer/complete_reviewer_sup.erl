%%% @doc Supervisor for complete_reviewer desk.
-module(complete_reviewer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => reviewer_completed_v1_to_pg,
          start => {reviewer_completed_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
