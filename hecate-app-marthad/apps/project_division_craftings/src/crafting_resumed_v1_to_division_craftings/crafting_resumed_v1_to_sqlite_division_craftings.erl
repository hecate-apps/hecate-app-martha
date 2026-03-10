%%% @doc Projection: crafting_resumed_v1 -> division_craftings table (resume)
-module(crafting_resumed_v1_to_sqlite_division_craftings).

-include_lib("guide_division_crafting/include/crafting_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    case project_division_craftings_store:query(
        "SELECT status FROM division_craftings WHERE division_id = ?1", [DivisionId]) of
        {ok, [[CurrentStatus]]} ->
            %% Unset SHELVED, set OPEN
            S1 = evoq_bit_flags:unset(CurrentStatus, ?CRAFTING_SHELVED),
            NewStatus = evoq_bit_flags:set(S1, ?CRAFTING_OPEN),
            StatusLabel = evoq_bit_flags:to_string(NewStatus, ?CRAFTING_FLAG_MAP),
            project_division_craftings_store:execute(
                "UPDATE division_craftings SET status = ?1, status_label = ?2 WHERE division_id = ?3",
                [NewStatus, StatusLabel, DivisionId]);
        _ -> {error, crafting_not_found}
    end.

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
