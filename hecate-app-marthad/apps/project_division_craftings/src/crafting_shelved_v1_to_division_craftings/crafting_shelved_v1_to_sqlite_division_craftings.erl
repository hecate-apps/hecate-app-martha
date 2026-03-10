%%% @doc Projection: crafting_shelved_v1 -> division_craftings table (shelve)
-module(crafting_shelved_v1_to_sqlite_division_craftings).

-include_lib("guide_division_crafting/include/crafting_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    ShelvedAt = get(shelved_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    case project_division_craftings_store:query(
        "SELECT status FROM division_craftings WHERE division_id = ?1", [DivisionId]) of
        {ok, [[CurrentStatus]]} ->
            %% Unset OPEN, set SHELVED
            S1 = evoq_bit_flags:unset(CurrentStatus, ?CRAFTING_OPEN),
            NewStatus = evoq_bit_flags:set(S1, ?CRAFTING_SHELVED),
            StatusLabel = evoq_bit_flags:to_string(NewStatus, ?CRAFTING_FLAG_MAP),
            project_division_craftings_store:execute(
                "UPDATE division_craftings SET status = ?1, status_label = ?2, shelved_at = ?3 WHERE division_id = ?4",
                [NewStatus, StatusLabel, ShelvedAt, DivisionId]);
        _ -> {error, crafting_not_found}
    end.

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
