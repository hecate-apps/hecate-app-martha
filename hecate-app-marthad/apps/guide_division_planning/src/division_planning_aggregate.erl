%%% @doc Division planning aggregate — lifecycle for division planning dossier.
%%%
%%% Stream: division-planning-{division_id}
%%% Store: martha_store
%%%
%%% Lifecycle:
%%%   1. initiate_planning (birth event, triggered by PM on division_identified)
%%%   2. open_planning (enables design/plan desks)
%%%   3. design_aggregate / design_event / plan_desk / plan_dependency (requires OPEN)
%%%   4. shelve_planning / resume_planning (pause/resume cycle)
%%%   5. conclude_planning (mark as done)
%%%   6. archive_planning (walking skeleton)
%%% @end
-module(division_planning_aggregate).

-behaviour(evoq_aggregate).

-include("planning_status.hrl").

-export([init/1, execute/2, apply/2]).
-export([initial_state/0, apply_event/2]).
-export([flag_map/0]).

-record(division_planning_state, {
    division_id    :: binary() | undefined,
    venture_id     :: binary() | undefined,
    context_name   :: binary() | undefined,
    status = 0     :: non_neg_integer(),
    initiated_at   :: non_neg_integer() | undefined,
    initiated_by   :: binary() | undefined,
    opened_at      :: non_neg_integer() | undefined,
    shelved_at     :: non_neg_integer() | undefined,
    concluded_at   :: non_neg_integer() | undefined,
    shelve_reason  :: binary() | undefined,
    designed_aggregates = #{} :: map(),
    designed_events = #{} :: map(),
    planned_desks = #{} :: map(),
    planned_dependencies = #{} :: map()
}).

-type state() :: #division_planning_state{}.
-export_type([state/0]).

-spec flag_map() -> evoq_bit_flags:flag_map().
flag_map() -> ?PLANNING_FLAG_MAP.

%% --- Callbacks ---

-spec init(binary()) -> {ok, state()}.
init(_AggregateId) ->
    {ok, initial_state()}.

-spec initial_state() -> state().
initial_state() ->
    #division_planning_state{}.

%% --- Execute ---
%% NOTE: evoq calls execute(State, Payload) - State FIRST!

-spec execute(state(), map()) -> {ok, [map()]} | {error, term()}.

