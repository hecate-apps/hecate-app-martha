%%% @doc Retry state module — implements evoq_state behaviour.
%%%
%%% Owns the retry_state record, initial state creation, event folding,
%%% and serialization. Extracted from retry_strategy_aggregate.
-module(retry_state).

-behaviour(evoq_state).

-include("retry_status.hrl").
-include("retry_state.hrl").

-export([new/1, apply_event/2, to_map/1]).

-type state() :: #retry_state{}.
-export_type([state/0]).

%% --- evoq_state callbacks ---

-spec new(binary()) -> state().
new(_AggregateId) ->
    #retry_state{}.

-spec apply_event(state(), map()) -> state().

%% Normalize atom event_type to binary (from typed evoq_event modules)
apply_event(S, #{event_type := Type} = E) when is_atom(Type) ->
    apply_event(S, E#{event_type := atom_to_binary(Type, utf8)});

apply_event(S, #{event_type := <<"retry_initiated_v1">>} = E)  -> apply_initiated(E, S);
apply_event(S, #{event_type := <<"retry_attempted_v1">>} = E)  -> apply_attempted(E, S);
apply_event(S, #{event_type := <<"retry_exhausted_v1">>} = E)  -> apply_exhausted(E, S);
apply_event(S, #{event_type := <<"retry_succeeded_v1">>} = E)  -> apply_succeeded(E, S);
%% Unknown — ignore
apply_event(S, _E) -> S.

%% --- to_map ---

-spec to_map(state()) -> map().
to_map(#retry_state{} = S) ->
    #{
        session_id     => S#retry_state.session_id,
        venture_id     => S#retry_state.venture_id,
        agent_role     => S#retry_state.agent_role,
        status         => S#retry_state.status,
        attempt_count  => S#retry_state.attempt_count,
        max_attempts   => S#retry_state.max_attempts,
        adjustments    => S#retry_state.adjustments,
        last_failure   => S#retry_state.last_failure,
        initiated_at   => S#retry_state.initiated_at,
        last_attempt_at => S#retry_state.last_attempt_at
    }.

%% --- Apply helpers ---

apply_initiated(E, State) ->
    State#retry_state{
        session_id = gf(session_id, E),
        venture_id = gf(venture_id, E),
        agent_role = gf(agent_role, E),
        status = evoq_bit_flags:set(0, ?RS_INITIATED),
        max_attempts = gf(max_attempts, E, 3),
        last_failure = gf(failure_reason, E),
        initiated_at = gf(initiated_at, E, 0)
    }.

apply_attempted(E, #retry_state{status = Status, adjustments = Adj} = State) ->
    Adjustment = gf(adjustment, E, #{}),
    State#retry_state{
        status = evoq_bit_flags:set(Status, ?RS_RETRYING),
        attempt_count = gf(attempt_number, E, State#retry_state.attempt_count + 1),
        adjustments = Adj ++ [Adjustment],
        last_attempt_at = gf(attempted_at, E, 0)
    }.

apply_exhausted(_E, #retry_state{status = Status} = State) ->
    State#retry_state{
        status = evoq_bit_flags:set(Status, ?RS_EXHAUSTED)
    }.

apply_succeeded(_E, #retry_state{status = Status} = State) ->
    State#retry_state{
        status = evoq_bit_flags:set(Status, ?RS_SUCCEEDED)
    }.

%% --- Internal ---

gf(Key, Map) -> hecate_plugin_api:get_field(Key, Map).
gf(Key, Map, Default) ->
    case hecate_plugin_api:get_field(Key, Map) of
        undefined -> Default;
        V -> V
    end.
