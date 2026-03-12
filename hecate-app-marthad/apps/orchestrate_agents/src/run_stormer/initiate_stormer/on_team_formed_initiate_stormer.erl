%%% @doc Process manager: on team_formed, initiate stormer.
%%% Subscribes to team_formed_v1 from orchestration_store.
-module(on_team_formed_initiate_stormer).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"team_formed_v1">>).
-define(SUB_NAME, <<"on_team_formed_initiate_stormer">>).
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
    DivisionId = get_value(division_id, Event),
    VentureId = get_value(venture_id, Event),
    case {DivisionId, VentureId} of
        {undefined, _} ->
            logger:warning("[~s] missing division_id in event", [?MODULE]);
        {_, undefined} ->
            logger:warning("[~s] missing venture_id in event", [?MODULE]);
        _ ->
            CmdParams = #{
                venture_id => VentureId,
                division_id => DivisionId,
                tier => <<"T1">>,
                initiated_by => <<"system:pm">>
            },
            case initiate_stormer_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_initiate_stormer:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated stormer for division ~s",
                                       [?MODULE, DivisionId]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate stormer: ~p",
                                          [?MODULE, Reason])
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
