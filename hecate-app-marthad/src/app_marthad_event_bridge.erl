%%% @doc Bridge between Martha event store and web SSE connections.
%%%
%%% Subscribes to ALL events in the martha_store ($all stream) and
%%% forwards each event to connected web clients via app_marthad_web_events.
%%% This avoids modifying 100+ individual pg emitters.
%%% @end
-module(app_marthad_event_bridge).
-behaviour(gen_server).

-include_lib("reckon_gater/include/esdb_gater_types.hrl").
-include_lib("evoq/include/evoq_types.hrl").

-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(STORE_ID, martha_store).
-define(SUB_NAME, <<"martha_web_event_bridge">>).

start_link() -> gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, stream, <<"$all">>, ?SUB_NAME,
        #{subscriber_pid => self()}),
    logger:info("[martha_event_bridge] Subscribed to $all stream on ~p", [?STORE_ID]),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun forward_event/1, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.
handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

forward_event(E) ->
    EventType = extract_event_type(E),
    Data = app_marthad_projection_event:to_map(E),
    app_marthad_web_events:broadcast(EventType, Data).

extract_event_type(#evoq_event{event_type = T}) when is_binary(T) -> T;
extract_event_type(#event{event_type = T}) when is_binary(T) -> T;
extract_event_type(#{event_type := T}) when is_binary(T) -> T;
extract_event_type(_) -> <<"unknown">>.
