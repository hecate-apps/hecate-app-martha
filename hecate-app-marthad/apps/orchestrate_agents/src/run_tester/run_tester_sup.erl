%%% @doc Top-level supervisor for the tester agent role.
-module(run_tester_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_tester_sup,
          start => {initiate_tester_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_tester_sup,
          start => {complete_tester_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_tester_sup,
          start => {fail_tester_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
