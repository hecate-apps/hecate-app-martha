%%% @doc Process manager: on {role}_initiated_v1, assign agent to division team.
%%% Subscribes to all per-role initiated events from orchestration_store.
%%% When an agent session is initiated with a division_id, assigns it
%%% to the corresponding division team.
-module(on_agent_initiated_assign_agent_to_team).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(SUB_PREFIX, <<"on_agent_initiated_assign_agent_to_team_">>).
-define(STORE_ID, orchestration_store).

-define(INITIATED_EVENTS, [
    <<"visionary_initiated_v1">>,
    <<"explorer_initiated_v1">>,
    <<"stormer_initiated_v1">>,
    <<"architect_initiated_v1">>,
    <<"erlang_coder_initiated_v1">>,
    <<"svelte_coder_initiated_v1">>,
    <<"sql_coder_initiated_v1">>,
    <<"tester_initiated_v1">>,
    <<"reviewer_initiated_v1">>,
    <<"coordinator_initiated_v1">>,
    <<"delivery_manager_initiated_v1">>,
    <<"mentor_initiated_v1">>
]).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    lists:foreach(fun(EventType) ->
        SubName = <<?SUB_PREFIX/binary, EventType/binary>>,
        {ok, _} = reckon_evoq_adapter:subscribe(
            ?STORE_ID, event_type, EventType, SubName,
            #{subscriber_pid => self()})
    end, ?INITIATED_EVENTS),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun process_event/1, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

%% Internal

process_event(RawEvent) ->
    Event = app_marthad_projection_event:to_map(RawEvent),
    SessionId = get_value(session_id, Event),
    AgentRole = get_value(agent_role, Event),
    DivisionId = get_value(division_id, Event),
    case DivisionId of
        undefined ->
            %% Venture-level agents (visionary, explorer) have no division — skip
            ok;
        <<>> ->
            ok;
        _ ->
            CmdParams = #{
                division_id => DivisionId,
                agent_role => AgentRole,
                session_id => SessionId
            },
            case assign_agent_to_team_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_assign_agent_to_team:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] assigned ~s (~s) to team ~s",
                                       [?MODULE, SessionId, AgentRole, DivisionId]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to assign ~s to team ~s: ~p",
                                          [?MODULE, SessionId, DivisionId, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
