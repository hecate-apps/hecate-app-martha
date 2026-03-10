%%% @doc maybe_run_test_suite handler
-module(maybe_run_test_suite).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(run_test_suite_v1:run_test_suite_v1()) ->
    {ok, [test_suite_run_v1:test_suite_run_v1()]} | {error, term()}.
handle(Cmd) ->
    DivisionId = run_test_suite_v1:get_division_id(Cmd),
    case validate_command(DivisionId) of
        ok ->
            Event = test_suite_run_v1:new(#{
                division_id => DivisionId,
                suite_id => run_test_suite_v1:get_suite_id(Cmd),
                suite_name => run_test_suite_v1:get_suite_name(Cmd)
            }),
            {ok, [Event]};
        {error, Reason} ->
            {error, Reason}
    end.

-spec dispatch(run_test_suite_v1:run_test_suite_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = run_test_suite_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = run_test_suite,
        aggregate_type = division_crafting_aggregate,
        aggregate_id = DivisionId,
        payload = run_test_suite_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_crafting_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{store_id => martha_store, adapter => reckon_evoq_adapter, consistency => eventual},
    evoq_dispatcher:dispatch(EvoqCmd, Opts).

%% Internal
validate_command(DivisionId) when is_binary(DivisionId), byte_size(DivisionId) > 0 -> ok;
validate_command(_) -> {error, invalid_division_id}.
