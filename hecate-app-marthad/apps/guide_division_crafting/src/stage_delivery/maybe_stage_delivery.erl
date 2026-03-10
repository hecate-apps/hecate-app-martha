%%% @doc maybe_stage_delivery handler
-module(maybe_stage_delivery).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(stage_delivery_v1:stage_delivery_v1()) ->
    {ok, [delivery_staged_v1:delivery_staged_v1()]} | {error, term()}.
handle(Cmd) ->
    DivisionId = stage_delivery_v1:get_division_id(Cmd),
    case validate_command(DivisionId) of
        ok ->
            Event = delivery_staged_v1:new(#{
                division_id => DivisionId,
                stage_id => stage_delivery_v1:get_stage_id(Cmd),
                release_id => stage_delivery_v1:get_release_id(Cmd),
                stage_name => stage_delivery_v1:get_stage_name(Cmd)
            }),
            {ok, [Event]};
        {error, Reason} ->
            {error, Reason}
    end.

-spec dispatch(stage_delivery_v1:stage_delivery_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = stage_delivery_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = stage_delivery,
        aggregate_type = division_crafting_aggregate,
        aggregate_id = DivisionId,
        payload = stage_delivery_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_crafting_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{store_id => martha_store, adapter => reckon_evoq_adapter, consistency => eventual},
    evoq_dispatcher:dispatch(EvoqCmd, Opts).

%% Internal
validate_command(DivisionId) when is_binary(DivisionId), byte_size(DivisionId) > 0 -> ok;
validate_command(_) -> {error, invalid_division_id}.
