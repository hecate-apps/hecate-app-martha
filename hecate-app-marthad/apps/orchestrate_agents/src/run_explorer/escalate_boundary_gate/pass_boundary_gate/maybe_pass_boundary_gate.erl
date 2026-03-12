%%% @doc maybe_pass_boundary_gate handler.
%%% Produces boundary_gate_passed_v1 event from aggregate state.
-module(maybe_pass_boundary_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(pass_boundary_gate_v1:pass_boundary_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [boundary_gate_passed_v1:boundary_gate_passed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case pass_boundary_gate_v1:validate(Cmd) of
        ok ->
            Event = boundary_gate_passed_v1:new(#{
                session_id => pass_boundary_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                notation_output => State#agent_session_state.notation_output,
                parsed_terms => State#agent_session_state.parsed_terms,
                passed_by => pass_boundary_gate_v1:get_passed_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
