%%% @doc Top-level supervisor for the erlang_coder agent role.
-module(run_erlang_coder_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_erlang_coder_sup,
          start => {initiate_erlang_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_erlang_coder_sup,
          start => {complete_erlang_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_erlang_coder_sup,
          start => {fail_erlang_coder_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
