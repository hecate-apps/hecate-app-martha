%%% @doc team_disbanded_v1 event.
%%% Emitted when a division team is disbanded.
-module(team_disbanded_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_reason/1, get_disbanded_at/1]).

-record(team_disbanded_v1, {
    division_id  :: binary(),
    reason       :: binary() | undefined,
    disbanded_at :: integer()
}).

-export_type([team_disbanded_v1/0]).
-opaque team_disbanded_v1() :: #team_disbanded_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> team_disbanded_v1().
new(#{division_id := DivId} = Params) ->
    #team_disbanded_v1{
        division_id = DivId,
        reason = maps:get(reason, Params, undefined),
        disbanded_at = erlang:system_time(millisecond)
    }.

-spec to_map(team_disbanded_v1()) -> map().
to_map(#team_disbanded_v1{} = E) ->
    #{
        <<"event_type">> => <<"team_disbanded_v1">>,
        <<"division_id">> => E#team_disbanded_v1.division_id,
        <<"reason">> => E#team_disbanded_v1.reason,
        <<"disbanded_at">> => E#team_disbanded_v1.disbanded_at
    }.

-spec from_map(map()) -> {ok, team_disbanded_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    case DivId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #team_disbanded_v1{
                division_id = DivId,
                reason = get_value(reason, Map, undefined),
                disbanded_at = get_value(disbanded_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(team_disbanded_v1()) -> binary().
get_division_id(#team_disbanded_v1{division_id = V}) -> V.

-spec get_reason(team_disbanded_v1()) -> binary() | undefined.
get_reason(#team_disbanded_v1{reason = V}) -> V.

-spec get_disbanded_at(team_disbanded_v1()) -> integer().
get_disbanded_at(#team_disbanded_v1{disbanded_at = V}) -> V.

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
