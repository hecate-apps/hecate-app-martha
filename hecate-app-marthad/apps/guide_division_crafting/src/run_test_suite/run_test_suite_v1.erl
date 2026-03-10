%%% @doc run_test_suite_v1 command
%%% Runs a test suite within a crafting dossier.
-module(run_test_suite_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_suite_id/1, get_suite_name/1]).
-export([generate_id/0]).

-record(run_test_suite_v1, {
    division_id :: binary(),
    suite_id    :: binary(),
    suite_name  :: binary()
}).

-export_type([run_test_suite_v1/0]).
-opaque run_test_suite_v1() :: #run_test_suite_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, run_test_suite_v1()} | {error, term()}.
new(#{division_id := DivisionId, suite_name := SuiteName} = Params) ->
    SuiteId = maps:get(suite_id, Params, generate_id()),
    {ok, #run_test_suite_v1{
        division_id = DivisionId,
        suite_id = SuiteId,
        suite_name = SuiteName
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(run_test_suite_v1()) -> {ok, run_test_suite_v1()} | {error, term()}.
validate(#run_test_suite_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#run_test_suite_v1{suite_name = N}) when not is_binary(N); byte_size(N) =:= 0 ->
    {error, invalid_suite_name};
validate(#run_test_suite_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(run_test_suite_v1()) -> map().
to_map(#run_test_suite_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"run_test_suite">>,
        <<"division_id">> => Cmd#run_test_suite_v1.division_id,
        <<"suite_id">> => Cmd#run_test_suite_v1.suite_id,
        <<"suite_name">> => Cmd#run_test_suite_v1.suite_name
    }.

-spec from_map(map()) -> {ok, run_test_suite_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    SuiteName = get_value(suite_name, Map),
    SuiteId = get_value(suite_id, Map, generate_id()),
    case {DivisionId, SuiteName} of
        {undefined, _} -> {error, missing_required_fields};
        {_, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #run_test_suite_v1{
                division_id = DivisionId,
                suite_id = SuiteId,
                suite_name = SuiteName
            }}
    end.

%% Accessors
-spec get_division_id(run_test_suite_v1()) -> binary().
get_division_id(#run_test_suite_v1{division_id = V}) -> V.
-spec get_suite_id(run_test_suite_v1()) -> binary().
get_suite_id(#run_test_suite_v1{suite_id = V}) -> V.
-spec get_suite_name(run_test_suite_v1()) -> binary().
get_suite_name(#run_test_suite_v1{suite_name = V}) -> V.

-spec generate_id() -> binary().
generate_id() ->
    Ts = integer_to_binary(erlang:system_time(millisecond)),
    Rand = binary:encode_hex(crypto:strong_rand_bytes(8)),
    <<"suite-", Ts/binary, "-", Rand/binary>>.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
