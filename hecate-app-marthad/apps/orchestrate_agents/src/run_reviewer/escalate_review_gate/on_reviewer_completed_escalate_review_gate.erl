%%% @doc Process manager: on reviewer_completed_v1, auto-escalate to review_gate.
%%% Subscribes to reviewer_completed_v1 from orchestration_store.
-module(on_reviewer_completed_escalate_review_gate).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"reviewer_completed_v1">>).
-define(SUB_NAME, <<"on_reviewer_completed_escalate_review_gate">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
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
    case SessionId of
        undefined ->
            logger:warning("[~s] missing session_id in event", [?MODULE]);
        _ ->
            CmdParams = #{session_id => SessionId},
            case escalate_review_gate_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_escalate_review_gate:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] escalated ~s to review_gate",
                                       [?MODULE, SessionId]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to escalate ~s: ~p",
                                          [?MODULE, SessionId, Reason])
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
