%%% @doc record_test_result_v1 command
%%% Records a test result within a crafting dossier.
-module(record_test_result_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_result_id/1, get_suite_id/1, get_passed/1, get_failed/1]).
-export([generate_id/0]).

-record(record_test_result_v1, {
    division_id :: binary(),
    result_id   :: binary(),
    suite_id    :: binary(),
    passed      :: non_neg_integer(),
    failed      :: non_neg_integer()
}).

-export_type([record_test_result_v1/0]).
-opaque record_test_result_v1() :: #record_test_result_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, record_test_result_v1()} | {error, term()}.
new(#{division_id := DivisionId, suite_id := SuiteId, passed := Passed, failed := Failed} = Params) ->
    ResultId = maps:get(result_id, Params, generate_id()),
    {ok, #record_test_result_v1{
        division_id = DivisionId,
        result_id = ResultId,
        suite_id = SuiteId,
        passed = Passed,
        failed = Failed
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(record_test_result_v1()) -> {ok, record_test_result_v1()} | {error, term()}.
validate(#record_test_result_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#record_test_result_v1{suite_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_suite_id};
validate(#record_test_result_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(record_test_result_v1()) -> map().
to_map(#record_test_result_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"record_test_result">>,
        <<"division_id">> => Cmd#record_test_result_v1.division_id,
        <<"result_id">> => Cmd#record_test_result_v1.result_id,
        <<"suite_id">> => Cmd#record_test_result_v1.suite_id,
        <<"passed">> => Cmd#record_test_result_v1.passed,
        <<"failed">> => Cmd#record_test_result_v1.failed
    }.

-spec from_map(map()) -> {ok, record_test_result_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    SuiteId = get_value(suite_id, Map),
    Passed = get_value(passed, Map, 0),
    Failed = get_value(failed, Map, 0),
    ResultId = get_value(result_id, Map, generate_id()),
    case {DivisionId, SuiteId} of
        {undefined, _} -> {error, missing_required_fields};
        {_, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #record_test_result_v1{
                division_id = DivisionId,
                result_id = ResultId,
                suite_id = SuiteId,
                passed = Passed,
                failed = Failed
            }}
    end.

%% Accessors
-spec get_division_id(record_test_result_v1()) -> binary().
get_division_id(#record_test_result_v1{division_id = V}) -> V.
-spec get_result_id(record_test_result_v1()) -> binary().
get_result_id(#record_test_result_v1{result_id = V}) -> V.
-spec get_suite_id(record_test_result_v1()) -> binary().
get_suite_id(#record_test_result_v1{suite_id = V}) -> V.
-spec get_passed(record_test_result_v1()) -> non_neg_integer().
get_passed(#record_test_result_v1{passed = V}) -> V.
-spec get_failed(record_test_result_v1()) -> non_neg_integer().
get_failed(#record_test_result_v1{failed = V}) -> V.

-spec generate_id() -> binary().
generate_id() ->
    Ts = integer_to_binary(erlang:system_time(millisecond)),
    Rand = binary:encode_hex(crypto:strong_rand_bytes(8)),
    <<"result-", Ts/binary, "-", Rand/binary>>.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
