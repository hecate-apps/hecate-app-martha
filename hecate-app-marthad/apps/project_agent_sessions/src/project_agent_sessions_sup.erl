%%% @doc Top-level supervisor for project_agent_sessions.
%%%
%%% Starts the ETS store first, then projection workers.
-module(project_agent_sessions_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Projections = [
        agent_conversation_to_turns,
        agent_session_lifecycle_to_sessions
    ],
    ProjectionChildren = [#{
        id => Mod,
        start => {evoq_projection, start_link, [Mod, #{}]},
        restart => permanent,
        type => worker
    } || Mod <- Projections],
    Children = [
        %% ETS store must start first (creates named tables)
        #{
            id => project_agent_sessions_store,
            start => {project_agent_sessions_store, start_link, []},
            restart => permanent,
            type => worker
        }
        | ProjectionChildren
    ],
    {ok, {#{strategy => one_for_one, intensity => 10, period => 10}, Children}}.
