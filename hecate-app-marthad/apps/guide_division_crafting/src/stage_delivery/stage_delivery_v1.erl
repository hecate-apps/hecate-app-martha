%%% @doc stage_delivery_v1 command
%%% Stages a delivery within a crafting dossier.
-module(stage_delivery_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_stage_id/1, get_release_id/1, get_stage_name/1]).
-export([generate_id/0]).

-record(stage_delivery_v1, {
    division_id :: binary(),
    stage_id    :: binary(),
    release_id  :: binary(),
    stage_name  :: binary()
}).

-export_type([stage_delivery_v1/0]).
-opaque stage_delivery_v1() :: #stage_delivery_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, stage_delivery_v1()} | {error, term()}.
new(#{division_id := DivisionId, release_id := ReleaseId, stage_name := StageName} = Params) ->
    StageId = maps:get(stage_id, Params, generate_id()),
    {ok, #stage_delivery_v1{
        division_id = DivisionId,
        stage_id = StageId,
        release_id = ReleaseId,
        stage_name = StageName
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(stage_delivery_v1()) -> {ok, stage_delivery_v1()} | {error, term()}.
validate(#stage_delivery_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#stage_delivery_v1{release_id = R}) when not is_binary(R); byte_size(R) =:= 0 ->
    {error, invalid_release_id};
validate(#stage_delivery_v1{stage_name = N}) when not is_binary(N); byte_size(N) =:= 0 ->
    {error, invalid_stage_name};
validate(#stage_delivery_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(stage_delivery_v1()) -> map().
to_map(#stage_delivery_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"stage_delivery">>,
        <<"division_id">> => Cmd#stage_delivery_v1.division_id,
        <<"stage_id">> => Cmd#stage_delivery_v1.stage_id,
        <<"release_id">> => Cmd#stage_delivery_v1.release_id,
        <<"stage_name">> => Cmd#stage_delivery_v1.stage_name
    }.

-spec from_map(map()) -> {ok, stage_delivery_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    ReleaseId = get_value(release_id, Map),
    StageName = get_value(stage_name, Map),
    StageId = get_value(stage_id, Map, generate_id()),
    case {DivisionId, ReleaseId, StageName} of
        {undefined, _, _} -> {error, missing_required_fields};
        {_, undefined, _} -> {error, missing_required_fields};
        {_, _, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #stage_delivery_v1{
                division_id = DivisionId,
                stage_id = StageId,
                release_id = ReleaseId,
                stage_name = StageName
            }}
    end.

%% Accessors
-spec get_division_id(stage_delivery_v1()) -> binary().
get_division_id(#stage_delivery_v1{division_id = V}) -> V.
-spec get_stage_id(stage_delivery_v1()) -> binary().
get_stage_id(#stage_delivery_v1{stage_id = V}) -> V.
-spec get_release_id(stage_delivery_v1()) -> binary().
get_release_id(#stage_delivery_v1{release_id = V}) -> V.
-spec get_stage_name(stage_delivery_v1()) -> binary().
get_stage_name(#stage_delivery_v1{stage_name = V}) -> V.

-spec generate_id() -> binary().
generate_id() ->
    Ts = integer_to_binary(erlang:system_time(millisecond)),
    Rand = binary:encode_hex(crypto:strong_rand_bytes(8)),
    <<"stage-", Ts/binary, "-", Rand/binary>>.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
