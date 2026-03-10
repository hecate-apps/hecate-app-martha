%%% @doc Projection: release_delivered_v1 -> releases table
-module(release_delivered_v1_to_sqlite_releases).

-export([project/1]).

project(Event) ->
    ReleaseId = get(release_id, Event),
    DivisionId = get(division_id, Event),
    Version = get(version, Event),
    DeliveredAt = get(delivered_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s/~s", [?MODULE, DivisionId, ReleaseId]),
    Sql = "INSERT OR REPLACE INTO releases "
          "(release_id, division_id, version, delivered_at) "
          "VALUES (?1, ?2, ?3, ?4)",
    project_division_craftings_store:execute(Sql, [
        ReleaseId, DivisionId, Version, DeliveredAt
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
