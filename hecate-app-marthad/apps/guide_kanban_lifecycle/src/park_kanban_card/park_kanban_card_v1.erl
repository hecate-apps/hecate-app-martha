%%% @doc Command: park_kanban_card.
-module(park_kanban_card_v1).

-record(park_kanban_card_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    park_reason :: binary() | undefined,
    parked_by   :: binary() | undefined
}).

-type park_kanban_card_v1() :: #park_kanban_card_v1{}.
-export_type([park_kanban_card_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_card_id/1, get_park_reason/1, get_parked_by/1]).

get_division_id(#park_kanban_card_v1{division_id = V}) -> V.
get_card_id(#park_kanban_card_v1{card_id = V}) -> V.
get_park_reason(#park_kanban_card_v1{park_reason = V}) -> V.
get_parked_by(#park_kanban_card_v1{parked_by = V}) -> V.

-spec new(map()) -> {ok, park_kanban_card_v1()} | {error, term()}.
new(Params) ->
    Cmd = #park_kanban_card_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        park_reason = maps:get(park_reason, Params, undefined),
        parked_by   = maps:get(parked_by, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, park_kanban_card_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id => get_value(division_id, Map),
        card_id     => get_value(card_id, Map),
        park_reason => get_value(park_reason, Map, undefined),
        parked_by   => get_value(parked_by, Map, undefined)
    }).

-spec validate(park_kanban_card_v1()) -> ok | {error, term()}.
validate(#park_kanban_card_v1{division_id = D, card_id = C})
  when is_binary(D), byte_size(D) > 0,
       is_binary(C), byte_size(C) > 0 -> ok;
validate(_) -> {error, invalid_park_kanban_card}.

-spec to_map(park_kanban_card_v1()) -> map().
to_map(#park_kanban_card_v1{} = C) ->
    #{      <<"command_type">> => <<"park_kanban_card">>,
      <<"division_id">>  => C#park_kanban_card_v1.division_id,
      <<"card_id">>      => C#park_kanban_card_v1.card_id,
      <<"park_reason">>  => C#park_kanban_card_v1.park_reason,
      <<"parked_by">>    => C#park_kanban_card_v1.parked_by}.

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
