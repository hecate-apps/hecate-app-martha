%%% @doc shelve_planning_v1 command
%%% Shelves a division planning dossier.
-module(shelve_planning_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_reason/1]).

-record(shelve_planning_v1, {
    division_id :: binary(),
    reason      :: binary() | undefined
}).

-export_type([shelve_planning_v1/0]).
-opaque shelve_planning_v1() :: #shelve_planning_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, shelve_planning_v1()} | {error, term()}.
new(#{division_id := DivisionId} = Params) ->
    Cmd = #shelve_planning_v1{
        division_id = DivisionId,
        reason = maps:get(reason, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        {error, _} = Err -> Err
    end;
new(_) ->
    {error, missing_required_fields}.

-spec validate(shelve_planning_v1()) -> ok | {error, term()}.
validate(#shelve_planning_v1{division_id = D}) when not is_binary(D); D =:= <<>> ->
    {error, {invalid_field, division_id}};
validate(_) -> ok.

-spec to_map(shelve_planning_v1()) -> map().
to_map(#shelve_planning_v1{division_id = D, reason = R}) ->
    #{
        <<"command_type">> => <<"shelve_planning">>,
        <<"division_id">> => D,
        <<"reason">> => R
    }.

-spec from_map(map()) -> {ok, shelve_planning_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    Reason = get_value(reason, Map),
    case DivisionId of
        undefined -> {error, missing_required_fields};
        _ -> new(#{division_id => DivisionId, reason => Reason})
    end.

%% Accessors
-spec get_division_id(shelve_planning_v1()) -> binary().
get_division_id(#shelve_planning_v1{division_id = V}) -> V.

-spec get_reason(shelve_planning_v1()) -> binary() | undefined.
get_reason(#shelve_planning_v1{reason = V}) -> V.

%% Internal
get_value(Key, Map) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error ->
            case maps:find(BinKey, Map) of
                {ok, V} -> V;
                error -> undefined
            end
    end.
