%%% @doc Agent orchestration aggregate — manages agent session lifecycle.
%%%
%%% Stream: agent-session-{session_id}
%%% Store: orchestration_store
%%%
%%% The state machine is SHARED across all agent roles (lifecycle is identical).
%%% Per-role behavior lives in per-role command/event/handler modules,
%%% resolved via role_modules/2.
%%%
%%% Lifecycle:
%%%   [fresh] -> initiate_agent -> INITIATED -> (LLM PM spawns)
%%%   INITIATED -> complete_agent_turn -> AWAITING_INPUT (conversational agents)
%%%   AWAITING_INPUT -> receive_agent_input -> INITIATED (resumes for next turn)
%%%   INITIATED -> complete_agent -> COMPLETED
%%%   INITIATED -> fail_agent -> FAILED
%%%   AWAITING_INPUT -> fail_agent -> FAILED (escape hatch)
%%%   COMPLETED -> escalate_to_gate -> GATE_PENDING (agents with HITL gates)
%%%   GATE_PENDING -> pass_gate -> GATE_PASSED
%%%   GATE_PENDING -> reject_gate -> GATE_REJECTED
%%%   any (except ARCHIVED) -> archive -> ARCHIVED
-module(agent_orchestration_aggregate).

-behaviour(evoq_aggregate).

-include("agent_orchestration_status.hrl").
-include("agent_session_state.hrl").

-export([init/1, execute/2, apply/2]).
-export([initial_state/0, apply_event/2]).
-export([flag_map/0]).
-export([role_modules/2]).

-type state() :: #agent_session_state{}.
-export_type([state/0]).

-spec flag_map() -> evoq_bit_flags:flag_map().
flag_map() -> ?AO_FLAG_MAP.

%% --- Callbacks ---

-spec init(binary()) -> {ok, state()}.
init(_AggregateId) ->
    {ok, initial_state()}.

-spec initial_state() -> state().
initial_state() ->
    #agent_session_state{}.

%% --- Per-Role Module Dispatch ---
%%
%% Maps {action, role} to {CmdMod, HandlerMod, EventToMapFn}.
%% This is a LOOKUP TABLE — it returns module names, not behavior.
%% Each role's modules are added as they are implemented.

-spec role_modules(atom(), binary()) ->
    {ok, module(), module(), fun((term()) -> map())} | {error, role_not_implemented}.

%% ── Visionary (gated: vision_gate) ──
role_modules(initiate, <<"visionary">>) ->
    {ok, initiate_visionary_v1, maybe_initiate_visionary, fun visionary_initiated_v1:to_map/1};
role_modules(complete, <<"visionary">>) ->
    {ok, complete_visionary_v1, maybe_complete_visionary, fun visionary_completed_v1:to_map/1};
role_modules(fail, <<"visionary">>) ->
    {ok, fail_visionary_v1, maybe_fail_visionary, fun visionary_failed_v1:to_map/1};
role_modules(escalate, <<"visionary">>) ->
    {ok, escalate_vision_gate_v1, maybe_escalate_vision_gate, fun vision_gate_escalated_v1:to_map/1};
role_modules(pass_gate, <<"visionary">>) ->
    {ok, pass_vision_gate_v1, maybe_pass_vision_gate, fun vision_gate_passed_v1:to_map/1};
role_modules(reject_gate, <<"visionary">>) ->
    {ok, reject_vision_gate_v1, maybe_reject_vision_gate, fun vision_gate_rejected_v1:to_map/1};

%% ── Explorer (gated: boundary_gate) ──
role_modules(initiate, <<"explorer">>) ->
    {ok, initiate_explorer_v1, maybe_initiate_explorer, fun explorer_initiated_v1:to_map/1};
role_modules(complete, <<"explorer">>) ->
    {ok, complete_explorer_v1, maybe_complete_explorer, fun explorer_completed_v1:to_map/1};
role_modules(fail, <<"explorer">>) ->
    {ok, fail_explorer_v1, maybe_fail_explorer, fun explorer_failed_v1:to_map/1};
