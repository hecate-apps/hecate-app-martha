%%% @doc Projection: kanban_card_finished_v1 -> kanban_cards table
-module(kanban_card_finished_v1_to_sqlite_kanban_cards).

-export([project/1]).

project(Event) ->
    CardId = get(card_id, Event),
    FinishedAt = get(finished_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 4, status_text = ?1, finished_at = ?2 "
          "WHERE card_id = ?3",
    project_division_kanbans_store:execute(Sql, [
        <<"finished">>, FinishedAt, CardId
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
