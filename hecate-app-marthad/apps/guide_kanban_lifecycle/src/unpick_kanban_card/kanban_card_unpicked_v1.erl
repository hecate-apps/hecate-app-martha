%%% @doc Event: kanban_card_unpicked.
-module(kanban_card_unpicked_v1).

-record(kanban_card_unpicked_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    reason      :: binary() | undefined,
    unpicked_at   :: non_neg_integer()
}).

-type kanban_card_unpicked_v1() :: #kanban_card_unpicked_v1{}.
-export_type([kanban_card_unpicked_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_card_id/1, get_reason/1, get_unpicked_at/1]).

get_division_id(#kanban_card_unpicked_v1{division_id = V}) -> V.
get_card_id(#kanban_card_unpicked_v1{card_id = V}) -> V.
get_reason(#kanban_card_unpicked_v1{reason = V}) -> V.
get_unpicked_at(#kanban_card_unpicked_v1{unpicked_at = V}) -> V.

-spec new(map()) -> kanban_card_unpicked_v1().
new(Params) ->
    #kanban_card_unpicked_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        reason      = maps:get(reason, Params, undefined),
        unpicked_at   = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_card_unpicked_v1()) -> map().
to_map(#kanban_card_unpicked_v1{} = E) ->
    #{      <<"event_type">>   => <<"kanban_card_unpicked_v1">>,
      <<"division_id">>  => E#kanban_card_unpicked_v1.division_id,
      <<"card_id">>      => E#kanban_card_unpicked_v1.card_id,
      <<"reason">>       => E#kanban_card_unpicked_v1.reason,
      <<"unpicked_at">> => E#kanban_card_unpicked_v1.unpicked_at}.

-spec from_map(map()) -> {ok, kanban_card_unpicked_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_card_unpicked_v1{
        division_id = get_value(division_id, Map),
        card_id     = get_value(card_id, Map),
        reason      = get_value(reason, Map, undefined),
        unpicked_at   = get_value(unpicked_at, Map, erlang:system_time(millisecond))
    }}.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.

get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
