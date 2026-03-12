%%% @doc Command: post_kanban_card.
-module(post_kanban_card_v1).

-record(post_kanban_card_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    title       :: binary(),
    description :: binary() | undefined,
    card_type   :: binary() | undefined,
    posted_by   :: binary() | undefined
}).

-type post_kanban_card_v1() :: #post_kanban_card_v1{}.
-export_type([post_kanban_card_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_card_id/1, get_title/1, get_description/1,
         get_card_type/1, get_posted_by/1]).

get_division_id(#post_kanban_card_v1{division_id = V}) -> V.
get_card_id(#post_kanban_card_v1{card_id = V}) -> V.
get_title(#post_kanban_card_v1{title = V}) -> V.
get_description(#post_kanban_card_v1{description = V}) -> V.
get_card_type(#post_kanban_card_v1{card_type = V}) -> V.
get_posted_by(#post_kanban_card_v1{posted_by = V}) -> V.

-spec new(map()) -> {ok, post_kanban_card_v1()} | {error, term()}.
new(Params) ->
    CardId = case maps:get(card_id, Params, undefined) of
        undefined -> iolist_to_binary(io_lib:format("card-~s", [integer_to_binary(erlang:unique_integer([positive]))]));
        Id -> Id
    end,
    Cmd = #post_kanban_card_v1{
        division_id = maps:get(division_id, Params),
        card_id     = CardId,
        title       = maps:get(title, Params),
        description = maps:get(description, Params, undefined),
        card_type   = maps:get(card_type, Params, undefined),
        posted_by   = maps:get(posted_by, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, post_kanban_card_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id => get_value(division_id, Map),
        card_id     => get_value(card_id, Map, undefined),
        title       => get_value(title, Map),
        description => get_value(description, Map, undefined),
        card_type   => get_value(card_type, Map, undefined),
        posted_by   => get_value(posted_by, Map, undefined)
    }).

-spec validate(post_kanban_card_v1()) -> ok | {error, term()}.
validate(#post_kanban_card_v1{division_id = D, card_id = C, title = T})
  when is_binary(D), byte_size(D) > 0,
       is_binary(C), byte_size(C) > 0,
       is_binary(T), byte_size(T) > 0 -> ok;
validate(_) -> {error, invalid_post_kanban_card}.

-spec to_map(post_kanban_card_v1()) -> map().
to_map(#post_kanban_card_v1{} = C) ->
    #{<<"command_type">> => <<"post_kanban_card">>,
      <<"division_id">>  => C#post_kanban_card_v1.division_id,
      <<"card_id">>      => C#post_kanban_card_v1.card_id,
      <<"title">>        => C#post_kanban_card_v1.title,
      <<"description">>  => C#post_kanban_card_v1.description,
      <<"card_type">>    => C#post_kanban_card_v1.card_type,
      <<"posted_by">>    => C#post_kanban_card_v1.posted_by}.

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
