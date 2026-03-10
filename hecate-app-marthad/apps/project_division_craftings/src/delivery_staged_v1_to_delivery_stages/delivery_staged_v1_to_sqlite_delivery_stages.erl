%%% @doc Projection: delivery_staged_v1 -> delivery_stages table
-module(delivery_staged_v1_to_sqlite_delivery_stages).

-export([project/1]).

project(Event) ->
    StageId = get(stage_id, Event),
    DivisionId = get(division_id, Event),
    ReleaseId = get(release_id, Event),
    StageName = get(stage_name, Event),
    StagedAt = get(staged_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s/~s", [?MODULE, DivisionId, StageId]),
    Sql = "INSERT OR REPLACE INTO delivery_stages "
          "(stage_id, division_id, release_id, stage_name, staged_at) "
          "VALUES (?1, ?2, ?3, ?4, ?5)",
    project_division_craftings_store:execute(Sql, [
        StageId, DivisionId, ReleaseId, StageName, StagedAt
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
