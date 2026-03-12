%%% @doc Projection: kanban_board_archived_v1 -> division_kanbans table (update)
-module(kanban_board_archived_v1_to_sqlite_division_kanbans).

-include_lib("guide_kanban_lifecycle/include/kanban_board_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    case project_division_kanbans_store:query(
        "SELECT status FROM division_kanbans WHERE division_id = ?1", [DivisionId]) of
        {ok, [[CurrentStatus]]} ->
            NewStatus = CurrentStatus bor ?BOARD_ARCHIVED,
            StatusLabel = evoq_bit_flags:to_string(NewStatus, ?BOARD_FLAG_MAP),
            Sql = "UPDATE division_kanbans SET status = ?1, status_label = ?2 WHERE division_id = ?3",
            project_division_kanbans_store:execute(Sql, [NewStatus, StatusLabel, DivisionId]);
        {ok, []} ->
            logger:warning("[~s] kanban ~s not found for archive", [?MODULE, DivisionId]),
            ok;
        {error, Reason} ->
            {error, Reason}
    end.

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
