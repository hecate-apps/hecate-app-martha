%%% @doc Projection: planning_initiated_v1 -> division_plannings table
-module(planning_initiated_v1_to_sqlite_division_plannings).

-include_lib("guide_division_planning/include/planning_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    VentureId = get(venture_id, Event),
    ContextName = get(context_name, Event),
    InitiatedAt = get(initiated_at, Event),
    InitiatedBy = get(initiated_by, Event),
    Status = ?PLANNING_INITIATED,
    StatusLabel = evoq_bit_flags:to_string(Status, ?PLANNING_FLAG_MAP),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    Sql = "INSERT OR REPLACE INTO division_plannings "
          "(division_id, venture_id, context_name, status, status_label, "
          "initiated_at, initiated_by) "
          "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
    project_division_plannings_store:execute(Sql, [
        DivisionId, VentureId, ContextName, Status, StatusLabel,
        InitiatedAt, InitiatedBy
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
