%%% @doc Projection: planning_concluded_v1 -> division_plannings table (unset open, set concluded)
-module(planning_concluded_v1_to_sqlite_division_plannings).

-include_lib("guide_division_planning/include/planning_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    ConcludedAt = get(concluded_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    %% Read current status, unset PLANNING_OPEN, set PLANNING_CONCLUDED
    case project_division_plannings_store:query(
        "SELECT status FROM division_plannings WHERE division_id = ?1", [DivisionId]) of
        {ok, [[CurrentStatus]]} ->
            NewStatus = evoq_bit_flags:set(
                evoq_bit_flags:unset(CurrentStatus, ?PLANNING_OPEN),
                ?PLANNING_CONCLUDED),
            StatusLabel = evoq_bit_flags:to_string(NewStatus, ?PLANNING_FLAG_MAP),
            project_division_plannings_store:execute(
                "UPDATE division_plannings SET status = ?1, status_label = ?2, concluded_at = ?3 WHERE division_id = ?4",
                [NewStatus, StatusLabel, ConcludedAt, DivisionId]);
        _ -> {error, planning_not_found}
    end.

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
