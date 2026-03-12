%%% @doc disband_team_v1 command.
%%% Disbands a division team.
-module(disband_team_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_reason/1, get_disbanded_by/1]).

-record(disband_team_v1, {
    division_id  :: binary(),
    reason       :: binary() | undefined,
    disbanded_by :: binary() | undefined
}).

-export_type([disband_team_v1/0]).
-opaque disband_team_v1() :: #disband_team_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, disband_team_v1()} | {error, term()}.
new(#{division_id := DivId} = Params) ->
    {ok, #disband_team_v1{
        division_id = DivId,
        reason = maps:get(reason, Params, undefined),
        disbanded_by = maps:get(disbanded_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(disband_team_v1()) -> {ok, disband_team_v1()} | {error, term()}.
validate(#disband_team_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#disband_team_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(disband_team_v1()) -> map().
to_map(#disband_team_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"disband_team">>,
        <<"division_id">> => Cmd#disband_team_v1.division_id,
        <<"reason">> => Cmd#disband_team_v1.reason,
        <<"disbanded_by">> => Cmd#disband_team_v1.disbanded_by
    }.

-spec from_map(map()) -> {ok, disband_team_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    case DivId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #disband_team_v1{
                division_id = DivId,
                reason = get_value(reason, Map, undefined),
                disbanded_by = get_value(disbanded_by, Map, undefined)
            }}
    end.

%% Accessors
-spec get_division_id(disband_team_v1()) -> binary().
get_division_id(#disband_team_v1{division_id = V}) -> V.

-spec get_reason(disband_team_v1()) -> binary() | undefined.
get_reason(#disband_team_v1{reason = V}) -> V.

-spec get_disbanded_by(disband_team_v1()) -> binary() | undefined.
get_disbanded_by(#disband_team_v1{disbanded_by = V}) -> V.

%% Internal
get_value(Key, Map) ->
    get_value(Key, Map, undefined).

get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error ->
            case maps:find(BinKey, Map) of
                {ok, V} -> V;
                error -> Default
            end
    end.
