%%% @doc Top-level supervisor for the svelte_coder agent role.
-module(run_svelte_coder_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_svelte_coder_sup,
          start => {initiate_svelte_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_svelte_coder_sup,
          start => {complete_svelte_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_svelte_coder_sup,
          start => {fail_svelte_coder_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
