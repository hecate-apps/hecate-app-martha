%%% @doc crafting_concluded_v1 event
%%% Emitted when a crafting dossier is concluded.
-module(crafting_concluded_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_concluded_at/1]).

-record(crafting_concluded_v1, {
    division_id  :: binary(),
    concluded_at :: integer()
}).

-export_type([crafting_concluded_v1/0]).
-opaque crafting_concluded_v1() :: #crafting_concluded_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> crafting_concluded_v1().
new(#{division_id := DivisionId}) ->
    #crafting_concluded_v1{
        division_id = DivisionId,
        concluded_at = erlang:system_time(millisecond)
    }.

-spec to_map(crafting_concluded_v1()) -> map().
to_map(#crafting_concluded_v1{} = E) ->
    #{
        <<"event_type">> => <<"crafting_concluded_v1">>,
        <<"division_id">> => E#crafting_concluded_v1.division_id,
        <<"concluded_at">> => E#crafting_concluded_v1.concluded_at
    }.

-spec from_map(map()) -> {ok, crafting_concluded_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    case DivisionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #crafting_concluded_v1{
                division_id = DivisionId,
                concluded_at = get_value(concluded_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(crafting_concluded_v1()) -> binary().
get_division_id(#crafting_concluded_v1{division_id = V}) -> V.

-spec get_concluded_at(crafting_concluded_v1()) -> integer().
get_concluded_at(#crafting_concluded_v1{concluded_at = V}) -> V.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
