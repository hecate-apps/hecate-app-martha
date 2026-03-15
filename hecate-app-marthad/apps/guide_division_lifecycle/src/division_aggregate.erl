%%% @doc Unified division aggregate — one stream per division, all phases.
%%%
%%% Stream: division-{division_id}
%%% Store: martha_store
%%%
%%% Consolidates storming, planning, kanban, and crafting into one aggregate.
%%% Birth event: division_initiated_v1 (sets all 4 phases to initial state)
%%% Exit event: division_archived_v1 (sets DIV_ARCHIVED flag)
%%% @end
-module(division_aggregate).

-behaviour(evoq_aggregate).

-include("division_lifecycle_status.hrl").
-include("division_state.hrl").
-include("kanban_card_status.hrl").

-export([init/1, execute/2, apply/2, state_module/0]).
-export([division_flag_map/0, storming_flag_map/0, planning_flag_map/0,
         board_flag_map/0, crafting_flag_map/0, card_flag_map/0]).

-type state() :: #division_state{}.
-export_type([state/0]).

division_flag_map() -> ?DIV_FLAG_MAP.
storming_flag_map() -> ?STORMING_FLAG_MAP.
planning_flag_map() -> ?PLANNING_FLAG_MAP.
board_flag_map() -> ?BOARD_FLAG_MAP.
crafting_flag_map() -> ?CRAFTING_FLAG_MAP.
card_flag_map() -> ?CARD_FLAG_MAP.

%% --- Callbacks ---

-spec state_module() -> module().
state_module() -> division_state.

-spec init(binary()) -> {ok, state()}.
init(AggregateId) ->
    {ok, division_state:new(AggregateId)}.

%% --- Execute ---
%% NOTE: evoq calls execute(State, Payload) - State FIRST!

-spec execute(state(), map()) -> {ok, [map()]} | {error, term()}.

