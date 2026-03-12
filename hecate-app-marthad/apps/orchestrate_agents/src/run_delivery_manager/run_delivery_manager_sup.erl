%%% @doc Top-level supervisor for the delivery_manager agent role.
-module(run_delivery_manager_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_delivery_manager_sup,
          start => {initiate_delivery_manager_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_delivery_manager_sup,
          start => {complete_delivery_manager_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_delivery_manager_sup,
          start => {fail_delivery_manager_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
