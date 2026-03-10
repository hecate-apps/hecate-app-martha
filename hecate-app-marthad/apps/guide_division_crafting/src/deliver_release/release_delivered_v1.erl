%%% @doc release_delivered_v1 event
%%% Emitted when a release is delivered within a crafting dossier.
-module(release_delivered_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_release_id/1, get_version/1, get_delivered_at/1]).

-record(release_delivered_v1, {
    division_id  :: binary(),
    release_id   :: binary(),
    version      :: binary(),
    delivered_at :: integer()
}).

-export_type([release_delivered_v1/0]).
-opaque release_delivered_v1() :: #release_delivered_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> release_delivered_v1().
new(#{division_id := DivisionId, release_id := ReleaseId, version := Version}) ->
    #release_delivered_v1{
        division_id = DivisionId,
        release_id = ReleaseId,
        version = Version,
        delivered_at = erlang:system_time(millisecond)
    }.

-spec to_map(release_delivered_v1()) -> map().
to_map(#release_delivered_v1{} = E) ->
    #{
        <<"event_type">> => <<"release_delivered_v1">>,
        <<"division_id">> => E#release_delivered_v1.division_id,
        <<"release_id">> => E#release_delivered_v1.release_id,
        <<"version">> => E#release_delivered_v1.version,
        <<"delivered_at">> => E#release_delivered_v1.delivered_at
    }.

-spec from_map(map()) -> {ok, release_delivered_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    ReleaseId = get_value(release_id, Map),
    case {DivisionId, ReleaseId} of
        {undefined, _} -> {error, invalid_event};
        {_, undefined} -> {error, invalid_event};
        _ ->
            {ok, #release_delivered_v1{
                division_id = DivisionId,
                release_id = ReleaseId,
                version = get_value(version, Map, <<>>),
                delivered_at = get_value(delivered_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(release_delivered_v1()) -> binary().
get_division_id(#release_delivered_v1{division_id = V}) -> V.
-spec get_release_id(release_delivered_v1()) -> binary().
get_release_id(#release_delivered_v1{release_id = V}) -> V.
-spec get_version(release_delivered_v1()) -> binary().
get_version(#release_delivered_v1{version = V}) -> V.
-spec get_delivered_at(release_delivered_v1()) -> integer().
get_delivered_at(#release_delivered_v1{delivered_at = V}) -> V.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
