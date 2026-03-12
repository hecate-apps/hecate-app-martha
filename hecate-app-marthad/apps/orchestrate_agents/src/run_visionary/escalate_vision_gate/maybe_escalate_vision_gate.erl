%%% @doc maybe_escalate_vision_gate handler.
%%% Produces vision_gate_escalated_v1 event from aggregate state.
-module(maybe_escalate_vision_gate).

-include("agent_session_state.hrl").
-include_lib("evoq/include/evoq.hrl").

-export([handle/2, dispatch/1]).

-spec handle(escalate_vision_gate_v1:escalate_vision_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [vision_gate_escalated_v1:vision_gate_escalated_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case escalate_vision_gate_v1:validate(Cmd) of
        ok ->
            Event = vision_gate_escalated_v1:new(#{
                session_id => escalate_vision_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                notation_output => State#agent_session_state.notation_output,
                parsed_terms => State#agent_session_state.parsed_terms
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(escalate_vision_gate_v1:escalate_vision_gate_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = escalate_vision_gate_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = escalate_to_gate,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = escalate_vision_gate_v1:to_map(Cmd),
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