role_modules(escalate, <<"explorer">>) ->
    {ok, escalate_boundary_gate_v1, maybe_escalate_boundary_gate, fun boundary_gate_escalated_v1:to_map/1};
role_modules(pass_gate, <<"explorer">>) ->
    {ok, pass_boundary_gate_v1, maybe_pass_boundary_gate, fun boundary_gate_passed_v1:to_map/1};
role_modules(reject_gate, <<"explorer">>) ->
    {ok, reject_boundary_gate_v1, maybe_reject_boundary_gate, fun boundary_gate_rejected_v1:to_map/1};

%% ── Stormer (gated: design_gate) ──
role_modules(initiate, <<"stormer">>) ->
    {ok, initiate_stormer_v1, maybe_initiate_stormer, fun stormer_initiated_v1:to_map/1};
role_modules(complete, <<"stormer">>) ->
    {ok, complete_stormer_v1, maybe_complete_stormer, fun stormer_completed_v1:to_map/1};
role_modules(fail, <<"stormer">>) ->
    {ok, fail_stormer_v1, maybe_fail_stormer, fun stormer_failed_v1:to_map/1};
role_modules(escalate, <<"stormer">>) ->
    {ok, escalate_design_gate_v1, maybe_escalate_design_gate, fun design_gate_escalated_v1:to_map/1};
role_modules(pass_gate, <<"stormer">>) ->
    {ok, pass_design_gate_v1, maybe_pass_design_gate, fun design_gate_passed_v1:to_map/1};
role_modules(reject_gate, <<"stormer">>) ->
    {ok, reject_design_gate_v1, maybe_reject_design_gate, fun design_gate_rejected_v1:to_map/1};

%% ── Reviewer (gated: review_gate) ──
role_modules(initiate, <<"reviewer">>) ->
    {ok, initiate_reviewer_v1, maybe_initiate_reviewer, fun reviewer_initiated_v1:to_map/1};
role_modules(complete, <<"reviewer">>) ->
    {ok, complete_reviewer_v1, maybe_complete_reviewer, fun reviewer_completed_v1:to_map/1};
role_modules(fail, <<"reviewer">>) ->
    {ok, fail_reviewer_v1, maybe_fail_reviewer, fun reviewer_failed_v1:to_map/1};
role_modules(escalate, <<"reviewer">>) ->
    {ok, escalate_review_gate_v1, maybe_escalate_review_gate, fun review_gate_escalated_v1:to_map/1};
role_modules(pass_gate, <<"reviewer">>) ->
    {ok, pass_review_gate_v1, maybe_pass_review_gate, fun review_gate_passed_v1:to_map/1};
role_modules(reject_gate, <<"reviewer">>) ->
    {ok, reject_review_gate_v1, maybe_reject_review_gate, fun review_gate_rejected_v1:to_map/1};

%% ── Architect (standard) ──
role_modules(initiate, <<"architect">>) ->
    {ok, initiate_architect_v1, maybe_initiate_architect, fun architect_initiated_v1:to_map/1};
role_modules(complete, <<"architect">>) ->
    {ok, complete_architect_v1, maybe_complete_architect, fun architect_completed_v1:to_map/1};
role_modules(fail, <<"architect">>) ->
    {ok, fail_architect_v1, maybe_fail_architect, fun architect_failed_v1:to_map/1};

%% ── Erlang Coder (standard) ──
role_modules(initiate, <<"erlang_coder">>) ->
    {ok, initiate_erlang_coder_v1, maybe_initiate_erlang_coder, fun erlang_coder_initiated_v1:to_map/1};
role_modules(complete, <<"erlang_coder">>) ->
    {ok, complete_erlang_coder_v1, maybe_complete_erlang_coder, fun erlang_coder_completed_v1:to_map/1};
role_modules(fail, <<"erlang_coder">>) ->
    {ok, fail_erlang_coder_v1, maybe_fail_erlang_coder, fun erlang_coder_failed_v1:to_map/1};

%% ── Svelte Coder (standard) ──
role_modules(initiate, <<"svelte_coder">>) ->
    {ok, initiate_svelte_coder_v1, maybe_initiate_svelte_coder, fun svelte_coder_initiated_v1:to_map/1};
