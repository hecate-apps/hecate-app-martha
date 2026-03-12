%%% @doc maybe_receive_coordinator_input handler.
%%% Validates input and produces coordinator_input_received_v1 event.
-module(maybe_receive_coordinator_input).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(receive_coordinator_input_v1:receive_coordinator_input_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [coordinator_input_received_v1:coordinator_input_received_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case receive_coordinator_input_v1:validate(Cmd) of
        ok ->
            Event = coordinator_input_received_v1:new(#{
                session_id => receive_coordinator_input_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                input_content => receive_coordinator_input_v1:get_input_content(Cmd),
                input_by => receive_coordinator_input_v1:get_input_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
