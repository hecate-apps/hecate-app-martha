%%% @doc Supervisor for initiate_erlang_coder desk.
-module(initiate_erlang_coder_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => erlang_coder_initiated_v1_to_pg,
          start => {erlang_coder_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_erlang_coder_initiated_run_erlang_coder_llm,
          start => {on_erlang_coder_initiated_run_erlang_coder_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
