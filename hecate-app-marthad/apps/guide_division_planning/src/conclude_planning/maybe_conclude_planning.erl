%%% @doc maybe_conclude_planning handler
%%% Business logic for concluding division planning.
-module(maybe_conclude_planning).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(conclude_planning_v1:conclude_planning_v1()) ->
    {ok, [planning_concluded_v1:planning_concluded_v1()]} | {error, term()}.
handle(Cmd) ->
    DivisionId = conclude_planning_v1:get_division_id(Cmd),
    case validate_command(DivisionId) of
        ok ->
            Event = planning_concluded_v1:new(#{division_id => DivisionId}),
            {ok, [Event]};
        {error, Reason} ->
            {error, Reason}
    end.

-spec dispatch(conclude_planning_v1:conclude_planning_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = conclude_planning_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = conclude_planning,
        aggregate_type = division_planning_aggregate,
        aggregate_id = DivisionId,
        payload = conclude_planning_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_planning_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },

    Opts = #{
        store_id => martha_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },

    evoq_dispatcher:dispatch(EvoqCmd, Opts).

%% Internal
validate_command(DivisionId) when is_binary(DivisionId), byte_size(DivisionId) > 0 ->
    ok;
validate_command(_) ->
    {error, invalid_division_id}.
