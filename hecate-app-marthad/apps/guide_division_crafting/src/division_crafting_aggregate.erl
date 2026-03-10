%%% @doc Division crafting aggregate.
%%%
%%% Stream: division-crafting-{division_id}
%%% Store: martha_store
%%%
%%% Lifecycle:
%%%   1. initiate_crafting (birth event, triggered by planning_concluded PM)
%%%   2. open_crafting / shelve_crafting / resume_crafting / conclude_crafting
%%%   3. generate_module / generate_test / run_test_suite / record_test_result
%%%   4. deliver_release / stage_delivery
%%%   5. archive_crafting (walking skeleton)
%%% @end
-module(division_crafting_aggregate).

-behaviour(evoq_aggregate).

-include("crafting_status.hrl").

-export([init/1, execute/2, apply/2]).
-export([initial_state/0, apply_event/2]).
-export([flag_map/0]).

-record(division_crafting_state, {
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
    generated_modules = #{} :: map(),
    generated_tests = #{} :: map(),
    test_suites = #{} :: map(),
    test_results = #{} :: map(),
    releases = #{} :: map(),
    delivery_stages = #{} :: map()
}).

-type state() :: #division_crafting_state{}.
-export_type([state/0]).

-spec flag_map() -> evoq_bit_flags:flag_map().
flag_map() -> ?CRAFTING_FLAG_MAP.

%% --- Callbacks ---

-spec init(binary()) -> {ok, state()}.
init(_AggregateId) ->
    {ok, initial_state()}.

-spec initial_state() -> state().
initial_state() ->
    #division_crafting_state{}.

%% --- Execute ---
%% NOTE: evoq calls execute(State, Payload) - State FIRST!

-spec execute(state(), map()) -> {ok, [map()]} | {error, term()}.

