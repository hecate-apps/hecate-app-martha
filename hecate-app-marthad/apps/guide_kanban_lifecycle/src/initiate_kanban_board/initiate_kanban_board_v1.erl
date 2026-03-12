%%% @doc Command: initiate a kanban board for a division.
-module(initiate_kanban_board_v1).

-record(initiate_kanban_board_v1, {
    division_id  :: binary(),
    venture_id   :: binary(),
    context_name :: binary(),
    initiated_by :: binary() | undefined
}).

-type initiate_kanban_board_v1() :: #initiate_kanban_board_v1{}.
-export_type([initiate_kanban_board_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_venture_id/1, get_context_name/1, get_initiated_by/1]).

-spec new(map()) -> {ok, initiate_kanban_board_v1()} | {error, term()}.
new(Params) ->
    Cmd = #initiate_kanban_board_v1{
        division_id  = maps:get(division_id, Params),
        venture_id   = maps:get(venture_id, Params),
        context_name = maps:get(context_name, Params, <<>>),
        initiated_by = maps:get(initiated_by, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, initiate_kanban_board_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id  => get_value(division_id, Map),
        venture_id   => get_value(venture_id, Map),
        context_name => get_value(context_name, Map, <<>>),
        initiated_by => get_value(initiated_by, Map, undefined)
    }).

-spec validate(initiate_kanban_board_v1()) -> ok | {error, term()}.
validate(#initiate_kanban_board_v1{division_id = D, venture_id = V})
  when is_binary(D), byte_size(D) > 0,
       is_binary(V), byte_size(V) > 0 -> ok;
validate(_) -> {error, invalid_initiate_kanban_board}.

-spec to_map(initiate_kanban_board_v1()) -> map().
to_map(#initiate_kanban_board_v1{} = C) ->
    #{<<"command_type">> => <<"initiate_kanban_board">>,
      <<"division_id">>  => C#initiate_kanban_board_v1.division_id,
      <<"venture_id">>   => C#initiate_kanban_board_v1.venture_id,
      <<"context_name">> => C#initiate_kanban_board_v1.context_name,
      <<"initiated_by">> => C#initiate_kanban_board_v1.initiated_by}.

get_division_id(#initiate_kanban_board_v1{division_id = V}) -> V.
get_venture_id(#initiate_kanban_board_v1{venture_id = V}) -> V.
get_context_name(#initiate_kanban_board_v1{context_name = V}) -> V.
get_initiated_by(#initiate_kanban_board_v1{initiated_by = V}) -> V.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
