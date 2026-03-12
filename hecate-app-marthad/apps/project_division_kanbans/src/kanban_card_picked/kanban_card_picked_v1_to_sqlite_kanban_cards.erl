%%% @doc Projection: kanban_card_picked_v1 -> kanban_cards table
-module(kanban_card_picked_v1_to_sqlite_kanban_cards).

-export([project/1]).

project(Event) ->
    CardId = get(card_id, Event),
    PickedBy = get(picked_by, Event),
    PickedAt = get(picked_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 2, status_text = ?1, picked_by = ?2, picked_at = ?3 "
          "WHERE card_id = ?4",
    project_division_kanbans_store:execute(Sql, [
        <<"picked">>, PickedBy, PickedAt, CardId
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
