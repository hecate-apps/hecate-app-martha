%%% @doc Supervisor for initiate_mentor desk.
-module(initiate_mentor_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => mentor_initiated_v1_to_pg,
          start => {mentor_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => on_venture_initiated_initiate_mentor,
          start => {on_venture_initiated_initiate_mentor, start_link, []},
          restart => permanent, type => worker},
        #{id => on_mentor_initiated_run_mentor_llm,
          start => {on_mentor_initiated_run_mentor_llm, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
