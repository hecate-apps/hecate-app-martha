%%% @doc Event: kanban_card_posted.
-module(kanban_card_posted_v1).

-record(kanban_card_posted_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    title       :: binary(),
    description :: binary() | undefined,
    card_type   :: binary() | undefined,
    posted_by   :: binary() | undefined,
    posted_at   :: non_neg_integer()
}).

-type kanban_card_posted_v1() :: #kanban_card_posted_v1{}.
-export_type([kanban_card_posted_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_card_id/1, get_title/1, get_description/1,
         get_card_type/1, get_posted_by/1, get_posted_at/1]).

get_division_id(#kanban_card_posted_v1{division_id = V}) -> V.
get_card_id(#kanban_card_posted_v1{card_id = V}) -> V.
get_title(#kanban_card_posted_v1{title = V}) -> V.
get_description(#kanban_card_posted_v1{description = V}) -> V.
get_card_type(#kanban_card_posted_v1{card_type = V}) -> V.
get_posted_by(#kanban_card_posted_v1{posted_by = V}) -> V.
get_posted_at(#kanban_card_posted_v1{posted_at = V}) -> V.

-spec new(map()) -> kanban_card_posted_v1().
new(Params) ->
    #kanban_card_posted_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        title       = maps:get(title, Params),
        description = maps:get(description, Params, undefined),
        card_type   = maps:get(card_type, Params, undefined),
        posted_by   = maps:get(posted_by, Params, undefined),
        posted_at   = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_card_posted_v1()) -> map().
to_map(#kanban_card_posted_v1{} = E) ->
    #{<<"event_type">>   => <<"kanban_card_posted_v1">>,
      <<"division_id">>  => E#kanban_card_posted_v1.division_id,
      <<"card_id">>      => E#kanban_card_posted_v1.card_id,
      <<"title">>        => E#kanban_card_posted_v1.title,
      <<"description">>  => E#kanban_card_posted_v1.description,
      <<"card_type">>    => E#kanban_card_posted_v1.card_type,
      <<"posted_by">>    => E#kanban_card_posted_v1.posted_by,
      <<"posted_at">>    => E#kanban_card_posted_v1.posted_at}.

-spec from_map(map()) -> {ok, kanban_card_posted_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_card_posted_v1{
        division_id = get_value(division_id, Map),
        card_id     = get_value(card_id, Map),
        title       = get_value(title, Map),
        description = get_value(description, Map, undefined),
        card_type   = get_value(card_type, Map, undefined),
        posted_by   = get_value(posted_by, Map, undefined),
        posted_at   = get_value(posted_at, Map, erlang:system_time(millisecond))
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
