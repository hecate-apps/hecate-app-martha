%%% @doc Top-level supervisor for query_ventures.
%%% Query handlers are stateless — no children needed.
-module(query_ventures_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, []}}.
