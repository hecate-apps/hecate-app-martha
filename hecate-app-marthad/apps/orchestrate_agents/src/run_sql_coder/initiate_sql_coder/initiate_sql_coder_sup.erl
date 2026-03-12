%%% @doc Supervisor for initiate_sql_coder desk.
-module(initiate_sql_coder_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => sql_coder_initiated_v1_to_pg,
          start => {sql_coder_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_sql_coder_initiated_run_sql_coder_llm,
          start => {on_sql_coder_initiated_run_sql_coder_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
