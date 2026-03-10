%%% @doc maybe_deliver_release handler
-module(maybe_deliver_release).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(deliver_release_v1:deliver_release_v1()) ->
    {ok, [release_delivered_v1:release_delivered_v1()]} | {error, term()}.
handle(Cmd) ->
    DivisionId = deliver_release_v1:get_division_id(Cmd),
    case validate_command(DivisionId) of
        ok ->
            Event = release_delivered_v1:new(#{
                division_id => DivisionId,
                release_id => deliver_release_v1:get_release_id(Cmd),
                version => deliver_release_v1:get_version(Cmd)
            }),
            {ok, [Event]};
        {error, Reason} ->
            {error, Reason}
    end.

-spec dispatch(deliver_release_v1:deliver_release_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = deliver_release_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = deliver_release,
        aggregate_type = division_crafting_aggregate,
        aggregate_id = DivisionId,
        payload = deliver_release_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_crafting_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{store_id => martha_store, adapter => reckon_evoq_adapter, consistency => eventual},
    evoq_dispatcher:dispatch(EvoqCmd, Opts).

%% Internal
validate_command(DivisionId) when is_binary(DivisionId), byte_size(DivisionId) > 0 -> ok;
validate_command(_) -> {error, invalid_division_id}.
