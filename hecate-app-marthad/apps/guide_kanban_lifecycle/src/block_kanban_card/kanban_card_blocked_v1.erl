%%% @doc Event: kanban_card_blocked.
-module(kanban_card_blocked_v1).

-record(kanban_card_blocked_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    block_reason :: binary() | undefined,
    blocked_by   :: binary() | undefined,
    blocked_at   :: non_neg_integer()
}).

-type kanban_card_blocked_v1() :: #kanban_card_blocked_v1{}.
-export_type([kanban_card_blocked_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_card_id/1, get_block_reason/1, get_blocked_by/1, get_blocked_at/1]).

get_division_id(#kanban_card_blocked_v1{division_id = V}) -> V.
get_card_id(#kanban_card_blocked_v1{card_id = V}) -> V.
get_block_reason(#kanban_card_blocked_v1{block_reason = V}) -> V.
get_blocked_by(#kanban_card_blocked_v1{blocked_by = V}) -> V.
get_blocked_at(#kanban_card_blocked_v1{blocked_at = V}) -> V.

-spec new(map()) -> kanban_card_blocked_v1().
new(Params) ->
    #kanban_card_blocked_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        block_reason = maps:get(block_reason, Params, undefined),
        blocked_by   = maps:get(blocked_by, Params, undefined),
        blocked_at   = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_card_blocked_v1()) -> map().
to_map(#kanban_card_blocked_v1{} = E) ->
    #{      <<"event_type">>   => <<"kanban_card_blocked_v1">>,
      <<"division_id">>  => E#kanban_card_blocked_v1.division_id,
      <<"card_id">>      => E#kanban_card_blocked_v1.card_id,
      <<"block_reason">> => E#kanban_card_blocked_v1.block_reason,
      <<"blocked_by">>   => E#kanban_card_blocked_v1.blocked_by,
      <<"blocked_at">>   => E#kanban_card_blocked_v1.blocked_at}.

-spec from_map(map()) -> {ok, kanban_card_blocked_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_card_blocked_v1{
        division_id = get_value(division_id, Map),
        card_id     = get_value(card_id, Map),
        block_reason = get_value(block_reason, Map, undefined),
        blocked_by   = get_value(blocked_by, Map, undefined),
        blocked_at   = get_value(blocked_at, Map, erlang:system_time(millisecond))
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
