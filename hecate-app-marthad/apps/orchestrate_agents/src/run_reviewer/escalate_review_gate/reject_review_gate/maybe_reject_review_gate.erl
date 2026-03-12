%%% @doc maybe_reject_review_gate handler.
%%% Produces review_gate_rejected_v1 event from aggregate state.
-module(maybe_reject_review_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(reject_review_gate_v1:reject_review_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [review_gate_rejected_v1:review_gate_rejected_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case reject_review_gate_v1:validate(Cmd) of
        ok ->
            Event = review_gate_rejected_v1:new(#{
                session_id => reject_review_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                rejected_by => reject_review_gate_v1:get_rejected_by(Cmd),
                rejection_reason => reject_review_gate_v1:get_rejection_reason(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
