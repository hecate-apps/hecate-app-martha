%%% @doc Projection: kanban_card_unparked_v1 -> kanban_cards table
-module(kanban_card_unparked_v1_to_sqlite_kanban_cards).

-export([project/1]).

project(Event) ->
    CardId = get(card_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 1, status_text = ?1, parked_by = NULL, parked_at = NULL, park_reason = NULL "
          "WHERE card_id = ?2",
    project_division_kanbans_store:execute(Sql, [
        <<"posted">>, CardId
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
