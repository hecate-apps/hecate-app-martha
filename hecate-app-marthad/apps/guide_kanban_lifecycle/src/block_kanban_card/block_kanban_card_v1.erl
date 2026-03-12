%%% @doc Command: block_kanban_card.
-module(block_kanban_card_v1).

-record(block_kanban_card_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    block_reason :: binary() | undefined,
    blocked_by   :: binary() | undefined
}).

-type block_kanban_card_v1() :: #block_kanban_card_v1{}.
-export_type([block_kanban_card_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_card_id/1, get_block_reason/1, get_blocked_by/1]).

get_division_id(#block_kanban_card_v1{division_id = V}) -> V.
get_card_id(#block_kanban_card_v1{card_id = V}) -> V.
get_block_reason(#block_kanban_card_v1{block_reason = V}) -> V.
get_blocked_by(#block_kanban_card_v1{blocked_by = V}) -> V.

-spec new(map()) -> {ok, block_kanban_card_v1()} | {error, term()}.
new(Params) ->
    Cmd = #block_kanban_card_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        block_reason = maps:get(block_reason, Params, undefined),
        blocked_by   = maps:get(blocked_by, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, block_kanban_card_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id => get_value(division_id, Map),
        card_id     => get_value(card_id, Map),
        block_reason => get_value(block_reason, Map, undefined),
        blocked_by   => get_value(blocked_by, Map, undefined)
    }).

-spec validate(block_kanban_card_v1()) -> ok | {error, term()}.
validate(#block_kanban_card_v1{division_id = D, card_id = C})
  when is_binary(D), byte_size(D) > 0,
       is_binary(C), byte_size(C) > 0 -> ok;
validate(_) -> {error, invalid_block_kanban_card}.

-spec to_map(block_kanban_card_v1()) -> map().
to_map(#block_kanban_card_v1{} = C) ->
    #{      <<"command_type">> => <<"block_kanban_card">>,
      <<"division_id">>  => C#block_kanban_card_v1.division_id,
      <<"card_id">>      => C#block_kanban_card_v1.card_id,
      <<"block_reason">> => C#block_kanban_card_v1.block_reason,
      <<"blocked_by">>   => C#block_kanban_card_v1.blocked_by}.

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
