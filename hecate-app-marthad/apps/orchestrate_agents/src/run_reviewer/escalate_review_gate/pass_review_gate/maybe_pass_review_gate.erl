%%% @doc maybe_pass_review_gate handler.
%%% Produces review_gate_passed_v1 event from aggregate state.
-module(maybe_pass_review_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(pass_review_gate_v1:pass_review_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [review_gate_passed_v1:review_gate_passed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case pass_review_gate_v1:validate(Cmd) of
        ok ->
            Event = review_gate_passed_v1:new(#{
                session_id => pass_review_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                notation_output => State#agent_session_state.notation_output,
                parsed_terms => State#agent_session_state.parsed_terms,
                passed_by => pass_review_gate_v1:get_passed_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
