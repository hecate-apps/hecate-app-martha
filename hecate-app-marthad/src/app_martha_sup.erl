%%% @doc Top-level supervisor for the Martha in-VM plugin.
%%%
%%% Supervises all 9 domain application supervisors:
%%%   - guide_venture_lifecycle_sup (CMD)
%%%   - project_ventures_sup (PRJ)
%%%   - query_ventures_sup (QRY)
%%%   - guide_division_planning_sup (CMD)
%%%   - project_division_plannings_sup (PRJ)
%%%   - query_division_plannings_sup (QRY)
%%%   - guide_division_crafting_sup (CMD)
%%%   - project_division_craftings_sup (PRJ)
%%%   - query_division_craftings_sup (QRY)
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
        #{id => guide_venture_lifecycle_sup,
          start => {guide_venture_lifecycle_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => project_ventures_sup,
          start => {project_ventures_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => query_ventures_sup,
          start => {query_ventures_sup, start_link, []},
          restart => permanent, type => supervisor},

        %% Division Planning (CMD + PRJ + QRY)
        #{id => guide_division_planning_sup,
          start => {guide_division_planning_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => project_division_plannings_sup,
          start => {project_division_plannings_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => query_division_plannings_sup,
          start => {query_division_plannings_sup, start_link, []},
          restart => permanent, type => supervisor},

        %% Division Crafting (CMD + PRJ + QRY)
        #{id => guide_division_crafting_sup,
          start => {guide_division_crafting_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => project_division_craftings_sup,
          start => {project_division_craftings_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => query_division_craftings_sup,
          start => {query_division_craftings_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],
    {ok, {SupFlags, Children}}.
