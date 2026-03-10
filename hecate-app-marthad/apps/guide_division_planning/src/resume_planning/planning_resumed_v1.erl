%%% @doc planning_resumed_v1 event
%%% Emitted when a shelved division planning dossier is resumed.
-module(planning_resumed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_resumed_at/1]).

-record(planning_resumed_v1, {
    division_id :: binary(),
    resumed_at  :: non_neg_integer()
}).

-export_type([planning_resumed_v1/0]).
-opaque planning_resumed_v1() :: #planning_resumed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> planning_resumed_v1().
new(#{division_id := DivisionId}) ->
    #planning_resumed_v1{
        division_id = DivisionId,
        resumed_at = erlang:system_time(millisecond)
    }.

-spec to_map(planning_resumed_v1()) -> map().
to_map(#planning_resumed_v1{} = E) ->
    #{
        <<"event_type">> => <<"planning_resumed_v1">>,
        <<"division_id">> => E#planning_resumed_v1.division_id,
        <<"resumed_at">> => E#planning_resumed_v1.resumed_at
    }.

-spec from_map(map()) -> {ok, planning_resumed_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    case DivisionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #planning_resumed_v1{
                division_id = DivisionId,
                resumed_at = get_value(resumed_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(planning_resumed_v1()) -> binary().
get_division_id(#planning_resumed_v1{division_id = V}) -> V.

-spec get_resumed_at(planning_resumed_v1()) -> non_neg_integer().
get_resumed_at(#planning_resumed_v1{resumed_at = V}) -> V.

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
