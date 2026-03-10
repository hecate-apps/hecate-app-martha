%%% @doc maybe_design_event handler
%%% Business logic for designing events in division planning.
-module(maybe_design_event).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, handle/2, dispatch/1]).

-spec handle(design_event_v1:design_event_v1()) ->
    {ok, [event_designed_v1:event_designed_v1()]} | {error, term()}.
handle(Cmd) ->
    handle(Cmd, #{}).

-spec handle(design_event_v1:design_event_v1(), map()) ->
    {ok, [event_designed_v1:event_designed_v1()]} | {error, term()}.
handle(Cmd, Context) ->
    EvtName = design_event_v1:get_event_name(Cmd),
    DesignedEvts = maps:get(designed_events, Context, #{}),
    case maps:is_key(EvtName, DesignedEvts) of
        true ->
            {error, event_already_designed};
        false ->
            Event = event_designed_v1:new(#{
                division_id => design_event_v1:get_division_id(Cmd),
                event_name => EvtName,
                description => design_event_v1:get_description(Cmd),
                aggregate_name => design_event_v1:get_aggregate_name(Cmd),
                fields => design_event_v1:get_fields(Cmd)
            }),
            {ok, [Event]}
    end.

-spec dispatch(design_event_v1:design_event_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = design_event_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = design_event,
        aggregate_type = division_planning_aggregate,
        aggregate_id = DivisionId,
        payload = design_event_v1:to_map(Cmd),
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
