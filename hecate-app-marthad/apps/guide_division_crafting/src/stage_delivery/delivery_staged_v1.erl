%%% @doc delivery_staged_v1 event
%%% Emitted when a delivery stage is completed within a crafting dossier.
-module(delivery_staged_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_stage_id/1, get_release_id/1, get_stage_name/1, get_staged_at/1]).

-record(delivery_staged_v1, {
    division_id :: binary(),
    stage_id    :: binary(),
    release_id  :: binary(),
    stage_name  :: binary(),
    staged_at   :: integer()
}).

-export_type([delivery_staged_v1/0]).
-opaque delivery_staged_v1() :: #delivery_staged_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> delivery_staged_v1().
new(#{division_id := DivisionId, stage_id := StageId, release_id := ReleaseId, stage_name := StageName}) ->
    #delivery_staged_v1{
        division_id = DivisionId,
        stage_id = StageId,
        release_id = ReleaseId,
        stage_name = StageName,
        staged_at = erlang:system_time(millisecond)
    }.

-spec to_map(delivery_staged_v1()) -> map().
to_map(#delivery_staged_v1{} = E) ->
    #{
        <<"event_type">> => <<"delivery_staged_v1">>,
        <<"division_id">> => E#delivery_staged_v1.division_id,
        <<"stage_id">> => E#delivery_staged_v1.stage_id,
        <<"release_id">> => E#delivery_staged_v1.release_id,
        <<"stage_name">> => E#delivery_staged_v1.stage_name,
        <<"staged_at">> => E#delivery_staged_v1.staged_at
    }.

-spec from_map(map()) -> {ok, delivery_staged_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    StageId = get_value(stage_id, Map),
    case {DivisionId, StageId} of
        {undefined, _} -> {error, invalid_event};
        {_, undefined} -> {error, invalid_event};
        _ ->
            {ok, #delivery_staged_v1{
                division_id = DivisionId,
                stage_id = StageId,
                release_id = get_value(release_id, Map, <<>>),
                stage_name = get_value(stage_name, Map, <<>>),
                staged_at = get_value(staged_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(delivery_staged_v1()) -> binary().
get_division_id(#delivery_staged_v1{division_id = V}) -> V.
-spec get_stage_id(delivery_staged_v1()) -> binary().
get_stage_id(#delivery_staged_v1{stage_id = V}) -> V.
-spec get_release_id(delivery_staged_v1()) -> binary().
get_release_id(#delivery_staged_v1{release_id = V}) -> V.
-spec get_stage_name(delivery_staged_v1()) -> binary().
get_stage_name(#delivery_staged_v1{stage_name = V}) -> V.
-spec get_staged_at(delivery_staged_v1()) -> integer().
get_staged_at(#delivery_staged_v1{staged_at = V}) -> V.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
