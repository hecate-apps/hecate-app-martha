%%% @doc planning_opened_v1 event
%%% Emitted when a division planning dossier is opened for design work.
-module(planning_opened_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_opened_at/1]).

-record(planning_opened_v1, {
    division_id :: binary(),
    opened_at   :: non_neg_integer()
}).

-export_type([planning_opened_v1/0]).
-opaque planning_opened_v1() :: #planning_opened_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> planning_opened_v1().
new(#{division_id := DivisionId}) ->
    #planning_opened_v1{
        division_id = DivisionId,
        opened_at = erlang:system_time(millisecond)
    }.

-spec to_map(planning_opened_v1()) -> map().
to_map(#planning_opened_v1{} = E) ->
    #{
        <<"event_type">> => <<"planning_opened_v1">>,
        <<"division_id">> => E#planning_opened_v1.division_id,
        <<"opened_at">> => E#planning_opened_v1.opened_at
    }.

-spec from_map(map()) -> {ok, planning_opened_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    case DivisionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #planning_opened_v1{
                division_id = DivisionId,
                opened_at = get_value(opened_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(planning_opened_v1()) -> binary().
get_division_id(#planning_opened_v1{division_id = V}) -> V.

-spec get_opened_at(planning_opened_v1()) -> non_neg_integer().
get_opened_at(#planning_opened_v1{opened_at = V}) -> V.

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
