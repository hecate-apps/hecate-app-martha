%%% @doc Top-level supervisor for the Martha in-VM plugin.
%%%
%%% Supervises all 18 domain application supervisors across 6 processes.
%%% @end
-module(app_martha_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    SupFlags = #{strategy => one_for_one, intensity => 10, period => 60},
    Children = [
        %% Venture lifecycle (CMD + PRJ + QRY)
        child(guide_venture_lifecycle_sup),
        child(project_ventures_sup),
        child(query_ventures_sup),

        %% Division Planning (CMD + PRJ + QRY)
        child(guide_division_planning_sup),
        child(project_division_plannings_sup),
        child(query_division_plannings_sup),

        %% Division Storming (CMD + PRJ + QRY)
        child(guide_division_storming_sup),
        child(project_division_stormings_sup),
        child(query_division_stormings_sup),

        %% Kanban Lifecycle (CMD + PRJ + QRY)
        child(guide_kanban_lifecycle_sup),
        child(project_division_kanbans_sup),
        child(query_division_kanbans_sup),

        %% Division Crafting (CMD + PRJ + QRY)
        child(guide_division_crafting_sup),
        child(project_division_craftings_sup),
        child(query_division_craftings_sup),

        %% Agent Orchestration (CMD + PRJ + QRY)
        child(orchestrate_agents_sup),
        child(project_agent_sessions_sup),
        child(query_agent_sessions_sup)
    ],
    {ok, {SupFlags, Children}}.

child(Mod) ->
    #{id => Mod, start => {Mod, start_link, []},
      restart => permanent, type => supervisor}.
