%%% @doc Command: unpick_kanban_card.
-module(unpick_kanban_card_v1).

-record(unpick_kanban_card_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    reason :: binary() | undefined
}).

-type unpick_kanban_card_v1() :: #unpick_kanban_card_v1{}.
-export_type([unpick_kanban_card_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_card_id/1, get_reason/1]).

get_division_id(#unpick_kanban_card_v1{division_id = V}) -> V.
get_card_id(#unpick_kanban_card_v1{card_id = V}) -> V.
get_reason(#unpick_kanban_card_v1{reason = V}) -> V.

-spec new(map()) -> {ok, unpick_kanban_card_v1()} | {error, term()}.
new(Params) ->
    Cmd = #unpick_kanban_card_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        reason = maps:get(reason, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, unpick_kanban_card_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id => get_value(division_id, Map),
        card_id     => get_value(card_id, Map),
        reason => get_value(reason, Map, undefined)
    }).

-spec validate(unpick_kanban_card_v1()) -> ok | {error, term()}.
validate(#unpick_kanban_card_v1{division_id = D, card_id = C})
  when is_binary(D), byte_size(D) > 0,
       is_binary(C), byte_size(C) > 0 -> ok;
validate(_) -> {error, invalid_unpick_kanban_card}.

-spec to_map(unpick_kanban_card_v1()) -> map().
to_map(#unpick_kanban_card_v1{} = C) ->
    #{      <<"command_type">> => <<"unpick_kanban_card">>,
      <<"division_id">>  => C#unpick_kanban_card_v1.division_id,
      <<"card_id">>      => C#unpick_kanban_card_v1.card_id,
      <<"reason">>       => C#unpick_kanban_card_v1.reason}.

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
