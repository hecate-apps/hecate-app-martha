%%% @doc Emitter: publishes vision_gate_rejected_v1 events to pg group.
-module(vision_gate_rejected_v1_to_pg).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"vision_gate_rejected_v1">>).
-define(PG_GROUP, vision_gate_rejected_v1).
-define(SUB_NAME, <<"vision_gate_rejected_v1_to_pg">>).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    pg:join(?PG_GROUP, self()),
    {ok, _} = reckon_evoq_adapter:subscribe(
        orchestration_store, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        Map = app_marthad_projection_event:to_map(E),
        [Pid ! {?PG_GROUP, Map} || Pid <- pg:get_members(?PG_GROUP), Pid =/= self()]
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
