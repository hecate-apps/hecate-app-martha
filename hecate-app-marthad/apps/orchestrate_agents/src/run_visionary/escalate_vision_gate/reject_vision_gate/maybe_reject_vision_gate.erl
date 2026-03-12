%%% @doc maybe_reject_vision_gate handler.
%%% Produces vision_gate_rejected_v1 event from aggregate state.
-module(maybe_reject_vision_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(reject_vision_gate_v1:reject_vision_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [vision_gate_rejected_v1:vision_gate_rejected_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case reject_vision_gate_v1:validate(Cmd) of
        ok ->
            Event = vision_gate_rejected_v1:new(#{
                session_id => reject_vision_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                rejected_by => reject_vision_gate_v1:get_rejected_by(Cmd),
                rejection_reason => reject_vision_gate_v1:get_rejection_reason(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
