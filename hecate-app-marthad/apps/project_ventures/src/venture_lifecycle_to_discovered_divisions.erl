%%% @doc Merged projection: division lifecycle events -> discovered_divisions ETS.
%%%
%%% Maintains division records with phase status fields enriched from
%%% storming, planning, kanban, and crafting lifecycle events.
%%% @end
-module(venture_lifecycle_to_discovered_divisions).
-behaviour(evoq_projection).

-include_lib("guide_division_storming/include/storming_status.hrl").
-include_lib("guide_division_planning/include/planning_status.hrl").
-include_lib("guide_kanban_lifecycle/include/kanban_board_status.hrl").
-include_lib("guide_division_crafting/include/crafting_status.hrl").

-export([interested_in/0, init/1, project/4]).

-define(TABLE, project_ventures_divisions).

interested_in() ->
    [%% Division identification
     <<"division_identified_v1">>,
     %% Storming lifecycle
     <<"storming_initiated_v1">>,
     <<"storming_archived_v1">>,
     %% Planning lifecycle
     <<"planning_initiated_v1">>,
     <<"planning_archived_v1">>,
     <<"planning_opened_v1">>,
     <<"planning_shelved_v1">>,
     <<"planning_resumed_v1">>,
     <<"planning_submitted_v1">>,
     %% Kanban lifecycle
     <<"kanban_board_initiated_v1">>,
     <<"kanban_board_archived_v1">>,
     %% Crafting lifecycle
     <<"crafting_initiated_v1">>,
     <<"crafting_archived_v1">>,
     <<"crafting_opened_v1">>,
     <<"crafting_shelved_v1">>,
     <<"crafting_resumed_v1">>].