role_modules(complete, <<"svelte_coder">>) ->
    {ok, complete_svelte_coder_v1, maybe_complete_svelte_coder, fun svelte_coder_completed_v1:to_map/1};
role_modules(fail, <<"svelte_coder">>) ->
    {ok, fail_svelte_coder_v1, maybe_fail_svelte_coder, fun svelte_coder_failed_v1:to_map/1};

%% ── SQL Coder (standard) ──
role_modules(initiate, <<"sql_coder">>) ->
    {ok, initiate_sql_coder_v1, maybe_initiate_sql_coder, fun sql_coder_initiated_v1:to_map/1};
role_modules(complete, <<"sql_coder">>) ->
    {ok, complete_sql_coder_v1, maybe_complete_sql_coder, fun sql_coder_completed_v1:to_map/1};
role_modules(fail, <<"sql_coder">>) ->
    {ok, fail_sql_coder_v1, maybe_fail_sql_coder, fun sql_coder_failed_v1:to_map/1};

%% ── Tester (standard) ──
role_modules(initiate, <<"tester">>) ->
    {ok, initiate_tester_v1, maybe_initiate_tester, fun tester_initiated_v1:to_map/1};
role_modules(complete, <<"tester">>) ->
    {ok, complete_tester_v1, maybe_complete_tester, fun tester_completed_v1:to_map/1};
role_modules(fail, <<"tester">>) ->
    {ok, fail_tester_v1, maybe_fail_tester, fun tester_failed_v1:to_map/1};

%% ── Delivery Manager (standard) ──
role_modules(initiate, <<"delivery_manager">>) ->
    {ok, initiate_delivery_manager_v1, maybe_initiate_delivery_manager, fun delivery_manager_initiated_v1:to_map/1};
role_modules(complete, <<"delivery_manager">>) ->
    {ok, complete_delivery_manager_v1, maybe_complete_delivery_manager, fun delivery_manager_completed_v1:to_map/1};
role_modules(fail, <<"delivery_manager">>) ->
    {ok, fail_delivery_manager_v1, maybe_fail_delivery_manager, fun delivery_manager_failed_v1:to_map/1};

%% ── Coordinator (conversational) ──
role_modules(initiate, <<"coordinator">>) ->
    {ok, initiate_coordinator_v1, maybe_initiate_coordinator, fun coordinator_initiated_v1:to_map/1};
role_modules(complete, <<"coordinator">>) ->
    {ok, complete_coordinator_v1, maybe_complete_coordinator, fun coordinator_completed_v1:to_map/1};
role_modules(fail, <<"coordinator">>) ->
    {ok, fail_coordinator_v1, maybe_fail_coordinator, fun coordinator_failed_v1:to_map/1};
role_modules(complete_turn, <<"coordinator">>) ->
    {ok, complete_coordinator_turn_v1, maybe_complete_coordinator_turn, fun coordinator_turn_completed_v1:to_map/1};
role_modules(receive_input, <<"coordinator">>) ->
    {ok, receive_coordinator_input_v1, maybe_receive_coordinator_input, fun coordinator_input_received_v1:to_map/1};

%% ── Mentor (conversational) ──
role_modules(initiate, <<"mentor">>) ->
    {ok, initiate_mentor_v1, maybe_initiate_mentor, fun mentor_initiated_v1:to_map/1};
role_modules(complete, <<"mentor">>) ->
    {ok, complete_mentor_v1, maybe_complete_mentor, fun mentor_completed_v1:to_map/1};
role_modules(fail, <<"mentor">>) ->
    {ok, fail_mentor_v1, maybe_fail_mentor, fun mentor_failed_v1:to_map/1};
role_modules(complete_turn, <<"mentor">>) ->
    {ok, complete_mentor_turn_v1, maybe_complete_mentor_turn, fun mentor_turn_completed_v1:to_map/1};
role_modules(receive_input, <<"mentor">>) ->
    {ok, receive_mentor_input_v1, maybe_receive_mentor_input, fun mentor_input_received_v1:to_map/1};

role_modules(_Action, _Role) ->
    {error, role_not_implemented}.

