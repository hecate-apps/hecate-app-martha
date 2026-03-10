%%% @doc Projection: crafting_opened_v1 -> division_craftings table (set open flag)
-module(crafting_opened_v1_to_sqlite_division_craftings).

-include_lib("guide_division_crafting/include/crafting_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    OpenedAt = get(opened_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    %% Set the OPEN flag and update opened_at
    ok = project_division_craftings_store:execute(
        "UPDATE division_craftings SET status = status | ?1, opened_at = ?2 WHERE division_id = ?3",
        [?CRAFTING_OPEN, OpenedAt, DivisionId]),
    %% Recompute label
    case project_division_craftings_store:query(
        "SELECT status FROM division_craftings WHERE division_id = ?1", [DivisionId]) of
        {ok, [[NewStatus]]} ->
            Label = evoq_bit_flags:to_string(NewStatus, ?CRAFTING_FLAG_MAP),
            project_division_craftings_store:execute(
                "UPDATE division_craftings SET status_label = ?1 WHERE division_id = ?2",
                [Label, DivisionId]);
        _ -> ok
    end.

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
