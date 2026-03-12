%%% @doc Event: kanban board archived.
-module(kanban_board_archived_v1).

-record(kanban_board_archived_v1, {
    division_id :: binary(),
    archived_at :: non_neg_integer()
}).

-type kanban_board_archived_v1() :: #kanban_board_archived_v1{}.
-export_type([kanban_board_archived_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_archived_at/1]).

-spec new(map()) -> kanban_board_archived_v1().
new(Params) ->
    #kanban_board_archived_v1{
        division_id = maps:get(division_id, Params),
        archived_at = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_board_archived_v1()) -> map().
to_map(#kanban_board_archived_v1{} = E) ->
    #{<<"event_type">>   => <<"kanban_board_archived_v1">>,
      <<"division_id">>  => E#kanban_board_archived_v1.division_id,
      <<"archived_at">>  => E#kanban_board_archived_v1.archived_at}.

-spec from_map(map()) -> {ok, kanban_board_archived_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_board_archived_v1{
        division_id = get_value(division_id, Map),
        archived_at = get_value(archived_at, Map, erlang:system_time(millisecond))
    }}.

get_division_id(#kanban_board_archived_v1{division_id = V}) -> V.
get_archived_at(#kanban_board_archived_v1{archived_at = V}) -> V.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
