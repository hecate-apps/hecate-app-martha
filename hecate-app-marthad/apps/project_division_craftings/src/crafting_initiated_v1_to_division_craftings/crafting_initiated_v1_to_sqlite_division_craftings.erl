%%% @doc Projection: crafting_initiated_v1 -> division_craftings table
-module(crafting_initiated_v1_to_sqlite_division_craftings).

-include_lib("guide_division_crafting/include/crafting_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    VentureId = get(venture_id, Event),
    ContextName = get(context_name, Event),
    InitiatedAt = get(initiated_at, Event),
    InitiatedBy = get(initiated_by, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    Status = evoq_bit_flags:set(0, ?CRAFTING_INITIATED),
    StatusLabel = evoq_bit_flags:to_string(Status, ?CRAFTING_FLAG_MAP),
    Sql = "INSERT OR REPLACE INTO division_craftings "
          "(division_id, venture_id, context_name, status, status_label, "
          "initiated_at, initiated_by) "
          "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
    project_division_craftings_store:execute(Sql, [
        DivisionId, VentureId, ContextName, Status, StatusLabel,
        InitiatedAt, InitiatedBy
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
