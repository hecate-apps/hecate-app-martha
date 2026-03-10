%%% @doc conclude_crafting_v1 command
%%% Concludes a crafting dossier (marks as done).
-module(conclude_crafting_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1]).

-record(conclude_crafting_v1, {
    division_id :: binary()
}).

-export_type([conclude_crafting_v1/0]).
-opaque conclude_crafting_v1() :: #conclude_crafting_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, conclude_crafting_v1()} | {error, term()}.
new(#{division_id := DivisionId}) ->
    {ok, #conclude_crafting_v1{division_id = DivisionId}};
new(_) ->
    {error, missing_required_fields}.

-spec validate(conclude_crafting_v1()) -> {ok, conclude_crafting_v1()} | {error, term()}.
validate(#conclude_crafting_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#conclude_crafting_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(conclude_crafting_v1()) -> map().
to_map(#conclude_crafting_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"conclude_crafting">>,
        <<"division_id">> => Cmd#conclude_crafting_v1.division_id
    }.

-spec from_map(map()) -> {ok, conclude_crafting_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    case DivisionId of
        undefined -> {error, missing_required_fields};
        _ -> {ok, #conclude_crafting_v1{division_id = DivisionId}}
    end.

%% Accessors
-spec get_division_id(conclude_crafting_v1()) -> binary().
get_division_id(#conclude_crafting_v1{division_id = V}) -> V.

%% Internal helper
get_value(Key, Map) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> undefined end
    end.
