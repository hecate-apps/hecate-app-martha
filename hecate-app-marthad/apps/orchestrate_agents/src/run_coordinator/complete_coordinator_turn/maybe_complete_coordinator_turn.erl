%%% @doc maybe_complete_coordinator_turn handler.
%%% Validates turn completion and produces coordinator_turn_completed_v1 event.
-module(maybe_complete_coordinator_turn).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(complete_coordinator_turn_v1:complete_coordinator_turn_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [coordinator_turn_completed_v1:coordinator_turn_completed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case complete_coordinator_turn_v1:validate(Cmd) of
        ok ->
            Event = coordinator_turn_completed_v1:new(#{
                session_id => complete_coordinator_turn_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                agent_output => complete_coordinator_turn_v1:get_agent_output(Cmd),
                turn_number => complete_coordinator_turn_v1:get_turn_number(Cmd),
                tokens_in => complete_coordinator_turn_v1:get_tokens_in(Cmd),
                tokens_out => complete_coordinator_turn_v1:get_tokens_out(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
