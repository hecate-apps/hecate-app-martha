%%% @doc Supervisor for initiate_svelte_coder desk.
-module(initiate_svelte_coder_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => svelte_coder_initiated_v1_to_pg,
          start => {svelte_coder_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_svelte_coder_initiated_run_svelte_coder_llm,
          start => {on_svelte_coder_initiated_run_svelte_coder_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
