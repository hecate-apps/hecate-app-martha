%%% @doc Projection: kanban_card_blocked_v1 -> kanban_cards table
-module(kanban_card_blocked_v1_to_sqlite_kanban_cards).

-export([project/1]).

project(Event) ->
    CardId = get(card_id, Event),
    BlockedBy = get(blocked_by, Event),
    BlockedAt = get(blocked_at, Event),
    BlockReason = get(block_reason, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 16, status_text = ?1, blocked_by = ?2, blocked_at = ?3, block_reason = ?4 "
          "WHERE card_id = ?5",
    project_division_kanbans_store:execute(Sql, [
        <<"blocked">>, BlockedBy, BlockedAt, BlockReason, CardId
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
