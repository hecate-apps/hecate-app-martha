%%% @doc maybe_plan_desk handler
%%% Business logic for planning desks in division planning.
-module(maybe_plan_desk).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, handle/2, dispatch/1]).

-spec handle(plan_desk_v1:plan_desk_v1()) ->
    {ok, [desk_planned_v1:desk_planned_v1()]} | {error, term()}.
handle(Cmd) ->
    handle(Cmd, #{}).

-spec handle(plan_desk_v1:plan_desk_v1(), map()) ->
    {ok, [desk_planned_v1:desk_planned_v1()]} | {error, term()}.
handle(Cmd, Context) ->
    DeskName = plan_desk_v1:get_desk_name(Cmd),
    PlannedDesks = maps:get(planned_desks, Context, #{}),
    case maps:is_key(DeskName, PlannedDesks) of
        true ->
            {error, desk_already_planned};
        false ->
            Event = desk_planned_v1:new(#{
                division_id => plan_desk_v1:get_division_id(Cmd),
                desk_name => DeskName,
                department => plan_desk_v1:get_department(Cmd),
                description => plan_desk_v1:get_description(Cmd),
                commands => plan_desk_v1:get_commands(Cmd)
            }),
            {ok, [Event]}
    end.

-spec dispatch(plan_desk_v1:plan_desk_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = plan_desk_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = plan_desk,
        aggregate_type = division_planning_aggregate,
        aggregate_id = DivisionId,
        payload = plan_desk_v1:to_map(Cmd),
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
