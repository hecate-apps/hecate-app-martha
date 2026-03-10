%%% @doc maybe_plan_dependency handler
%%% Business logic for planning dependencies in division planning.
-module(maybe_plan_dependency).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, handle/2, dispatch/1]).

-spec handle(plan_dependency_v1:plan_dependency_v1()) ->
    {ok, [dependency_planned_v1:dependency_planned_v1()]} | {error, term()}.
handle(Cmd) ->
    handle(Cmd, #{}).

-spec handle(plan_dependency_v1:plan_dependency_v1(), map()) ->
    {ok, [dependency_planned_v1:dependency_planned_v1()]} | {error, term()}.
handle(Cmd, _Context) ->
    Event = dependency_planned_v1:new(#{
        division_id => plan_dependency_v1:get_division_id(Cmd),
        dependency_id => plan_dependency_v1:get_dependency_id(Cmd),
        from_desk => plan_dependency_v1:get_from_desk(Cmd),
        to_desk => plan_dependency_v1:get_to_desk(Cmd),
        dep_type => plan_dependency_v1:get_dep_type(Cmd)
    }),
    {ok, [Event]}.

-spec dispatch(plan_dependency_v1:plan_dependency_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = plan_dependency_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = plan_dependency,
        aggregate_type = division_planning_aggregate,
        aggregate_id = DivisionId,
        payload = plan_dependency_v1:to_map(Cmd),
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
