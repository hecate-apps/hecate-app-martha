%%% @doc Event: kanban board initiated.
-module(kanban_board_initiated_v1).

-record(kanban_board_initiated_v1, {
    division_id  :: binary(),
    venture_id   :: binary(),
    context_name :: binary(),
    initiated_by :: binary() | undefined,
    initiated_at :: non_neg_integer()
}).

-type kanban_board_initiated_v1() :: #kanban_board_initiated_v1{}.
-export_type([kanban_board_initiated_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_venture_id/1, get_context_name/1,
         get_initiated_by/1, get_initiated_at/1]).

-spec new(map()) -> kanban_board_initiated_v1().
new(Params) ->
    #kanban_board_initiated_v1{
        division_id  = maps:get(division_id, Params),
        venture_id   = maps:get(venture_id, Params),
        context_name = maps:get(context_name, Params, <<>>),
        initiated_by = maps:get(initiated_by, Params, undefined),
        initiated_at = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_board_initiated_v1()) -> map().
to_map(#kanban_board_initiated_v1{} = E) ->
    #{<<"event_type">>   => <<"kanban_board_initiated_v1">>,
      <<"division_id">>  => E#kanban_board_initiated_v1.division_id,
      <<"venture_id">>   => E#kanban_board_initiated_v1.venture_id,
      <<"context_name">> => E#kanban_board_initiated_v1.context_name,
      <<"initiated_by">> => E#kanban_board_initiated_v1.initiated_by,
      <<"initiated_at">> => E#kanban_board_initiated_v1.initiated_at}.

-spec from_map(map()) -> {ok, kanban_board_initiated_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_board_initiated_v1{
        division_id  = get_value(division_id, Map),
        venture_id   = get_value(venture_id, Map),
        context_name = get_value(context_name, Map, <<>>),
        initiated_by = get_value(initiated_by, Map, undefined),
        initiated_at = get_value(initiated_at, Map, erlang:system_time(millisecond))
    }}.

get_division_id(#kanban_board_initiated_v1{division_id = V}) -> V.
get_venture_id(#kanban_board_initiated_v1{venture_id = V}) -> V.
get_context_name(#kanban_board_initiated_v1{context_name = V}) -> V.
get_initiated_by(#kanban_board_initiated_v1{initiated_by = V}) -> V.
get_initiated_at(#kanban_board_initiated_v1{initiated_at = V}) -> V.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
