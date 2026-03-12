%%% @doc Top-level supervisor for the sql_coder agent role.
-module(run_sql_coder_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_sql_coder_sup,
          start => {initiate_sql_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_sql_coder_sup,
          start => {complete_sql_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_sql_coder_sup,
          start => {fail_sql_coder_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
