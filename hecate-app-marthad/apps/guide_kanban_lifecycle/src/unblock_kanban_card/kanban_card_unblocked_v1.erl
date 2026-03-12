%%% @doc Event: kanban_card_unblocked.
-module(kanban_card_unblocked_v1).

-record(kanban_card_unblocked_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    unblocked_at :: non_neg_integer()
}).

-type kanban_card_unblocked_v1() :: #kanban_card_unblocked_v1{}.
-export_type([kanban_card_unblocked_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_card_id/1, get_unblocked_at/1]).

get_division_id(#kanban_card_unblocked_v1{division_id = V}) -> V.
get_card_id(#kanban_card_unblocked_v1{card_id = V}) -> V.
get_unblocked_at(#kanban_card_unblocked_v1{unblocked_at = V}) -> V.

-spec new(map()) -> kanban_card_unblocked_v1().
new(Params) ->
    #kanban_card_unblocked_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        unblocked_at = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_card_unblocked_v1()) -> map().
to_map(#kanban_card_unblocked_v1{} = E) ->
    #{      <<"event_type">>   => <<"kanban_card_unblocked_v1">>,
      <<"division_id">>  => E#kanban_card_unblocked_v1.division_id,
      <<"card_id">>      => E#kanban_card_unblocked_v1.card_id,
      <<"unblocked_at">> => E#kanban_card_unblocked_v1.unblocked_at}.

-spec from_map(map()) -> {ok, kanban_card_unblocked_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_card_unblocked_v1{
        division_id = get_value(division_id, Map),
        card_id     = get_value(card_id, Map),
        unblocked_at = get_value(unblocked_at, Map, erlang:system_time(millisecond))
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
