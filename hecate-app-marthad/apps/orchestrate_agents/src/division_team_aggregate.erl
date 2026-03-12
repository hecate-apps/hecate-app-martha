%%% @doc Division team aggregate — manages team lifecycle for a division.
%%%
%%% Stream: division-team-{division_id}
%%% Store: orchestration_store
%%%
%%% Lifecycle:
%%%   [fresh] -> form_team -> FORMED
%%%   FORMED -> assign_agent_to_team -> FORMED (accumulates members)
%%%   FORMED -> activate_team -> ACTIVE
%%%   ACTIVE -> disband_team -> DISBANDED
%%%   any (except DISBANDED) -> disband_team -> DISBANDED
-module(division_team_aggregate).

-behaviour(evoq_aggregate).

-include("division_team_status.hrl").
-include("division_team_state.hrl").

-export([init/1, execute/2, apply/2]).
-export([initial_state/0, apply_event/2]).
-export([flag_map/0]).

-type state() :: #division_team_state{}.
-export_type([state/0]).

-spec flag_map() -> evoq_bit_flags:flag_map().
flag_map() -> ?DT_FLAG_MAP.

%% --- Callbacks ---

-spec init(binary()) -> {ok, state()}.
init(_AggregateId) ->
    {ok, initial_state()}.

-spec initial_state() -> state().
initial_state() ->
    #division_team_state{}.

%% --- Execute ---

-spec execute(state(), map()) -> {ok, [map()]} | {error, term()}.

%% Fresh — only form_team allowed
execute(#division_team_state{status = 0}, Payload) ->
    case get_command_type(Payload) of
        <<"form_team">> -> execute_form_team(Payload);
        _ -> {error, team_not_formed}
    end;

%% Disbanded — nothing allowed
execute(#division_team_state{status = S}, _Payload) when S band ?DT_DISBANDED =/= 0 ->
    {error, team_disbanded};

%% Active — accept assign or disband
execute(#division_team_state{status = S} = State, Payload) when S band ?DT_ACTIVE =/= 0 ->
    case get_command_type(Payload) of
        <<"assign_agent_to_team">> -> execute_assign(Payload, State);
        <<"disband_team">>         -> execute_disband(Payload, State);
        _ -> {error, unknown_command}
    end;

%% Formed (not active) — accept assign, activate, or disband
execute(#division_team_state{status = S} = State, Payload) when S band ?DT_FORMED =/= 0 ->
    case get_command_type(Payload) of
        <<"assign_agent_to_team">> -> execute_assign(Payload, State);
        <<"activate_team">>        -> execute_activate(Payload, State);
        <<"disband_team">>         -> execute_disband(Payload, State);
        _ -> {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Command handlers ---

execute_form_team(Payload) ->
    {ok, Cmd} = form_team_v1:from_map(Payload),
    convert_events(
        maybe_form_team:handle(Cmd),
        fun team_formed_v1:to_map/1).

execute_assign(Payload, State) ->
    {ok, Cmd} = assign_agent_to_team_v1:from_map(Payload),
    convert_events(
        maybe_assign_agent_to_team:handle(Cmd, State),
        fun agent_assigned_to_team_v1:to_map/1).

execute_activate(Payload, State) ->
    {ok, Cmd} = activate_team_v1:from_map(Payload),
    convert_events(
        maybe_activate_team:handle(Cmd, State),
        fun team_activated_v1:to_map/1).

execute_disband(Payload, _State) ->
    {ok, Cmd} = disband_team_v1:from_map(Payload),
    convert_events(
        maybe_disband_team:handle(Cmd),
        fun team_disbanded_v1:to_map/1).

%% --- Apply ---

-spec apply(state(), map()) -> state().
apply(State, Event) ->
    apply_event(Event, State).

-spec apply_event(map(), state()) -> state().

apply_event(#{<<"event_type">> := <<"team_formed_v1">>} = E, S)              -> apply_formed(E, S);
apply_event(#{event_type := <<"team_formed_v1">>} = E, S)                    -> apply_formed(E, S);
apply_event(#{<<"event_type">> := <<"agent_assigned_to_team_v1">>} = E, S)   -> apply_assigned(E, S);
apply_event(#{event_type := <<"agent_assigned_to_team_v1">>} = E, S)         -> apply_assigned(E, S);
apply_event(#{<<"event_type">> := <<"team_activated_v1">>} = E, S)           -> apply_activated(E, S);
apply_event(#{event_type := <<"team_activated_v1">>} = E, S)                 -> apply_activated(E, S);
apply_event(#{<<"event_type">> := <<"team_disbanded_v1">>} = E, S)           -> apply_disbanded(E, S);
apply_event(#{event_type := <<"team_disbanded_v1">>} = E, S)                 -> apply_disbanded(E, S);
apply_event(_E, S) -> S.

%% --- Apply helpers ---

apply_formed(E, _State) ->
    #division_team_state{
        division_id = get_value(division_id, E),
        venture_id = get_value(venture_id, E),
        status = evoq_bit_flags:set(0, ?DT_FORMED),
        planned_roles = get_value(planned_roles, E, []),
        formed_at = get_value(formed_at, E),
        formed_by = get_value(formed_by, E)
    }.

apply_assigned(E, #division_team_state{members = Members} = State) ->
    NewMember = #{
        agent_role => get_value(agent_role, E),
        session_id => get_value(session_id, E)
    },
    State#division_team_state{
        members = Members ++ [NewMember]
    }.

apply_activated(E, #division_team_state{status = Status} = State) ->
    State#division_team_state{
        status = evoq_bit_flags:set(Status, ?DT_ACTIVE),
        activated_at = get_value(activated_at, E)
    }.

apply_disbanded(E, #division_team_state{status = Status} = State) ->
    State#division_team_state{
        status = evoq_bit_flags:set(Status, ?DT_DISBANDED),
        disbanded_at = get_value(disbanded_at, E)
    }.

%% --- Internal ---

get_command_type(#{<<"command_type">> := T}) -> T;
get_command_type(#{command_type := T}) when is_binary(T) -> T;
get_command_type(#{command_type := T}) when is_atom(T) -> atom_to_binary(T);
get_command_type(_) -> undefined.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.

get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.

convert_events({ok, Events}, ToMapFn) ->
    {ok, [ToMapFn(E) || E <- Events]};
convert_events({error, _} = Err, _) ->
    Err.
