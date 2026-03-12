%%% @doc Command: unpark_kanban_card.
-module(unpark_kanban_card_v1).

-record(unpark_kanban_card_v1, {
    division_id :: binary(),
    card_id     :: binary()
}).

-type unpark_kanban_card_v1() :: #unpark_kanban_card_v1{}.
-export_type([unpark_kanban_card_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_card_id/1]).

get_division_id(#unpark_kanban_card_v1{division_id = V}) -> V.
get_card_id(#unpark_kanban_card_v1{card_id = V}) -> V.


-spec new(map()) -> {ok, unpark_kanban_card_v1()} | {error, term()}.
new(Params) ->
    Cmd = #unpark_kanban_card_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, unpark_kanban_card_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id => get_value(division_id, Map),
        card_id     => get_value(card_id, Map)
    }).

-spec validate(unpark_kanban_card_v1()) -> ok | {error, term()}.
validate(#unpark_kanban_card_v1{division_id = D, card_id = C})
  when is_binary(D), byte_size(D) > 0,
       is_binary(C), byte_size(C) > 0 -> ok;
validate(_) -> {error, invalid_unpark_kanban_card}.

-spec to_map(unpark_kanban_card_v1()) -> map().
to_map(#unpark_kanban_card_v1{} = C) ->
    #{      <<"command_type">> => <<"unpark_kanban_card">>,
      <<"division_id">>  => C#unpark_kanban_card_v1.division_id,
      <<"card_id">>      => C#unpark_kanban_card_v1.card_id}.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.

