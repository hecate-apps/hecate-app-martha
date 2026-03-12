%%% @doc Top-level supervisor for the mentor agent role.
-module(run_mentor_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_mentor_sup,
          start => {initiate_mentor_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_mentor_sup,
          start => {complete_mentor_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_mentor_sup,
          start => {fail_mentor_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_mentor_turn_sup,
          start => {complete_mentor_turn_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => receive_mentor_input_sup,
          start => {receive_mentor_input_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
