%%% @doc Projection: kanban_card_parked_v1 -> kanban_cards table
-module(kanban_card_parked_v1_to_sqlite_kanban_cards).

-export([project/1]).

project(Event) ->
    CardId = get(card_id, Event),
    ParkedBy = get(parked_by, Event),
    ParkedAt = get(parked_at, Event),
    ParkReason = get(park_reason, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 8, status_text = ?1, parked_by = ?2, parked_at = ?3, park_reason = ?4 "
          "WHERE card_id = ?5",
    project_division_kanbans_store:execute(Sql, [
        <<"parked">>, ParkedBy, ParkedAt, ParkReason, CardId
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
