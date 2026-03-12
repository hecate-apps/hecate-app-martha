%%% @doc Top-level supervisor for the architect agent role.
-module(run_architect_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_architect_sup,
          start => {initiate_architect_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_architect_sup,
          start => {complete_architect_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_architect_sup,
          start => {fail_architect_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