%% Fresh aggregate — only initiate allowed
execute(#division_crafting_state{status = 0}, Payload) ->
    case get_command_type(Payload) of
        <<"initiate_crafting">> -> execute_initiate_crafting(Payload);
        _ -> {error, crafting_not_initiated}
    end;

%% Archived — nothing allowed
execute(#division_crafting_state{status = S}, _Payload) when S band ?CRAFTING_ARCHIVED =/= 0 ->
    {error, crafting_archived};

%% Initiated and not archived — route by command type
execute(#division_crafting_state{status = S} = State, Payload) when S band ?CRAFTING_INITIATED =/= 0 ->
    case get_command_type(Payload) of
        %% Lifecycle commands (always available when initiated)
        <<"archive_crafting">>  -> execute_archive_crafting(Payload);
        <<"open_crafting">>     -> execute_open_crafting(Payload, State);
        <<"shelve_crafting">>   -> execute_shelve_crafting(Payload, State);
        <<"resume_crafting">>   -> execute_resume_crafting(Payload, State);
        <<"conclude_crafting">> -> execute_conclude_crafting(Payload, State);
        %% Domain commands (require CRAFTING_OPEN)
        <<"generate_module">>     -> require_open(S, fun() -> execute_generate_module(Payload) end);
        <<"generate_test">>       -> require_open(S, fun() -> execute_generate_test(Payload) end);
        <<"run_test_suite">>      -> require_open(S, fun() -> execute_run_test_suite(Payload) end);
        <<"record_test_result">>  -> require_open(S, fun() -> execute_record_test_result(Payload) end);
        <<"deliver_release">>     -> require_open(S, fun() -> execute_deliver_release(Payload) end);
        <<"stage_delivery">>      -> require_open(S, fun() -> execute_stage_delivery(Payload) end);
        _ -> {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Command handlers ---

execute_initiate_crafting(Payload) ->
    {ok, Cmd} = initiate_crafting_v1:from_map(Payload),
    convert_events(maybe_initiate_crafting:handle(Cmd), fun crafting_initiated_v1:to_map/1).

execute_archive_crafting(Payload) ->
    {ok, Cmd} = archive_crafting_v1:from_map(Payload),
    convert_events(maybe_archive_crafting:handle(Cmd), fun crafting_archived_v1:to_map/1).

execute_open_crafting(Payload, #division_crafting_state{status = S}) ->
    case S band ?CRAFTING_OPEN of
        0 ->
            {ok, Cmd} = open_crafting_v1:from_map(Payload),
            convert_events(maybe_open_crafting:handle(Cmd), fun crafting_opened_v1:to_map/1);
        _ ->
            {error, crafting_already_open}
    end.

execute_shelve_crafting(Payload, #division_crafting_state{status = S}) ->
    case S band ?CRAFTING_OPEN of
        0 -> {error, crafting_not_open};
        _ ->
            {ok, Cmd} = shelve_crafting_v1:from_map(Payload),
            convert_events(maybe_shelve_crafting:handle(Cmd), fun crafting_shelved_v1:to_map/1)
    end.

execute_resume_crafting(Payload, #division_crafting_state{status = S}) ->
    case S band ?CRAFTING_SHELVED of
        0 -> {error, crafting_not_shelved};
        _ ->
            {ok, Cmd} = resume_crafting_v1:from_map(Payload),
            convert_events(maybe_resume_crafting:handle(Cmd), fun crafting_resumed_v1:to_map/1)
    end.

execute_conclude_crafting(Payload, #division_crafting_state{status = S}) ->
    case S band ?CRAFTING_OPEN of
        0 -> {error, crafting_not_open};
        _ ->
            {ok, Cmd} = conclude_crafting_v1:from_map(Payload),
            convert_events(maybe_conclude_crafting:handle(Cmd), fun crafting_concluded_v1:to_map/1)
    end.

execute_generate_module(Payload) ->
    {ok, Cmd} = generate_module_v1:from_map(Payload),
    convert_events(maybe_generate_module:handle(Cmd), fun module_generated_v1:to_map/1).

execute_generate_test(Payload) ->
    {ok, Cmd} = generate_test_v1:from_map(Payload),
    convert_events(maybe_generate_test:handle(Cmd), fun test_generated_v1:to_map/1).

execute_run_test_suite(Payload) ->
    {ok, Cmd} = run_test_suite_v1:from_map(Payload),
    convert_events(maybe_run_test_suite:handle(Cmd), fun test_suite_run_v1:to_map/1).

execute_record_test_result(Payload) ->
    {ok, Cmd} = record_test_result_v1:from_map(Payload),
    convert_events(maybe_record_test_result:handle(Cmd), fun test_result_recorded_v1:to_map/1).

execute_deliver_release(Payload) ->
    {ok, Cmd} = deliver_release_v1:from_map(Payload),
    convert_events(maybe_deliver_release:handle(Cmd), fun release_delivered_v1:to_map/1).

execute_stage_delivery(Payload) ->
    {ok, Cmd} = stage_delivery_v1:from_map(Payload),
    convert_events(maybe_stage_delivery:handle(Cmd), fun delivery_staged_v1:to_map/1).

require_open(S, Fun) ->
    case S band ?CRAFTING_OPEN of
        0 -> {error, crafting_not_open};
        _ -> Fun()
    end.

%% --- Apply ---
%% NOTE: evoq calls apply(State, Event) - State FIRST!

-spec apply(state(), map()) -> state().
apply(State, Event) ->
    apply_event(Event, State).

-spec apply_event(map(), state()) -> state().

%% Lifecycle events
apply_event(#{<<"event_type">> := <<"crafting_initiated_v1">>} = E, S) -> apply_initiated(E, S);
apply_event(#{event_type := <<"crafting_initiated_v1">>} = E, S)      -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"crafting_archived_v1">>} = _E, S) -> apply_archived(S);
apply_event(#{event_type := <<"crafting_archived_v1">>} = _E, S)       -> apply_archived(S);
apply_event(#{<<"event_type">> := <<"crafting_opened_v1">>} = E, S)   -> apply_opened(E, S);
apply_event(#{event_type := <<"crafting_opened_v1">>} = E, S)         -> apply_opened(E, S);
apply_event(#{<<"event_type">> := <<"crafting_shelved_v1">>} = E, S)  -> apply_shelved(E, S);
apply_event(#{event_type := <<"crafting_shelved_v1">>} = E, S)        -> apply_shelved(E, S);
apply_event(#{<<"event_type">> := <<"crafting_resumed_v1">>} = _E, S) -> apply_resumed(S);
apply_event(#{event_type := <<"crafting_resumed_v1">>} = _E, S)       -> apply_resumed(S);
apply_event(#{<<"event_type">> := <<"crafting_concluded_v1">>} = E, S) -> apply_concluded(E, S);
apply_event(#{event_type := <<"crafting_concluded_v1">>} = E, S)       -> apply_concluded(E, S);

%% Domain events
apply_event(#{<<"event_type">> := <<"module_generated_v1">>} = E, S)      -> apply_module_generated(E, S);
apply_event(#{event_type := <<"module_generated_v1">>} = E, S)            -> apply_module_generated(E, S);
apply_event(#{<<"event_type">> := <<"test_generated_v1">>} = E, S)        -> apply_test_generated(E, S);
apply_event(#{event_type := <<"test_generated_v1">>} = E, S)              -> apply_test_generated(E, S);
apply_event(#{<<"event_type">> := <<"test_suite_run_v1">>} = E, S)        -> apply_test_suite_run(E, S);
apply_event(#{event_type := <<"test_suite_run_v1">>} = E, S)              -> apply_test_suite_run(E, S);
apply_event(#{<<"event_type">> := <<"test_result_recorded_v1">>} = E, S)  -> apply_test_result_recorded(E, S);
apply_event(#{event_type := <<"test_result_recorded_v1">>} = E, S)        -> apply_test_result_recorded(E, S);
apply_event(#{<<"event_type">> := <<"release_delivered_v1">>} = E, S)     -> apply_release_delivered(E, S);
apply_event(#{event_type := <<"release_delivered_v1">>} = E, S)           -> apply_release_delivered(E, S);
apply_event(#{<<"event_type">> := <<"delivery_staged_v1">>} = E, S)       -> apply_delivery_staged(E, S);
apply_event(#{event_type := <<"delivery_staged_v1">>} = E, S)             -> apply_delivery_staged(E, S);

%% Unknown — ignore
apply_event(_E, S) -> S.

%% --- Apply helpers ---

apply_initiated(E, State) ->
    State#division_crafting_state{
        division_id = get_value(division_id, E),
        venture_id = get_value(venture_id, E),
        context_name = get_value(context_name, E),
        status = evoq_bit_flags:set(0, ?CRAFTING_INITIATED),
        initiated_at = get_value(initiated_at, E),
        initiated_by = get_value(initiated_by, E)
    }.

apply_archived(#division_crafting_state{status = Status} = State) ->
    State#division_crafting_state{status = evoq_bit_flags:set(Status, ?CRAFTING_ARCHIVED)}.

apply_opened(E, #division_crafting_state{status = Status} = State) ->
    State#division_crafting_state{
        status = evoq_bit_flags:set(Status, ?CRAFTING_OPEN),
        opened_at = get_value(opened_at, E)
    }.

apply_shelved(E, #division_crafting_state{status = Status} = State) ->
    S0 = evoq_bit_flags:unset(Status, ?CRAFTING_OPEN),
    S1 = evoq_bit_flags:set(S0, ?CRAFTING_SHELVED),
    State#division_crafting_state{
        status = S1,
        shelved_at = get_value(shelved_at, E),
        shelve_reason = get_value(reason, E, undefined)
    }.

apply_resumed(#division_crafting_state{status = Status} = State) ->
    S0 = evoq_bit_flags:unset(Status, ?CRAFTING_SHELVED),
    S1 = evoq_bit_flags:set(S0, ?CRAFTING_OPEN),
    State#division_crafting_state{
        status = S1,
        shelved_at = undefined,
        shelve_reason = undefined
    }.

apply_concluded(E, #division_crafting_state{status = Status} = State) ->
    S0 = evoq_bit_flags:unset(Status, ?CRAFTING_OPEN),
    S1 = evoq_bit_flags:set(S0, ?CRAFTING_CONCLUDED),
    State#division_crafting_state{
        status = S1,
        concluded_at = get_value(concluded_at, E)
    }.

apply_module_generated(E, #division_crafting_state{generated_modules = Modules} = State) ->
    ModuleName = get_value(module_name, E),
    Entry = #{
        module_type => get_value(module_type, E),
        path => get_value(path, E),
        generated_at => get_value(generated_at, E)
    },
    State#division_crafting_state{generated_modules = Modules#{ModuleName => Entry}}.

apply_test_generated(E, #division_crafting_state{generated_tests = Tests} = State) ->
    TestName = get_value(test_name, E),
    Entry = #{
        module_name => get_value(module_name, E),
        path => get_value(path, E),
        generated_at => get_value(generated_at, E)
    },
    State#division_crafting_state{generated_tests = Tests#{TestName => Entry}}.

apply_test_suite_run(E, #division_crafting_state{test_suites = Suites} = State) ->
    SuiteId = get_value(suite_id, E),
    Entry = #{
        suite_name => get_value(suite_name, E),
        run_at => get_value(run_at, E)
    },
    State#division_crafting_state{test_suites = Suites#{SuiteId => Entry}}.

apply_test_result_recorded(E, #division_crafting_state{test_results = Results} = State) ->
    ResultId = get_value(result_id, E),
    Entry = #{
        suite_id => get_value(suite_id, E),
        passed => get_value(passed, E),
        failed => get_value(failed, E),
        recorded_at => get_value(recorded_at, E)
    },
    State#division_crafting_state{test_results = Results#{ResultId => Entry}}.

apply_release_delivered(E, #division_crafting_state{releases = Releases} = State) ->
    ReleaseId = get_value(release_id, E),
    Entry = #{
        version => get_value(version, E),
        delivered_at => get_value(delivered_at, E)
    },
    State#division_crafting_state{releases = Releases#{ReleaseId => Entry}}.

apply_delivery_staged(E, #division_crafting_state{delivery_stages = Stages} = State) ->
    StageId = get_value(stage_id, E),
    Entry = #{
        release_id => get_value(release_id, E),
        stage_name => get_value(stage_name, E),
        staged_at => get_value(staged_at, E)
    },
    State#division_crafting_state{delivery_stages = Stages#{StageId => Entry}}.

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
