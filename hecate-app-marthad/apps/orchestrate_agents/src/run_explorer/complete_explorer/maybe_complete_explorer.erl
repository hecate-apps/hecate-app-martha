%%% @doc maybe_complete_explorer handler.
%%% Validates completion command and produces explorer_completed_v1 event.
-module(maybe_complete_explorer).

-include("agent_session_state.hrl").
-include_lib("evoq/include/evoq.hrl").

-export([handle/2, dispatch/1]).

-spec handle(complete_explorer_v1:complete_explorer_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [explorer_completed_v1:explorer_completed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case complete_explorer_v1:validate(Cmd) of
        ok ->
            Event = explorer_completed_v1:new(#{
                session_id => complete_explorer_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                tier => State#agent_session_state.tier,
                model => State#agent_session_state.model,
                notation_output => complete_explorer_v1:get_notation_output(Cmd),
                parsed_terms => complete_explorer_v1:get_parsed_terms(Cmd),
                tokens_in => complete_explorer_v1:get_tokens_in(Cmd),
                tokens_out => complete_explorer_v1:get_tokens_out(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(complete_explorer_v1:complete_explorer_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = complete_explorer_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = complete_agent,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = complete_explorer_v1:to_map(Cmd),
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
