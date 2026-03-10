%%% @doc test_result_recorded_v1 event
%%% Emitted when a test result is recorded within a crafting dossier.
-module(test_result_recorded_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_result_id/1, get_suite_id/1, get_passed/1, get_failed/1, get_recorded_at/1]).

-record(test_result_recorded_v1, {
    division_id :: binary(),
    result_id   :: binary(),
    suite_id    :: binary(),
    passed      :: non_neg_integer(),
    failed      :: non_neg_integer(),
    recorded_at :: integer()
}).

-export_type([test_result_recorded_v1/0]).
-opaque test_result_recorded_v1() :: #test_result_recorded_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> test_result_recorded_v1().
new(#{division_id := DivisionId, result_id := ResultId, suite_id := SuiteId, passed := Passed, failed := Failed}) ->
    #test_result_recorded_v1{
        division_id = DivisionId,
        result_id = ResultId,
        suite_id = SuiteId,
        passed = Passed,
        failed = Failed,
        recorded_at = erlang:system_time(millisecond)
    }.

-spec to_map(test_result_recorded_v1()) -> map().
to_map(#test_result_recorded_v1{} = E) ->
    #{
        <<"event_type">> => <<"test_result_recorded_v1">>,
        <<"division_id">> => E#test_result_recorded_v1.division_id,
        <<"result_id">> => E#test_result_recorded_v1.result_id,
        <<"suite_id">> => E#test_result_recorded_v1.suite_id,
        <<"passed">> => E#test_result_recorded_v1.passed,
        <<"failed">> => E#test_result_recorded_v1.failed,
        <<"recorded_at">> => E#test_result_recorded_v1.recorded_at
    }.

-spec from_map(map()) -> {ok, test_result_recorded_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    ResultId = get_value(result_id, Map),
    case {DivisionId, ResultId} of
        {undefined, _} -> {error, invalid_event};
        {_, undefined} -> {error, invalid_event};
        _ ->
            {ok, #test_result_recorded_v1{
                division_id = DivisionId,
                result_id = ResultId,
                suite_id = get_value(suite_id, Map, <<>>),
                passed = get_value(passed, Map, 0),
                failed = get_value(failed, Map, 0),
                recorded_at = get_value(recorded_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(test_result_recorded_v1()) -> binary().
get_division_id(#test_result_recorded_v1{division_id = V}) -> V.
-spec get_result_id(test_result_recorded_v1()) -> binary().
get_result_id(#test_result_recorded_v1{result_id = V}) -> V.
-spec get_suite_id(test_result_recorded_v1()) -> binary().
get_suite_id(#test_result_recorded_v1{suite_id = V}) -> V.
-spec get_passed(test_result_recorded_v1()) -> non_neg_integer().
get_passed(#test_result_recorded_v1{passed = V}) -> V.
-spec get_failed(test_result_recorded_v1()) -> non_neg_integer().
get_failed(#test_result_recorded_v1{failed = V}) -> V.
-spec get_recorded_at(test_result_recorded_v1()) -> integer().
get_recorded_at(#test_result_recorded_v1{recorded_at = V}) -> V.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
