%%% @doc Command: archive a kanban board.
-module(archive_kanban_board_v1).

-record(archive_kanban_board_v1, {
    division_id :: binary()
}).

-type archive_kanban_board_v1() :: #archive_kanban_board_v1{}.
-export_type([archive_kanban_board_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1]).

-spec new(map()) -> {ok, archive_kanban_board_v1()} | {error, term()}.
new(Params) ->
    Cmd = #archive_kanban_board_v1{
        division_id = maps:get(division_id, Params)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, archive_kanban_board_v1()} | {error, term()}.
from_map(Map) ->
    new(#{division_id => get_value(division_id, Map)}).

-spec validate(archive_kanban_board_v1()) -> ok | {error, term()}.
validate(#archive_kanban_board_v1{division_id = D})
  when is_binary(D), byte_size(D) > 0 -> ok;
validate(_) -> {error, invalid_archive_kanban_board}.

-spec to_map(archive_kanban_board_v1()) -> map().
to_map(#archive_kanban_board_v1{} = C) ->
    #{<<"command_type">> => <<"archive_kanban_board">>,
      <<"division_id">>  => C#archive_kanban_board_v1.division_id}.

get_division_id(#archive_kanban_board_v1{division_id = V}) -> V.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
