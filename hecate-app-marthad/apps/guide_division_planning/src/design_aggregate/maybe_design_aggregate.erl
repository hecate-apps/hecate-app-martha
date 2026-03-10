%%% @doc maybe_design_aggregate handler
%%% Business logic for designing aggregates in division planning.
-module(maybe_design_aggregate).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, handle/2, dispatch/1]).

-spec handle(design_aggregate_v1:design_aggregate_v1()) ->
    {ok, [aggregate_designed_v1:aggregate_designed_v1()]} | {error, term()}.
handle(Cmd) ->
    handle(Cmd, #{}).

-spec handle(design_aggregate_v1:design_aggregate_v1(), map()) ->
    {ok, [aggregate_designed_v1:aggregate_designed_v1()]} | {error, term()}.
handle(Cmd, Context) ->
    AggName = design_aggregate_v1:get_aggregate_name(Cmd),
    DesignedAggs = maps:get(designed_aggregates, Context, #{}),
    case maps:is_key(AggName, DesignedAggs) of
        true ->
            {error, aggregate_already_designed};
        false ->
            Event = aggregate_designed_v1:new(#{
                division_id => design_aggregate_v1:get_division_id(Cmd),
                aggregate_name => AggName,
                description => design_aggregate_v1:get_description(Cmd),
                stream_prefix => design_aggregate_v1:get_stream_prefix(Cmd),
                fields => design_aggregate_v1:get_fields(Cmd)
            }),
            {ok, [Event]}
    end.

-spec dispatch(design_aggregate_v1:design_aggregate_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = design_aggregate_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = design_aggregate,
        aggregate_type = division_planning_aggregate,
        aggregate_id = DivisionId,
        payload = design_aggregate_v1:to_map(Cmd),
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
