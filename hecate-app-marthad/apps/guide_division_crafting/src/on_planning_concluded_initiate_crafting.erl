%%% @doc Process manager: on planning_concluded_v1, initiate crafting.
%%%
%%% Subscribes to martha_store for planning_concluded_v1 events.
%%% Extracts division_id, venture_id, context_name and dispatches
%%% initiate_crafting_v1 command to the crafting aggregate.
%%% @end
-module(on_planning_concluded_initiate_crafting).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"planning_concluded_v1">>).
-define(SUB_NAME, <<"on_planning_concluded_initiate_crafting">>).
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
        case initiate_crafting_v1:new(#{
            division_id => DivisionId,
            venture_id => VentureId,
            context_name => ContextName,
            initiated_by => <<"system">>
        }) of
            {ok, Cmd} ->
                case maybe_initiate_crafting:dispatch(Cmd) of
                    {ok, _, _} -> ok;
                    {error, Reason} ->
                        logger:warning("[PM] initiate_crafting failed: ~p", [Reason])
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

%% Internal helper to get value with atom or binary key
get_value(Key, Map) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error ->
            case maps:find(BinKey, Map) of
                {ok, V} -> V;
                error -> undefined
            end
    end.
