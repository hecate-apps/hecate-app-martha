%%% @doc Process manager: on division_identified_v1, initiate planning.
%%%
%%% Subscribes to martha_store for division_identified_v1 events.
%%% When a division is identified, dispatches initiate_planning_v1 command
%%% to create the planning dossier for that division.
%%% @end
-module(on_division_identified_initiate_planning).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"division_identified_v1">>).
-define(SUB_NAME, <<"on_division_identified_initiate_planning">>).
-define(STORE_ID, martha_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        EvtMap = app_marthad_projection_event:to_map(E),
        DivisionId = get_value(division_id, EvtMap),
        VentureId = get_value(venture_id, EvtMap),
        ContextName = get_value(context_name, EvtMap),
        case initiate_planning_v1:new(#{
            division_id => DivisionId,
            venture_id => VentureId,
            context_name => ContextName,
            initiated_by => <<"system">>
        }) of
            {ok, Cmd} ->
                case maybe_initiate_planning:dispatch(Cmd) of
                    {ok, _, _} -> ok;
                    {error, Reason} ->
                        logger:warning("[PM] initiate_planning failed: ~p", [Reason])
                end;
            {error, Reason} ->
                logger:warning("[PM] invalid command: ~p", [Reason])
        end
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

%% Internal
get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
