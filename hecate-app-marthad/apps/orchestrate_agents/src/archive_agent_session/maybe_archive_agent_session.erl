%%% @doc maybe_archive_agent_session handler.
%%% Business logic for archiving agent sessions.
-module(maybe_archive_agent_session).

-include_lib("evoq/include/evoq.hrl").
-include("agent_session_state.hrl").

-export([handle/1, handle/2, dispatch/1]).

-spec handle(archive_agent_session_v1:archive_agent_session_v1()) ->
    {ok, [agent_session_archived_v1:agent_session_archived_v1()]} | {error, term()}.
handle(Cmd) ->
    handle(Cmd, undefined).

-spec handle(archive_agent_session_v1:archive_agent_session_v1(),
             #agent_session_state{} | undefined) ->
    {ok, [agent_session_archived_v1:agent_session_archived_v1()]} | {error, term()}.
handle(Cmd, State) ->
    {AgentRole, VentureId, DivisionId} = extract_context(State),
    Event = agent_session_archived_v1:new(#{
        session_id => archive_agent_session_v1:get_session_id(Cmd),
        agent_role => AgentRole,
        venture_id => VentureId,
        division_id => DivisionId,
        archived_by => archive_agent_session_v1:get_archived_by(Cmd)
    }),
    {ok, [Event]}.

-spec dispatch(archive_agent_session_v1:archive_agent_session_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = archive_agent_session_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = archive_agent_session,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = archive_agent_session_v1:to_map(Cmd),
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

%% Internal

extract_context(#agent_session_state{agent_role = R, venture_id = V, division_id = D}) ->
    {R, V, D};
extract_context(_) ->
    {<<"unknown">>, <<>>, undefined}.