%% --- Execute ---

-spec execute(state(), map()) -> {ok, [map()]} | {error, term()}.

%% Fresh aggregate — only initiate allowed
execute(#agent_session_state{status = 0}, Payload) ->
    case get_command_type(Payload) of
        <<"initiate_agent">> -> execute_initiate(Payload);
        _ -> {error, session_not_initiated}
    end;

%% Archived — nothing allowed
execute(#agent_session_state{status = S}, _Payload) when S band ?AO_ARCHIVED =/= 0 ->
    {error, session_archived};

%% GATE_PASSED / GATE_REJECTED — accept archive only
execute(#agent_session_state{status = S} = State, Payload)
  when S band ?AO_GATE_PASSED =/= 0; S band ?AO_GATE_REJECTED =/= 0 ->
    case get_command_type(Payload) of
        <<"archive_agent_session">> -> execute_archive(Payload, State);
        _ -> {error, unknown_command}
    end;

%% GATE_PENDING — accept pass/reject or archive
execute(#agent_session_state{status = S} = State, Payload) when S band ?AO_GATE_PENDING =/= 0 ->
    case get_command_type(Payload) of
        <<"pass_gate">>             -> execute_pass_gate(Payload, State);
        <<"reject_gate">>           -> execute_reject_gate(Payload, State);
        <<"archive_agent_session">> -> execute_archive(Payload, State);
        _ -> {error, unknown_command}
    end;

%% FAILED — accept archive only
execute(#agent_session_state{status = S} = State, Payload) when S band ?AO_FAILED =/= 0 ->
    case get_command_type(Payload) of
        <<"archive_agent_session">> -> execute_archive(Payload, State);
        _ -> {error, unknown_command}
    end;

%% COMPLETED — accept archive or gate escalation
execute(#agent_session_state{status = S} = State, Payload) when S band ?AO_COMPLETED =/= 0 ->
    case get_command_type(Payload) of
        <<"escalate_to_gate">>      -> execute_escalate_to_gate(Payload, State);
        <<"archive_agent_session">> -> execute_archive(Payload, State);
        _ -> {error, unknown_command}
    end;

%% AWAITING_INPUT — accept input, fail, or archive
execute(#agent_session_state{status = S} = State, Payload) when S band ?AO_AWAITING_INPUT =/= 0 ->
    case get_command_type(Payload) of
        <<"receive_agent_input">>   -> execute_receive_input(Payload, State);
        <<"fail_agent">>            -> execute_fail(Payload, State);
        <<"archive_agent_session">> -> execute_archive(Payload, State);
        _ -> {error, awaiting_input}
    end;

%% INITIATED (but not completed/failed/gated/awaiting) — accept complete, fail, or turn
execute(#agent_session_state{status = S} = State, Payload) when S band ?AO_INITIATED =/= 0 ->
    case get_command_type(Payload) of
        <<"complete_agent">>        -> execute_complete(Payload, State);
        <<"complete_agent_turn">>   -> execute_complete_turn(Payload, State);
        <<"fail_agent">>            -> execute_fail(Payload, State);
        <<"archive_agent_session">> -> execute_archive(Payload, State);
        _ -> {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Command handlers (per-role dispatch) ---

execute_initiate(Payload) ->
    Role = get_role(Payload),
    case role_modules(initiate, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_complete(Payload, #agent_session_state{agent_role = Role} = State) ->
    case role_modules(complete, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd, State), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_complete_turn(Payload, #agent_session_state{agent_role = Role} = State) ->
    case role_modules(complete_turn, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd, State), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_receive_input(Payload, #agent_session_state{agent_role = Role} = State) ->
    case role_modules(receive_input, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd, State), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_fail(Payload, #agent_session_state{agent_role = Role} = State) ->
    case role_modules(fail, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd, State), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_escalate_to_gate(Payload, #agent_session_state{agent_role = Role} = State) ->
    case role_modules(escalate, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd, State), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_pass_gate(Payload, #agent_session_state{agent_role = Role} = State) ->
    case role_modules(pass_gate, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd, State), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_reject_gate(Payload, #agent_session_state{agent_role = Role} = State) ->
    case role_modules(reject_gate, Role) of
        {ok, CmdMod, HandlerMod, ToMapFn} ->
            {ok, Cmd} = CmdMod:from_map(Payload),
            convert_events(HandlerMod:handle(Cmd, State), ToMapFn);
        {error, _} = Err ->
            Err
    end.

execute_archive(Payload, State) ->
    %% Archive is role-agnostic — uses shared modules
    {ok, Cmd} = archive_agent_session_v1:from_map(Payload),
    convert_events(
        maybe_archive_agent_session:handle(Cmd, State),
        fun agent_session_archived_v1:to_map/1).

%% --- Apply ---

-spec apply(state(), map()) -> state().
apply(State, Event) ->
    apply_event(Event, State).

-spec apply_event(map(), state()) -> state().

%% ── Visionary ──
apply_event(#{<<"event_type">> := <<"visionary_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"visionary_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"visionary_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"visionary_completed_v1">>} = E, S)       -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"visionary_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"visionary_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Vision gate ──
apply_event(#{<<"event_type">> := <<"vision_gate_escalated_v1">>} = E, S)  -> apply_gate_escalated(E, S);
apply_event(#{event_type := <<"vision_gate_escalated_v1">>} = E, S)       -> apply_gate_escalated(E, S);
apply_event(#{<<"event_type">> := <<"vision_gate_passed_v1">>} = E, S)    -> apply_gate_passed(E, S);
apply_event(#{event_type := <<"vision_gate_passed_v1">>} = E, S)         -> apply_gate_passed(E, S);
apply_event(#{<<"event_type">> := <<"vision_gate_rejected_v1">>} = E, S)  -> apply_gate_rejected(E, S);
apply_event(#{event_type := <<"vision_gate_rejected_v1">>} = E, S)       -> apply_gate_rejected(E, S);

%% ── Explorer ──
apply_event(#{<<"event_type">> := <<"explorer_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"explorer_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"explorer_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"explorer_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"explorer_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"explorer_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Boundary gate ──
apply_event(#{<<"event_type">> := <<"boundary_gate_escalated_v1">>} = E, S) -> apply_gate_escalated(E, S);
apply_event(#{event_type := <<"boundary_gate_escalated_v1">>} = E, S)      -> apply_gate_escalated(E, S);
apply_event(#{<<"event_type">> := <<"boundary_gate_passed_v1">>} = E, S)   -> apply_gate_passed(E, S);
apply_event(#{event_type := <<"boundary_gate_passed_v1">>} = E, S)        -> apply_gate_passed(E, S);
apply_event(#{<<"event_type">> := <<"boundary_gate_rejected_v1">>} = E, S) -> apply_gate_rejected(E, S);
apply_event(#{event_type := <<"boundary_gate_rejected_v1">>} = E, S)      -> apply_gate_rejected(E, S);

%% ── Stormer ──
apply_event(#{<<"event_type">> := <<"stormer_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"stormer_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"stormer_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"stormer_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"stormer_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"stormer_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Design gate ──
apply_event(#{<<"event_type">> := <<"design_gate_escalated_v1">>} = E, S) -> apply_gate_escalated(E, S);
apply_event(#{event_type := <<"design_gate_escalated_v1">>} = E, S)      -> apply_gate_escalated(E, S);
apply_event(#{<<"event_type">> := <<"design_gate_passed_v1">>} = E, S)   -> apply_gate_passed(E, S);
apply_event(#{event_type := <<"design_gate_passed_v1">>} = E, S)        -> apply_gate_passed(E, S);
apply_event(#{<<"event_type">> := <<"design_gate_rejected_v1">>} = E, S) -> apply_gate_rejected(E, S);
apply_event(#{event_type := <<"design_gate_rejected_v1">>} = E, S)      -> apply_gate_rejected(E, S);

%% ── Reviewer ──
apply_event(#{<<"event_type">> := <<"reviewer_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"reviewer_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"reviewer_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"reviewer_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"reviewer_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"reviewer_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Review gate ──
apply_event(#{<<"event_type">> := <<"review_gate_escalated_v1">>} = E, S) -> apply_gate_escalated(E, S);
apply_event(#{event_type := <<"review_gate_escalated_v1">>} = E, S)      -> apply_gate_escalated(E, S);
apply_event(#{<<"event_type">> := <<"review_gate_passed_v1">>} = E, S)   -> apply_gate_passed(E, S);
apply_event(#{event_type := <<"review_gate_passed_v1">>} = E, S)        -> apply_gate_passed(E, S);
apply_event(#{<<"event_type">> := <<"review_gate_rejected_v1">>} = E, S) -> apply_gate_rejected(E, S);
apply_event(#{event_type := <<"review_gate_rejected_v1">>} = E, S)      -> apply_gate_rejected(E, S);

%% ── Architect ──
apply_event(#{<<"event_type">> := <<"architect_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"architect_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"architect_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"architect_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"architect_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"architect_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Erlang Coder ──
apply_event(#{<<"event_type">> := <<"erlang_coder_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"erlang_coder_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"erlang_coder_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"erlang_coder_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"erlang_coder_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"erlang_coder_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Svelte Coder ──
apply_event(#{<<"event_type">> := <<"svelte_coder_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"svelte_coder_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"svelte_coder_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"svelte_coder_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"svelte_coder_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"svelte_coder_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── SQL Coder ──
apply_event(#{<<"event_type">> := <<"sql_coder_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"sql_coder_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"sql_coder_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"sql_coder_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"sql_coder_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"sql_coder_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Tester ──
apply_event(#{<<"event_type">> := <<"tester_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"tester_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"tester_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"tester_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"tester_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"tester_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Delivery Manager ──
apply_event(#{<<"event_type">> := <<"delivery_manager_initiated_v1">>} = E, S)  -> apply_initiated(E, S);
apply_event(#{event_type := <<"delivery_manager_initiated_v1">>} = E, S)       -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"delivery_manager_completed_v1">>} = E, S) -> apply_completed(E, S);
apply_event(#{event_type := <<"delivery_manager_completed_v1">>} = E, S)      -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"delivery_manager_failed_v1">>} = E, S)    -> apply_failed(E, S);
apply_event(#{event_type := <<"delivery_manager_failed_v1">>} = E, S)         -> apply_failed(E, S);

%% ── Coordinator (conversational) ──
apply_event(#{<<"event_type">> := <<"coordinator_initiated_v1">>} = E, S)         -> apply_initiated(E, S);
apply_event(#{event_type := <<"coordinator_initiated_v1">>} = E, S)              -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"coordinator_turn_completed_v1">>} = E, S)    -> apply_turn_completed(E, S);
apply_event(#{event_type := <<"coordinator_turn_completed_v1">>} = E, S)         -> apply_turn_completed(E, S);
apply_event(#{<<"event_type">> := <<"coordinator_input_received_v1">>} = E, S)    -> apply_input_received(E, S);
apply_event(#{event_type := <<"coordinator_input_received_v1">>} = E, S)         -> apply_input_received(E, S);
apply_event(#{<<"event_type">> := <<"coordinator_completed_v1">>} = E, S)         -> apply_completed(E, S);
apply_event(#{event_type := <<"coordinator_completed_v1">>} = E, S)              -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"coordinator_failed_v1">>} = E, S)            -> apply_failed(E, S);
apply_event(#{event_type := <<"coordinator_failed_v1">>} = E, S)                 -> apply_failed(E, S);

%% ── Mentor (conversational) ──
apply_event(#{<<"event_type">> := <<"mentor_initiated_v1">>} = E, S)         -> apply_initiated(E, S);
apply_event(#{event_type := <<"mentor_initiated_v1">>} = E, S)              -> apply_initiated(E, S);
apply_event(#{<<"event_type">> := <<"mentor_turn_completed_v1">>} = E, S)    -> apply_turn_completed(E, S);
apply_event(#{event_type := <<"mentor_turn_completed_v1">>} = E, S)         -> apply_turn_completed(E, S);
apply_event(#{<<"event_type">> := <<"mentor_input_received_v1">>} = E, S)    -> apply_input_received(E, S);
apply_event(#{event_type := <<"mentor_input_received_v1">>} = E, S)         -> apply_input_received(E, S);
apply_event(#{<<"event_type">> := <<"mentor_completed_v1">>} = E, S)         -> apply_completed(E, S);
apply_event(#{event_type := <<"mentor_completed_v1">>} = E, S)              -> apply_completed(E, S);
apply_event(#{<<"event_type">> := <<"mentor_failed_v1">>} = E, S)            -> apply_failed(E, S);
apply_event(#{event_type := <<"mentor_failed_v1">>} = E, S)                 -> apply_failed(E, S);

%% ── Archive (role-agnostic) ──
apply_event(#{<<"event_type">> := <<"agent_session_archived_v1">>} = E, S) -> apply_archived(E, S);
apply_event(#{event_type := <<"agent_session_archived_v1">>} = E, S)      -> apply_archived(E, S);

%% Unknown — ignore
apply_event(_E, S) -> S.

%% --- Apply helpers (shared — lifecycle state changes are role-agnostic) ---

apply_initiated(E, State) ->
    State#agent_session_state{
        session_id = get_value(session_id, E),
        agent_role = get_value(agent_role, E),
        venture_id = get_value(venture_id, E),
        division_id = get_value(division_id, E),
        tier = get_value(tier, E),
        model = get_value(model, E),
        status = evoq_bit_flags:set(0, ?AO_INITIATED),
        initiated_at = get_value(initiated_at, E),
        initiated_by = get_value(initiated_by, E)
    }.

apply_completed(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:set(Status, ?AO_COMPLETED),
        completed_at = get_value(completed_at, E),
        tokens_in = State#agent_session_state.tokens_in + get_value(tokens_in, E, 0),
        tokens_out = State#agent_session_state.tokens_out + get_value(tokens_out, E, 0),
        notation_output = get_value(notation_output, E),
        parsed_terms = get_value(parsed_terms, E, [])
    }.

apply_turn_completed(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:set(Status, ?AO_AWAITING_INPUT),
        turn_count = get_value(turn_number, E, State#agent_session_state.turn_count + 1),
        last_agent_output = get_value(agent_output, E),
        tokens_in = State#agent_session_state.tokens_in + get_value(tokens_in, E, 0),
        tokens_out = State#agent_session_state.tokens_out + get_value(tokens_out, E, 0)
    }.

apply_input_received(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:unset(Status, ?AO_AWAITING_INPUT),
        last_input = get_value(input_content, E),
        last_input_by = get_value(input_by, E)
    }.

apply_failed(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:set(Status, ?AO_FAILED),
        failed_at = get_value(failed_at, E),
        error_reason = get_value(error_reason, E)
    }.

apply_gate_escalated(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:set(Status, ?AO_GATE_PENDING),
        gate_name = get_value(gate_name, E),
        escalated_at = get_value(escalated_at, E)
    }.

apply_gate_passed(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:set(Status, ?AO_GATE_PASSED),
        gate_verdict = <<"passed">>,
        gate_decided_by = get_value(passed_by, E),
        gate_decided_at = get_value(passed_at, E)
    }.

apply_gate_rejected(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:set(Status, ?AO_GATE_REJECTED),
        gate_verdict = <<"rejected">>,
        gate_decided_by = get_value(rejected_by, E),
        gate_decided_at = get_value(rejected_at, E),
        rejection_reason = get_value(rejection_reason, E)
    }.

apply_archived(E, #agent_session_state{status = Status} = State) ->
    State#agent_session_state{
        status = evoq_bit_flags:set(Status, ?AO_ARCHIVED),
        archived_at = get_value(archived_at, E)
    }.

%% --- Internal ---

get_command_type(#{<<"command_type">> := T}) -> T;
get_command_type(#{command_type := T}) when is_binary(T) -> T;
get_command_type(#{command_type := T}) when is_atom(T) -> atom_to_binary(T);
get_command_type(_) -> undefined.

get_role(#{<<"agent_role">> := R}) -> R;
get_role(#{agent_role := R}) when is_binary(R) -> R;
get_role(_) -> undefined.

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
