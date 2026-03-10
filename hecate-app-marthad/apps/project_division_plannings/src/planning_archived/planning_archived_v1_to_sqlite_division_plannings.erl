%%% @doc Projection: planning_archived_v1 -> division_plannings table (set archived flag)
-module(planning_archived_v1_to_sqlite_division_plannings).

-include_lib("guide_division_planning/include/planning_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    %% Set the ARCHIVED flag
    ok = project_division_plannings_store:execute(
        "UPDATE division_plannings SET status = status | ?1 WHERE division_id = ?2",
        [?PLANNING_ARCHIVED, DivisionId]),
    %% Recompute label
    case project_division_plannings_store:query(
        "SELECT status FROM division_plannings WHERE division_id = ?1", [DivisionId]) of
        {ok, [[NewStatus]]} ->
            Label = evoq_bit_flags:to_string(NewStatus, ?PLANNING_FLAG_MAP),
            project_division_plannings_store:execute(
                "UPDATE division_plannings SET status_label = ?1 WHERE division_id = ?2",
                [Label, DivisionId]);
        _ -> ok
    end.

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
