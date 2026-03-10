%%% @doc shelve_crafting_v1 command
%%% Shelves a crafting dossier (pauses active work).
-module(shelve_crafting_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_reason/1]).

-record(shelve_crafting_v1, {
    division_id :: binary(),
    reason      :: binary() | undefined
}).

-export_type([shelve_crafting_v1/0]).
-opaque shelve_crafting_v1() :: #shelve_crafting_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, shelve_crafting_v1()} | {error, term()}.
new(#{division_id := DivisionId} = Params) ->
    {ok, #shelve_crafting_v1{
        division_id = DivisionId,
        reason = maps:get(reason, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(shelve_crafting_v1()) -> {ok, shelve_crafting_v1()} | {error, term()}.
validate(#shelve_crafting_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#shelve_crafting_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(shelve_crafting_v1()) -> map().
to_map(#shelve_crafting_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"shelve_crafting">>,
        <<"division_id">> => Cmd#shelve_crafting_v1.division_id,
        <<"reason">> => Cmd#shelve_crafting_v1.reason
    }.

-spec from_map(map()) -> {ok, shelve_crafting_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    Reason = get_value(reason, Map, undefined),
    case DivisionId of
        undefined -> {error, missing_required_fields};
        _ -> {ok, #shelve_crafting_v1{division_id = DivisionId, reason = Reason}}
    end.

%% Accessors
-spec get_division_id(shelve_crafting_v1()) -> binary().
get_division_id(#shelve_crafting_v1{division_id = V}) -> V.

-spec get_reason(shelve_crafting_v1()) -> binary() | undefined.
get_reason(#shelve_crafting_v1{reason = V}) -> V.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
