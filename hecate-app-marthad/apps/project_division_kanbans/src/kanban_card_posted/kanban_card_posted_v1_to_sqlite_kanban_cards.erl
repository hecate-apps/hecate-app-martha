%%% @doc Projection: kanban_card_posted_v1 -> kanban_cards table
-module(kanban_card_posted_v1_to_sqlite_kanban_cards).

-export([project/1]).

project(Event) ->
    CardId = get(card_id, Event),
    DivisionId = get(division_id, Event),
    Title = get(title, Event),
    Description = get(description, Event),
    CardType = get(card_type, Event),
    PostedBy = get(posted_by, Event),
    PostedAt = get(posted_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "INSERT OR REPLACE INTO kanban_cards "
          "(card_id, division_id, title, description, card_type, status, status_text, "
          "posted_by, posted_at) "
          "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
    project_division_kanbans_store:execute(Sql, [
        CardId, DivisionId, Title, Description, CardType,
        1, <<"posted">>, PostedBy, PostedAt
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
