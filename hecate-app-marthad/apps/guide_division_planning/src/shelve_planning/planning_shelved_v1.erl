%%% @doc planning_shelved_v1 event
%%% Emitted when a division planning dossier is shelved.
-module(planning_shelved_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_reason/1, get_shelved_at/1]).

-record(planning_shelved_v1, {
    division_id :: binary(),
    reason      :: binary() | undefined,
    shelved_at  :: non_neg_integer()
}).

-export_type([planning_shelved_v1/0]).
-opaque planning_shelved_v1() :: #planning_shelved_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> planning_shelved_v1().
new(#{division_id := DivisionId} = Params) ->
    #planning_shelved_v1{
        division_id = DivisionId,
        reason = maps:get(reason, Params, undefined),
        shelved_at = erlang:system_time(millisecond)
    }.

-spec to_map(planning_shelved_v1()) -> map().
to_map(#planning_shelved_v1{} = E) ->
    #{
        <<"event_type">> => <<"planning_shelved_v1">>,
        <<"division_id">> => E#planning_shelved_v1.division_id,
        <<"reason">> => E#planning_shelved_v1.reason,
        <<"shelved_at">> => E#planning_shelved_v1.shelved_at
    }.

-spec from_map(map()) -> {ok, planning_shelved_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    case DivisionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #planning_shelved_v1{
                division_id = DivisionId,
                reason = get_value(reason, Map, undefined),
                shelved_at = get_value(shelved_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(planning_shelved_v1()) -> binary().
get_division_id(#planning_shelved_v1{division_id = V}) -> V.

-spec get_reason(planning_shelved_v1()) -> binary() | undefined.
get_reason(#planning_shelved_v1{reason = V}) -> V.

-spec get_shelved_at(planning_shelved_v1()) -> non_neg_integer().
get_shelved_at(#planning_shelved_v1{shelved_at = V}) -> V.

%% Internal
get_value(Key, Map) ->
    get_value(Key, Map, undefined).

get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error ->
            case maps:find(BinKey, Map) of
                {ok, V} -> V;
                error -> Default
            end
    end.
