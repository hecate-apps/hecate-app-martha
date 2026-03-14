%%% @doc Retry strategy aggregate — manages retry lifecycle per session.
%%%
%%% Stream: retry-{session_id}
%%% Store: retry_strategy_store
%%%
%%% Lifecycle:
%%%   [fresh] -> initiate_retry -> INITIATED
%%%   INITIATED -> attempt_retry -> RETRYING (increments attempt_count)
%%%   RETRYING -> attempt_retry -> RETRYING (up to max_attempts)
%%%   RETRYING -> succeed_retry -> SUCCEEDED
%%%   RETRYING -> exhaust_retry -> EXHAUSTED (when max_attempts reached)
%%%   INITIATED -> exhaust_retry -> EXHAUSTED
-module(retry_strategy_aggregate).
-behaviour(evoq_aggregate).

-include("retry_status.hrl").
-include("retry_state.hrl").

-export([init/1, execute/2, apply/2]).
-export([state_module/0, flag_map/0]).

-spec state_module() -> module().
state_module() -> retry_state.

-spec flag_map() -> evoq_bit_flags:flag_map().
flag_map() -> ?RS_FLAG_MAP.

init(AggregateId) ->
    {ok, retry_state:new(AggregateId)}.

%% --- Execute ---

execute(#retry_state{status = 0}, Payload) ->
    case gf(command_type, Payload) of
        <<"initiate_retry">> ->
            maybe_initiate_retry:handle(Payload);
        _ ->
            {error, retry_not_initiated}
    end;

execute(#retry_state{status = S}, _Payload) when S band ?RS_EXHAUSTED =/= 0 ->
    {error, retry_exhausted};

execute(#retry_state{status = S}, _Payload) when S band ?RS_SUCCEEDED =/= 0 ->
    {error, retry_already_succeeded};

execute(#retry_state{status = S} = State, Payload) when S band ?RS_INITIATED =/= 0;
                                                          S band ?RS_RETRYING =/= 0 ->
    case gf(command_type, Payload) of
        <<"attempt_retry">> ->
            maybe_attempt_retry:handle(Payload, State);
        <<"exhaust_retry">> ->
            maybe_exhaust_retry:handle(Payload);
        <<"succeed_retry">> ->
            maybe_succeed_retry:handle(Payload);
        _ ->
            {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Apply ---

apply(State, Event) ->
    retry_state:apply_event(State, Event).

%% --- Internal ---

gf(Key, Map) -> hecate_plugin_api:get_field(Key, Map).
