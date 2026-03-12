%%% @doc Supervisor for fail_explorer desk.
-module(fail_explorer_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => explorer_failed_v1_to_pg,
          start => {explorer_failed_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