%% Fresh aggregate — only initiate allowed
execute(#division_planning_state{status = 0}, Payload) ->
    case get_command_type(Payload) of
        <<"initiate_planning">> -> execute_initiate_planning(Payload);
        _ -> {error, planning_not_initiated}
    end;

%% Archived — nothing allowed
execute(#division_planning_state{status = S}, _Payload) when S band ?PLANNING_ARCHIVED =/= 0 ->
    {error, planning_archived};

%% Initiated and not archived — route by command type
execute(#division_planning_state{status = S} = State, Payload) when S band ?PLANNING_INITIATED =/= 0 ->
    case get_command_type(Payload) of
        <<"archive_planning">>  -> execute_archive_planning(Payload);
        <<"open_planning">>     -> execute_open_planning(Payload, State);
        <<"shelve_planning">>   -> execute_shelve_planning(Payload, State);
        <<"resume_planning">>   -> execute_resume_planning(Payload, State);
        <<"conclude_planning">> -> execute_conclude_planning(Payload, State);
        <<"design_aggregate">>  -> execute_design_aggregate(Payload, State);
        <<"design_event">>      -> execute_design_event(Payload, State);
        <<"plan_desk">>         -> execute_plan_desk(Payload, State);
        <<"plan_dependency">>   -> execute_plan_dependency(Payload, State);
        _ -> {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Command handlers ---

execute_initiate_planning(Payload) ->
    {ok, Cmd} = initiate_planning_v1:from_map(Payload),
    convert_events(maybe_initiate_planning:handle(Cmd), fun planning_initiated_v1:to_map/1).

execute_archive_planning(Payload) ->
    {ok, Cmd} = archive_planning_v1:from_map(Payload),
    convert_events(maybe_archive_planning:handle(Cmd), fun planning_archived_v1:to_map/1).

execute_open_planning(Payload, #division_planning_state{status = S}) ->
    case {S band ?PLANNING_OPEN, S band ?PLANNING_CONCLUDED} of
        {0, 0} ->
            {ok, Cmd} = open_planning_v1:from_map(Payload),
            convert_events(maybe_open_planning:handle(Cmd), fun planning_opened_v1:to_map/1);
        {_, V} when V =/= 0 ->
            {error, planning_already_concluded};
        _ ->
            {error, planning_already_open}
    end.

execute_shelve_planning(Payload, #division_planning_state{status = S}) ->
    case S band ?PLANNING_OPEN of
        0 -> {error, planning_not_open};
        _ ->
            {ok, Cmd} = shelve_planning_v1:from_map(Payload),
            convert_events(maybe_shelve_planning:handle(Cmd), fun planning_shelved_v1:to_map/1)
    end.

execute_resume_planning(Payload, #division_planning_state{status = S}) ->
    case S band ?PLANNING_SHELVED of
        0 -> {error, planning_not_shelved};
        _ ->
            {ok, Cmd} = resume_planning_v1:from_map(Payload),
            convert_events(maybe_resume_planning:handle(Cmd), fun planning_resumed_v1:to_map/1)
    end.

execute_conclude_planning(Payload, #division_planning_state{status = S}) ->
    case S band ?PLANNING_OPEN of
        0 -> {error, planning_not_open};
        _ ->
            {ok, Cmd} = conclude_planning_v1:from_map(Payload),
            convert_events(maybe_conclude_planning:handle(Cmd), fun planning_concluded_v1:to_map/1)
    end.

execute_design_aggregate(Payload, #division_planning_state{status = S, designed_aggregates = Aggs}) ->
    require_open(S, fun() ->
        {ok, Cmd} = design_aggregate_v1:from_map(Payload),
        Context = #{designed_aggregates => Aggs},
        convert_events(maybe_design_aggregate:handle(Cmd, Context), fun aggregate_designed_v1:to_map/1)
    end).

execute_design_event(Payload, #division_planning_state{status = S, designed_events = Evts}) ->
    require_open(S, fun() ->
        {ok, Cmd} = design_event_v1:from_map(Payload),
        Context = #{designed_events => Evts},
        convert_events(maybe_design_event:handle(Cmd, Context), fun event_designed_v1:to_map/1)
    end).

execute_plan_desk(Payload, #division_planning_state{status = S, planned_desks = Desks}) ->
    require_open(S, fun() ->
        {ok, Cmd} = plan_desk_v1:from_map(Payload),
        Context = #{planned_desks => Desks},
        convert_events(maybe_plan_desk:handle(Cmd, Context), fun desk_planned_v1:to_map/1)
    end).

execute_plan_dependency(Payload, #division_planning_state{status = S, planned_dependencies = Deps}) ->
    require_open(S, fun() ->
        {ok, Cmd} = plan_dependency_v1:from_map(Payload),
        Context = #{planned_dependencies => Deps},
        convert_events(maybe_plan_dependency:handle(Cmd, Context), fun dependency_planned_v1:to_map/1)
    end).

require_open(S, Fun) ->
    case S band ?PLANNING_OPEN of
        0 -> {error, planning_not_open};
        _ -> Fun()
    end.

%% --- Apply ---
%% NOTE: evoq calls apply(State, Event) - State FIRST!

-spec apply(state(), map()) -> state().
apply(State, Event) ->
    apply_event(Event, State).

-spec apply_event(map(), state()) -> state().

%% Planning lifecycle events
apply_event(#{<<"event_type">> := <<"planning_initiated_v1">>} = E, S) -> apply_initiated(E, S);
apply_event(#{event_type := <<"planning_initiated_v1">>} = E, S)      -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"planning_archived_v1">>} = _E, S) -> apply_archived(S);
apply_event(#{event_type := <<"planning_archived_v1">>} = _E, S)       -> apply_archived(S);
apply_event(#{<<"event_type">> := <<"planning_opened_v1">>} = E, S)   -> apply_opened(E, S);
apply_event(#{event_type := <<"planning_opened_v1">>} = E, S)         -> apply_opened(E, S);
apply_event(#{<<"event_type">> := <<"planning_shelved_v1">>} = E, S)  -> apply_shelved(E, S);
apply_event(#{event_type := <<"planning_shelved_v1">>} = E, S)        -> apply_shelved(E, S);
apply_event(#{<<"event_type">> := <<"planning_resumed_v1">>} = _E, S) -> apply_resumed(S);
apply_event(#{event_type := <<"planning_resumed_v1">>} = _E, S)       -> apply_resumed(S);
apply_event(#{<<"event_type">> := <<"planning_concluded_v1">>} = E, S) -> apply_concluded(E, S);
apply_event(#{event_type := <<"planning_concluded_v1">>} = E, S)       -> apply_concluded(E, S);

%% Design + plan events
apply_event(#{<<"event_type">> := <<"aggregate_designed_v1">>} = E, S) -> apply_aggregate_designed(E, S);
apply_event(#{event_type := <<"aggregate_designed_v1">>} = E, S)       -> apply_aggregate_designed(E, S);
apply_event(#{<<"event_type">> := <<"event_designed_v1">>} = E, S)     -> apply_event_designed(E, S);
apply_event(#{event_type := <<"event_designed_v1">>} = E, S)           -> apply_event_designed(E, S);
apply_event(#{<<"event_type">> := <<"desk_planned_v1">>} = E, S)      -> apply_desk_planned(E, S);
apply_event(#{event_type := <<"desk_planned_v1">>} = E, S)            -> apply_desk_planned(E, S);
apply_event(#{<<"event_type">> := <<"dependency_planned_v1">>} = E, S) -> apply_dependency_planned(E, S);
apply_event(#{event_type := <<"dependency_planned_v1">>} = E, S)       -> apply_dependency_planned(E, S);

%% Unknown — ignore
apply_event(_E, S) -> S.

%% --- Apply helpers ---

apply_initiated(E, State) ->
    State#division_planning_state{
        division_id = get_value(division_id, E),
        venture_id = get_value(venture_id, E),
        context_name = get_value(context_name, E),
        status = evoq_bit_flags:set(0, ?PLANNING_INITIATED),
        initiated_at = get_value(initiated_at, E),
        initiated_by = get_value(initiated_by, E)
    }.

apply_archived(#division_planning_state{status = Status} = State) ->
    State#division_planning_state{status = evoq_bit_flags:set(Status, ?PLANNING_ARCHIVED)}.

apply_opened(E, #division_planning_state{status = Status} = State) ->
    State#division_planning_state{
        status = evoq_bit_flags:set(Status, ?PLANNING_OPEN),
        opened_at = get_value(opened_at, E)
    }.

apply_shelved(E, #division_planning_state{status = Status} = State) ->
    S0 = evoq_bit_flags:unset(Status, ?PLANNING_OPEN),
    S1 = evoq_bit_flags:set(S0, ?PLANNING_SHELVED),
    State#division_planning_state{
        status = S1,
        shelved_at = get_value(shelved_at, E),
        shelve_reason = get_value(reason, E)
    }.

apply_resumed(#division_planning_state{status = Status} = State) ->
    S0 = evoq_bit_flags:unset(Status, ?PLANNING_SHELVED),
    S1 = evoq_bit_flags:set(S0, ?PLANNING_OPEN),
    State#division_planning_state{
        status = S1,
        shelved_at = undefined,
        shelve_reason = undefined
    }.

apply_concluded(E, #division_planning_state{status = Status} = State) ->
    S0 = evoq_bit_flags:unset(Status, ?PLANNING_OPEN),
    S1 = evoq_bit_flags:set(S0, ?PLANNING_CONCLUDED),
    State#division_planning_state{
        status = S1,
        concluded_at = get_value(concluded_at, E)
    }.

apply_aggregate_designed(E, #division_planning_state{designed_aggregates = Aggs} = State) ->
    AggName = get_value(aggregate_name, E),
    AggData = #{
        description => get_value(description, E),
        stream_prefix => get_value(stream_prefix, E),
        fields => get_value(fields, E, []),
        designed_at => get_value(designed_at, E)
    },
    State#division_planning_state{designed_aggregates = Aggs#{AggName => AggData}}.

apply_event_designed(E, #division_planning_state{designed_events = Evts} = State) ->
    EvtName = get_value(event_name, E),
    EvtData = #{
        description => get_value(description, E),
        aggregate_name => get_value(aggregate_name, E),
        fields => get_value(fields, E, []),
        designed_at => get_value(designed_at, E)
    },
    State#division_planning_state{designed_events = Evts#{EvtName => EvtData}}.

apply_desk_planned(E, #division_planning_state{planned_desks = Desks} = State) ->
    DeskName = get_value(desk_name, E),
    DeskData = #{
        department => get_value(department, E),
        description => get_value(description, E),
        commands => get_value(commands, E, []),
        planned_at => get_value(planned_at, E)
    },
    State#division_planning_state{planned_desks = Desks#{DeskName => DeskData}}.

apply_dependency_planned(E, #division_planning_state{planned_dependencies = Deps} = State) ->
    DepId = get_value(dependency_id, E),
    DepData = #{
        from_desk => get_value(from_desk, E),
        to_desk => get_value(to_desk, E),
        dep_type => get_value(dep_type, E),
        planned_at => get_value(planned_at, E)
    },
    State#division_planning_state{planned_dependencies = Deps#{DepId => DepData}}.

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