%% Fresh aggregate — only initiate allowed
execute(#division_state{status = 0}, Payload) ->
    case get_command_type(Payload) of
        <<"initiate_division_v1">> -> execute_initiate_division(Payload);
        _ -> {error, division_not_initiated}
    end;

%% Archived — nothing allowed
execute(#division_state{status = S}, _Payload) when S band ?DIV_ARCHIVED =/= 0 ->
    {error, division_archived};

%% Initiated and not archived — route by command type
execute(#division_state{status = S} = State, Payload) when S band ?DIV_INITIATED =/= 0 ->
    case get_command_type(Payload) of
        %% Division-level lifecycle
        <<"archive_division_v1">>  -> execute_archive_division(Payload);

        %% === STORMING COMMANDS ===
        <<"design_aggregate_v1">>  -> require_storming_active(State, fun() -> execute_design_aggregate(Payload, State) end);
        <<"design_event_v1">>      -> require_storming_active(State, fun() -> execute_design_event(Payload, State) end);
        <<"plan_desk_v1">>         -> require_storming_active(State, fun() -> execute_plan_desk(Payload, State) end);
        <<"plan_dependency_v1">>   -> require_storming_active(State, fun() -> execute_plan_dependency(Payload, State) end);

        %% === PLANNING COMMANDS ===
        <<"open_planning_v1">>     -> execute_open_planning(Payload, State);
        <<"shelve_planning_v1">>   -> execute_shelve_planning(Payload, State);
        <<"resume_planning_v1">>   -> execute_resume_planning(Payload, State);
        <<"submit_planning_v1">>   -> execute_submit_planning(Payload, State);

        %% === KANBAN COMMANDS ===
        <<"post_kanban_card_v1">>      -> require_kanban_active(State, fun() -> execute_post_card(Payload, State) end);
        <<"pick_kanban_card_v1">>      -> require_kanban_active(State, fun() -> execute_pick_card(Payload, State) end);
        <<"finish_kanban_card_v1">>    -> require_kanban_active(State, fun() -> execute_finish_card(Payload, State) end);
        <<"unpick_kanban_card_v1">>    -> require_kanban_active(State, fun() -> execute_unpick_card(Payload, State) end);
        <<"park_kanban_card_v1">>      -> require_kanban_active(State, fun() -> execute_park_card(Payload, State) end);
        <<"unpark_kanban_card_v1">>    -> require_kanban_active(State, fun() -> execute_unpark_card(Payload, State) end);
        <<"block_kanban_card_v1">>     -> require_kanban_active(State, fun() -> execute_block_card(Payload, State) end);
        <<"unblock_kanban_card_v1">>   -> require_kanban_active(State, fun() -> execute_unblock_card(Payload, State) end);

        %% === CRAFTING COMMANDS ===
        <<"open_crafting_v1">>     -> execute_open_crafting(Payload, State);
        <<"shelve_crafting_v1">>   -> execute_shelve_crafting(Payload, State);
        <<"resume_crafting_v1">>   -> execute_resume_crafting(Payload, State);
        <<"generate_module_v1">>     -> require_crafting_open(State, fun() -> execute_generate_module(Payload) end);
        <<"generate_test_v1">>       -> require_crafting_open(State, fun() -> execute_generate_test(Payload) end);
        <<"run_test_suite_v1">>      -> require_crafting_open(State, fun() -> execute_run_test_suite(Payload) end);
        <<"record_test_result_v1">>  -> require_crafting_open(State, fun() -> execute_record_test_result(Payload) end);
        <<"deliver_release_v1">>     -> require_crafting_open(State, fun() -> execute_deliver_release(Payload) end);
        <<"stage_delivery_v1">>      -> require_crafting_open(State, fun() -> execute_stage_delivery(Payload) end);

        _ -> {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Apply ---
%% NOTE: evoq calls apply(State, Event) - State FIRST!

-spec apply(state(), map()) -> state().
apply(State, Event) ->
    division_state:apply_event(State, Event).

%% --- Division lifecycle commands ---

execute_initiate_division(Payload) ->
    {ok, Cmd} = initiate_division_v1:from_map(Payload),
    convert_events(maybe_initiate_division:handle(Cmd), fun division_initiated_v1:to_map/1).

execute_archive_division(Payload) ->
    {ok, Cmd} = archive_division_v1:from_map(Payload),
    convert_events(maybe_archive_division:handle(Cmd), fun division_archived_v1:to_map/1).

%% --- Storming commands ---

execute_design_aggregate(Payload, #division_state{designed_aggregates = Aggs}) ->
    {ok, Cmd} = design_aggregate_v1:from_map(Payload),
    Context = #{designed_aggregates => Aggs},
    convert_events(maybe_design_aggregate:handle(Cmd, Context), fun aggregate_designed_v1:to_map/1).

execute_design_event(Payload, #division_state{designed_events = Evts}) ->
    {ok, Cmd} = design_event_v1:from_map(Payload),
    Context = #{designed_events => Evts},
    convert_events(maybe_design_event:handle(Cmd, Context), fun event_designed_v1:to_map/1).

execute_plan_desk(Payload, #division_state{planned_desks = Desks}) ->
    {ok, Cmd} = plan_desk_v1:from_map(Payload),
    Context = #{planned_desks => Desks},
    convert_events(maybe_plan_desk:handle(Cmd, Context), fun desk_planned_v1:to_map/1).

execute_plan_dependency(Payload, #division_state{planned_dependencies = Deps}) ->
    {ok, Cmd} = plan_dependency_v1:from_map(Payload),
    Context = #{planned_dependencies => Deps},
    convert_events(maybe_plan_dependency:handle(Cmd, Context), fun dependency_planned_v1:to_map/1).

%% --- Planning commands ---

execute_open_planning(Payload, #division_state{planning_status = S}) ->
    case S band ?PLANNING_OPEN of
        0 ->
            {ok, Cmd} = open_planning_v1:from_map(Payload),
            convert_events(maybe_open_planning:handle(Cmd), fun planning_opened_v1:to_map/1);
        _ ->
            {error, planning_already_open}
    end.

execute_shelve_planning(Payload, #division_state{planning_status = S}) ->
    case S band ?PLANNING_OPEN of
        0 -> {error, planning_not_open};
        _ ->
            {ok, Cmd} = shelve_planning_v1:from_map(Payload),
            convert_events(maybe_shelve_planning:handle(Cmd), fun planning_shelved_v1:to_map/1)
    end.

execute_resume_planning(Payload, #division_state{planning_status = S}) ->
    case S band ?PLANNING_SHELVED of
        0 -> {error, planning_not_shelved};
        _ ->
            {ok, Cmd} = resume_planning_v1:from_map(Payload),
            convert_events(maybe_resume_planning:handle(Cmd), fun planning_resumed_v1:to_map/1)
    end.

execute_submit_planning(Payload, #division_state{planning_status = S, venture_id = VId, context_name = CName}) ->
    case S band ?PLANNING_OPEN of
        0 -> {error, planning_not_open};
        _ ->
            {ok, Cmd} = submit_planning_v1:from_map(Payload),
            Context = #{venture_id => VId, context_name => CName},
            convert_events(maybe_submit_planning:handle(Cmd, Context), fun planning_submitted_v1:to_map/1)
    end.

%% --- Kanban commands ---

execute_post_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = post_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_post_kanban_card:handle(Cmd, Context), fun kanban_card_posted_v1:to_map/1).

execute_pick_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = pick_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_pick_kanban_card:handle(Cmd, Context), fun kanban_card_picked_v1:to_map/1).

execute_finish_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = finish_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_finish_kanban_card:handle(Cmd, Context), fun kanban_card_finished_v1:to_map/1).

execute_unpick_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = unpick_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_unpick_kanban_card:handle(Cmd, Context), fun kanban_card_unpicked_v1:to_map/1).

execute_park_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = park_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_park_kanban_card:handle(Cmd, Context), fun kanban_card_parked_v1:to_map/1).

execute_unpark_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = unpark_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_unpark_kanban_card:handle(Cmd, Context), fun kanban_card_unparked_v1:to_map/1).

execute_block_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = block_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_block_kanban_card:handle(Cmd, Context), fun kanban_card_blocked_v1:to_map/1).

execute_unblock_card(Payload, #division_state{cards = Cards}) ->
    {ok, Cmd} = unblock_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_unblock_kanban_card:handle(Cmd, Context), fun kanban_card_unblocked_v1:to_map/1).

%% --- Crafting commands ---

execute_open_crafting(Payload, #division_state{crafting_status = S}) ->
    case S band ?CRAFTING_OPEN of
        0 ->
            {ok, Cmd} = open_crafting_v1:from_map(Payload),
            convert_events(maybe_open_crafting:handle(Cmd), fun crafting_opened_v1:to_map/1);
        _ ->
            {error, crafting_already_open}
    end.

execute_shelve_crafting(Payload, #division_state{crafting_status = S}) ->
    case S band ?CRAFTING_OPEN of
        0 -> {error, crafting_not_open};
        _ ->
            {ok, Cmd} = shelve_crafting_v1:from_map(Payload),
            convert_events(maybe_shelve_crafting:handle(Cmd), fun crafting_shelved_v1:to_map/1)
    end.

execute_resume_crafting(Payload, #division_state{crafting_status = S}) ->
    case S band ?CRAFTING_SHELVED of
        0 -> {error, crafting_not_shelved};
        _ ->
            {ok, Cmd} = resume_crafting_v1:from_map(Payload),
            convert_events(maybe_resume_crafting:handle(Cmd), fun crafting_resumed_v1:to_map/1)
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

%% --- Guards ---

require_storming_active(#division_state{storming_status = S}, Fun) ->
    case S band ?STORMING_ACTIVE of
        0 -> {error, storming_not_active};
        _ -> Fun()
    end.

require_kanban_active(#division_state{kanban_status = S}, Fun) ->
    case S band ?BOARD_ACTIVE of
        0 -> {error, board_not_active};
        _ -> Fun()
    end.

require_crafting_open(#division_state{crafting_status = S}, Fun) ->
    case S band ?CRAFTING_OPEN of
        0 -> {error, crafting_not_open};
        _ -> Fun()
    end.

%% --- Internal ---

get_command_type(#{command_type := T}) when is_binary(T) -> T;
get_command_type(#{command_type := T}) when is_atom(T) -> atom_to_binary(T);
get_command_type(_) -> undefined.

convert_events({ok, Events}, ToMapFn) ->
    {ok, [ToMapFn(E) || E <- Events]};
convert_events({error, _} = Err, _) ->
    Err.
