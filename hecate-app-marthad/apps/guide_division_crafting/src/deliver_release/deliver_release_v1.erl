%%% @doc deliver_release_v1 command
%%% Delivers a release within a crafting dossier.
-module(deliver_release_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_release_id/1, get_version/1]).
-export([generate_id/0]).

-record(deliver_release_v1, {
    division_id :: binary(),
    release_id  :: binary(),
    version     :: binary()
}).

-export_type([deliver_release_v1/0]).
-opaque deliver_release_v1() :: #deliver_release_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, deliver_release_v1()} | {error, term()}.
new(#{division_id := DivisionId, version := Version} = Params) ->
    ReleaseId = maps:get(release_id, Params, generate_id()),
    {ok, #deliver_release_v1{
        division_id = DivisionId,
        release_id = ReleaseId,
        version = Version
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(deliver_release_v1()) -> {ok, deliver_release_v1()} | {error, term()}.
validate(#deliver_release_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#deliver_release_v1{version = V}) when not is_binary(V); byte_size(V) =:= 0 ->
    {error, invalid_version};
validate(#deliver_release_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(deliver_release_v1()) -> map().
to_map(#deliver_release_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"deliver_release">>,
        <<"division_id">> => Cmd#deliver_release_v1.division_id,
        <<"release_id">> => Cmd#deliver_release_v1.release_id,
        <<"version">> => Cmd#deliver_release_v1.version
    }.

-spec from_map(map()) -> {ok, deliver_release_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    Version = get_value(version, Map),
    ReleaseId = get_value(release_id, Map, generate_id()),
    case {DivisionId, Version} of
        {undefined, _} -> {error, missing_required_fields};
        {_, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #deliver_release_v1{
                division_id = DivisionId,
                release_id = ReleaseId,
                version = Version
            }}
    end.

%% Accessors
-spec get_division_id(deliver_release_v1()) -> binary().
get_division_id(#deliver_release_v1{division_id = V}) -> V.
-spec get_release_id(deliver_release_v1()) -> binary().
get_release_id(#deliver_release_v1{release_id = V}) -> V.
-spec get_version(deliver_release_v1()) -> binary().
get_version(#deliver_release_v1{version = V}) -> V.

-spec generate_id() -> binary().
generate_id() ->
    Ts = integer_to_binary(erlang:system_time(millisecond)),
    Rand = binary:encode_hex(crypto:strong_rand_bytes(8)),
    <<"release-", Ts/binary, "-", Rand/binary>>.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