init(_Config) ->
    {ok, RM} = evoq_read_model:new(evoq_read_model_ets, #{name => ?TABLE}),
    {ok, #{}, RM}.

project(#{data := Data} = Event, _Metadata, State, RM) ->
    EventType = get_event_type(Event),
    do_project(EventType, Data, State, RM).

%% --- division_identified_v1: INSERT new division with empty phase statuses ---

do_project(<<"division_identified_v1">>, Data, State, RM) ->
    DivisionId = gf(division_id, Data),
    Division = #{
        division_id    => DivisionId,
        venture_id     => gf(venture_id, Data),
        context_name   => gf(context_name, Data),
        description    => gf(description, Data),
        identified_by  => gf(identified_by, Data),
        discovered_at  => gf(identified_at, Data),
        %% Phase statuses (enriched by lifecycle events)
        storming_status       => 0,
        storming_status_label => <<"">>,
        planning_status       => 0,
        planning_status_label => <<"">>,
        kanban_status         => 0,
        kanban_status_label   => <<"">>,
        crafting_status       => 0,
        crafting_status_label => <<"">>,
        %% Available actions per phase
        storming_available_actions => [],
        planning_available_actions => [],
        kanban_available_actions   => [],
        crafting_available_actions => []
    },
    {ok, RM2} = evoq_read_model:put(DivisionId, Division, RM),
    {ok, State, RM2};

%% ===================================================================
%% Storming lifecycle
%% ===================================================================

do_project(<<"storming_initiated_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        storming_status, storming_status_label, storming_available_actions, storming,
        ?STORMING_FLAG_MAP,
        fun(_S) -> ?STORMING_INITIATED bor ?STORMING_ACTIVE end,
        State, RM);

do_project(<<"storming_archived_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        storming_status, storming_status_label, storming_available_actions, storming,
        ?STORMING_FLAG_MAP,
        fun(S) -> evoq_bit_flags:set(S, ?STORMING_ARCHIVED) end,
        State, RM);

%% ===================================================================
%% Planning lifecycle
%% ===================================================================

do_project(<<"planning_initiated_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        planning_status, planning_status_label, planning_available_actions, planning,
        ?PLANNING_FLAG_MAP,
        fun(_S) -> ?PLANNING_INITIATED end,
        State, RM);

do_project(<<"planning_opened_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        planning_status, planning_status_label, planning_available_actions, planning,
        ?PLANNING_FLAG_MAP,
        fun(S) -> evoq_bit_flags:set(S, ?PLANNING_OPEN) end,
        State, RM);

do_project(<<"planning_shelved_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        planning_status, planning_status_label, planning_available_actions, planning,
        ?PLANNING_FLAG_MAP,
        fun(S) ->
            S1 = evoq_bit_flags:unset(S, ?PLANNING_OPEN),
            evoq_bit_flags:set(S1, ?PLANNING_SHELVED)
        end,
        State, RM);

do_project(<<"planning_resumed_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        planning_status, planning_status_label, planning_available_actions, planning,
        ?PLANNING_FLAG_MAP,
        fun(S) ->
            S1 = evoq_bit_flags:unset(S, ?PLANNING_SHELVED),
            evoq_bit_flags:set(S1, ?PLANNING_OPEN)
        end,
        State, RM);

do_project(<<"planning_submitted_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        planning_status, planning_status_label, planning_available_actions, planning,
        ?PLANNING_FLAG_MAP,
        fun(S) -> evoq_bit_flags:set(S, ?PLANNING_SUBMITTED) end,
        State, RM);

do_project(<<"planning_archived_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        planning_status, planning_status_label, planning_available_actions, planning,
        ?PLANNING_FLAG_MAP,
        fun(S) -> evoq_bit_flags:set(S, ?PLANNING_ARCHIVED) end,
        State, RM);

%% ===================================================================
%% Kanban lifecycle
%% ===================================================================

do_project(<<"kanban_board_initiated_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        kanban_status, kanban_status_label, kanban_available_actions, kanban,
        ?BOARD_FLAG_MAP,
        fun(_S) -> ?BOARD_INITIATED bor ?BOARD_ACTIVE end,
        State, RM);

do_project(<<"kanban_board_archived_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        kanban_status, kanban_status_label, kanban_available_actions, kanban,
        ?BOARD_FLAG_MAP,
        fun(S) -> evoq_bit_flags:set(S, ?BOARD_ARCHIVED) end,
        State, RM);

%% ===================================================================
%% Crafting lifecycle
%% ===================================================================

do_project(<<"crafting_initiated_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        crafting_status, crafting_status_label, crafting_available_actions, crafting,
        ?CRAFTING_FLAG_MAP,
        fun(_S) -> ?CRAFTING_INITIATED end,
        State, RM);

do_project(<<"crafting_opened_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        crafting_status, crafting_status_label, crafting_available_actions, crafting,
        ?CRAFTING_FLAG_MAP,
        fun(S) -> evoq_bit_flags:set(S, ?CRAFTING_OPEN) end,
        State, RM);

do_project(<<"crafting_shelved_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        crafting_status, crafting_status_label, crafting_available_actions, crafting,
        ?CRAFTING_FLAG_MAP,
        fun(S) ->
            S1 = evoq_bit_flags:unset(S, ?CRAFTING_OPEN),
            evoq_bit_flags:set(S1, ?CRAFTING_SHELVED)
        end,
        State, RM);

do_project(<<"crafting_resumed_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        crafting_status, crafting_status_label, crafting_available_actions, crafting,
        ?CRAFTING_FLAG_MAP,
        fun(S) ->
            S1 = evoq_bit_flags:unset(S, ?CRAFTING_SHELVED),
            evoq_bit_flags:set(S1, ?CRAFTING_OPEN)
        end,
        State, RM);

do_project(<<"crafting_archived_v1">>, Data, State, RM) ->
    update_phase_status(gf(division_id, Data),
        crafting_status, crafting_status_label, crafting_available_actions, crafting,
        ?CRAFTING_FLAG_MAP,
        fun(S) -> evoq_bit_flags:set(S, ?CRAFTING_ARCHIVED) end,
        State, RM);

%% --- Unknown ---

do_project(_Unknown, _Data, State, RM) ->
    {skip, State, RM}.

%%====================================================================
%% Internal
%%====================================================================

update_phase_status(DivisionId, StatusKey, LabelKey, ActionsKey, Phase, FlagMap, StatusFun, State, RM) ->
    case evoq_read_model:get(DivisionId, RM) of
        {ok, Div} ->
            OldStatus = maps:get(StatusKey, Div, 0),
            NewStatus = StatusFun(OldStatus),
            NewLabel = evoq_bit_flags:to_string(NewStatus, FlagMap),
            NewActions = available_actions(NewStatus, Phase),
            Updated = Div#{
                StatusKey => NewStatus,
                LabelKey => NewLabel,
                ActionsKey => NewActions
            },
            {ok, RM2} = evoq_read_model:put(DivisionId, Updated, RM),
            {ok, State, RM2};
        {error, not_found} ->
            {skip, State, RM}
    end.

%% @doc Compute available actions for a phase given its current bit-flag status.
available_actions(Status, storming) ->
    case evoq_bit_flags:has(Status, ?STORMING_ARCHIVED) of
        true  -> [];
        false ->
            case evoq_bit_flags:has(Status, ?STORMING_ACTIVE) of
                true  -> [<<"archive">>];
                false -> []
            end
    end;
available_actions(Status, planning) ->
    case evoq_bit_flags:has(Status, ?PLANNING_ARCHIVED) of
        true  -> [];
        false ->
            case evoq_bit_flags:has(Status, ?PLANNING_OPEN) of
                true  -> [<<"shelve">>, <<"conclude">>];
                false ->
                    case evoq_bit_flags:has(Status, ?PLANNING_SHELVED) of
                        true  -> [<<"resume">>];
                        false ->
                            case evoq_bit_flags:has(Status, ?PLANNING_INITIATED) of
                                true  -> [<<"open">>];
                                false -> []
                            end
                    end
            end
    end;
available_actions(Status, kanban) ->
    case evoq_bit_flags:has(Status, ?BOARD_ARCHIVED) of
        true  -> [];
        false ->
            case evoq_bit_flags:has(Status, ?BOARD_ACTIVE) of
                true  -> [<<"archive">>];
                false -> []
            end
    end;
available_actions(Status, crafting) ->
    case evoq_bit_flags:has(Status, ?CRAFTING_ARCHIVED) of
        true  -> [];
        false ->
            case evoq_bit_flags:has(Status, ?CRAFTING_OPEN) of
                true  -> [<<"shelve">>, <<"conclude">>];
                false ->
                    case evoq_bit_flags:has(Status, ?CRAFTING_SHELVED) of
                        true  -> [<<"resume">>];
                        false ->
                            case evoq_bit_flags:has(Status, ?CRAFTING_INITIATED) of
                                true  -> [<<"open">>];
                                false -> []
                            end
                    end
            end
    end.

get_event_type(#{event_type := T}) when is_binary(T) -> T;
get_event_type(#{<<"event_type">> := T}) when is_binary(T) -> T;
get_event_type(_) -> undefined.

gf(Key, Data) when is_atom(Key) ->
    case maps:find(Key, Data) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Data, undefined)
    end.
