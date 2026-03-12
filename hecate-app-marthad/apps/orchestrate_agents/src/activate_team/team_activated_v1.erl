%%% @doc team_activated_v1 event.
%%% Emitted when a division team is activated.
-module(team_activated_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_activated_at/1]).

-record(team_activated_v1, {
    division_id  :: binary(),
    activated_at :: integer()
}).

-export_type([team_activated_v1/0]).
-opaque team_activated_v1() :: #team_activated_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> team_activated_v1().
new(#{division_id := DivId}) ->
    #team_activated_v1{
        division_id = DivId,
        activated_at = erlang:system_time(millisecond)
    }.

-spec to_map(team_activated_v1()) -> map().
to_map(#team_activated_v1{} = E) ->
    #{
        <<"event_type">> => <<"team_activated_v1">>,
        <<"division_id">> => E#team_activated_v1.division_id,
        <<"activated_at">> => E#team_activated_v1.activated_at
    }.

-spec from_map(map()) -> {ok, team_activated_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    case DivId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #team_activated_v1{
                division_id = DivId,
                activated_at = get_value(activated_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(team_activated_v1()) -> binary().
get_division_id(#team_activated_v1{division_id = V}) -> V.

-spec get_activated_at(team_activated_v1()) -> integer().
get_activated_at(#team_activated_v1{activated_at = V}) -> V.

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
