%%% @doc maybe_reject_boundary_gate handler.
%%% Produces boundary_gate_rejected_v1 event from aggregate state.
-module(maybe_reject_boundary_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(reject_boundary_gate_v1:reject_boundary_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [boundary_gate_rejected_v1:boundary_gate_rejected_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case reject_boundary_gate_v1:validate(Cmd) of
        ok ->
            Event = boundary_gate_rejected_v1:new(#{
                session_id => reject_boundary_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                rejected_by => reject_boundary_gate_v1:get_rejected_by(Cmd),
                rejection_reason => reject_boundary_gate_v1:get_rejection_reason(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
