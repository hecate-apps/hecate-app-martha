%%% @doc maybe_fail_coordinator handler.
%%% Validates fail command and produces coordinator_failed_v1 event.
-module(maybe_fail_coordinator).

-include("agent_session_state.hrl").
-include_lib("evoq/include/evoq.hrl").

-export([handle/2, dispatch/1]).

-spec handle(fail_coordinator_v1:fail_coordinator_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [coordinator_failed_v1:coordinator_failed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case fail_coordinator_v1:validate(Cmd) of
        ok ->
            Event = coordinator_failed_v1:new(#{
                session_id => fail_coordinator_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                tier => State#agent_session_state.tier,
                model => State#agent_session_state.model,
                error_reason => fail_coordinator_v1:get_error_reason(Cmd),
                tokens_in => fail_coordinator_v1:get_tokens_in(Cmd),
                tokens_out => fail_coordinator_v1:get_tokens_out(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(fail_coordinator_v1:fail_coordinator_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = fail_coordinator_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = fail_agent,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = fail_coordinator_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => agent_orchestration_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    evoq_dispatcher:dispatch(EvoqCmd, Opts).
