%%% @doc Tests for agent_orchestration_aggregate.
%%%
%%% Phase 0: Tests state machine guards (rejection paths) and apply_event
%%% state transitions using raw event maps. Execute success paths are
%%% tested per-role as each role is implemented (Phase 1+).
-module(agent_orchestration_aggregate_tests).

-include_lib("eunit/include/eunit.hrl").
-include_lib("orchestrate_agents/include/agent_orchestration_status.hrl").
-include_lib("orchestrate_agents/include/agent_session_state.hrl").

%% ===================================================================
%% Test generators
%% ===================================================================

aggregate_test_() ->
    [
        %% State machine guards (rejection paths — no per-role modules needed)
        {"only initiate allowed on fresh state",        fun exec_non_initiate_on_fresh/0},
        {"archived session rejects all commands",       fun exec_archived_rejects_all/0},
        {"unknown command on initiated returns error",  fun exec_unknown_command/0},
        {"complete blocked on fresh state",             fun exec_complete_on_fresh/0},
        {"fail blocked on fresh state",                 fun exec_fail_on_fresh/0},
        {"escalate blocked on fresh state",             fun exec_escalate_on_fresh/0},
        {"escalate blocked on initiated state",         fun exec_escalate_on_initiated/0},
        {"escalate blocked after fail",                 fun exec_escalate_after_fail/0},
        {"pass gate blocked on completed state",        fun exec_pass_gate_on_completed/0},
        {"reject gate blocked on completed state",      fun exec_reject_gate_on_completed/0},
        {"gate passed only allows archive",             fun exec_gate_passed_archive_only/0},
        {"gate rejected only allows archive",           fun exec_gate_rejected_archive_only/0},
        {"complete_turn blocked on fresh state",        fun exec_complete_turn_on_fresh/0},
        {"complete_turn blocked when awaiting",         fun exec_complete_turn_while_awaiting/0},
        {"receive_input blocked on initiated state",    fun exec_receive_input_on_initiated/0},
        {"complete blocked when awaiting input",        fun exec_complete_while_awaiting/0},

        %% Role dispatch (returns role_not_implemented until roles added)
        {"initiate visionary succeeds",
         {setup, fun setup_llm_mock/0, fun teardown_llm_mock/1,
          fun() -> exec_initiate_visionary() end}},
        {"initiate unknown role returns error",          fun exec_initiate_unknown_role/0},
        {"complete visionary through aggregate",         fun exec_complete_visionary/0},
        {"fail visionary through aggregate",             fun exec_fail_visionary/0},

        %% Archive (role-agnostic — works without per-role modules)
        {"archive succeeds after initiate",             fun exec_archive_after_initiate/0},
        {"archive succeeds after complete",             fun exec_archive_after_complete/0},
        {"archive succeeds after fail",                 fun exec_archive_after_fail/0},
        {"archive blocked on archived state",           fun exec_archive_on_archived/0},

        %% Apply: state transitions (pure — work with raw event maps)
        {"apply initiated sets state",                  fun apply_initiated/0},
        {"apply completed sets tokens and output",      fun apply_completed/0},
        {"apply failed sets error reason",              fun apply_failed/0},
        {"apply archived sets flag",                    fun apply_archived/0},
        {"apply unknown event leaves state unchanged",  fun apply_unknown_event/0},

        %% Apply: binary vs atom keys
        {"apply handles binary keys",                   fun apply_binary_keys/0},
        {"apply handles atom keys",                     fun apply_atom_keys/0},

        %% Apply: gate state transitions
        {"apply gate escalated sets gate_name",         fun apply_gate_escalated/0},
        {"apply gate passed sets verdict",              fun apply_gate_passed/0},
        {"apply gate rejected sets verdict and reason", fun apply_gate_rejected/0},

        %% Apply: conversational turn state transitions
        {"apply turn_completed sets awaiting_input",    fun apply_turn_completed/0},
        {"apply input_received clears awaiting_input",  fun apply_input_received/0},
        {"tokens accumulate across turns",              fun apply_tokens_accumulate/0},

        %% Role modules dispatch table
        {"role_modules returns error for unknown role", fun role_modules_unknown/0},
        {"role_modules returns visionary modules",       fun role_modules_visionary/0}
    ].

%% ===================================================================
%% Fixtures — mock daemon modules not available in plugin test context
%% ===================================================================

setup_llm_mock() ->
    meck:new(manage_providers, [non_strict]),
    meck:expect(manage_providers, list_all_models, fun() ->
        {ok, [#{name => <<"test-model">>, family => <<"test">>,
                parameter_size => <<"7B">>, context_length => 4096,
                format => <<"api">>}]}
    end),
    ok.

teardown_llm_mock(_) ->
    meck:unload(manage_providers).

%% ===================================================================
%% Helpers — build states from raw event maps (no per-role modules)
%% ===================================================================

fresh() -> agent_session_state:new(<<>>).

apply_events(Events) ->
    lists:foldl(fun(E, S) -> agent_orchestration_aggregate:apply(S, E) end, fresh(), Events).

initiated_event() ->
    #{event_type => <<"visionary_initiated_v1">>,
      session_id => <<"vis-TEST01">>,
      agent_role => <<"visionary">>,
      venture_id => <<"v-test-1">>,
      tier => <<"T1">>,
      model => <<"claude-sonnet-4-20250514">>,
      initiated_by => <<"system:pm">>,
      initiated_at => 1000}.

%% Build initiated state by directly calling apply_initiated
%% (bypasses apply_event which needs per-role event type matching)
initiated_state() ->
    agent_orchestration_aggregate:apply(fresh(), initiated_event()).

completed_event() ->
    #{event_type => <<"visionary_completed_v1">>,
      session_id => <<"vis-TEST01">>,
      agent_role => <<"visionary">>,
      venture_id => <<"v-test-1">>,
      notation_output => <<"DIV billing \"Invoice processing\"">>,
      parsed_terms => [{division, <<"billing">>, <<"Invoice processing">>}],
      tokens_in => 500,
      tokens_out => 1200,
      completed_at => 2000}.

completed_state() ->
    apply_events([initiated_event(), completed_event()]).

failed_event() ->
    #{event_type => <<"visionary_failed_v1">>,
      session_id => <<"vis-TEST01">>,
      agent_role => <<"visionary">>,
      venture_id => <<"v-test-1">>,
      error_reason => <<"timeout">>,
      failed_at => 3000}.

failed_state() ->
    apply_events([initiated_event(), failed_event()]).

archived_state() ->
    apply_events([
        initiated_event(),
        #{event_type => <<"agent_session_archived_v1">>,
          session_id => <<"vis-TEST01">>,
          archived_by => <<"user@test">>,
          archived_at => 4000}
    ]).

gate_pending_state() ->
    apply_events([
        initiated_event(),
        completed_event(),
        #{event_type => <<"vision_gate_escalated_v1">>,
          session_id => <<"vis-TEST01">>,
          agent_role => <<"visionary">>,
          venture_id => <<"v-test-1">>,
          gate_name => <<"vision_gate">>,
          escalated_at => 5000}
    ]).

gate_passed_state() ->
    apply_events([
        initiated_event(),
        completed_event(),
        #{event_type => <<"vision_gate_escalated_v1">>,
          session_id => <<"vis-TEST01">>,
          agent_role => <<"visionary">>,
          venture_id => <<"v-test-1">>,
          gate_name => <<"vision_gate">>,
          escalated_at => 5000},
        #{event_type => <<"vision_gate_passed_v1">>,
          session_id => <<"vis-TEST01">>,
          agent_role => <<"visionary">>,
          venture_id => <<"v-test-1">>,
          gate_name => <<"vision_gate">>,
          passed_by => <<"reviewer@test">>,
          passed_at => 6000}
    ]).

gate_rejected_state() ->
    apply_events([
        initiated_event(),
        completed_event(),
        #{event_type => <<"vision_gate_escalated_v1">>,
          session_id => <<"vis-TEST01">>,
          agent_role => <<"visionary">>,
          venture_id => <<"v-test-1">>,
          gate_name => <<"vision_gate">>,
          escalated_at => 5000},
        #{event_type => <<"vision_gate_rejected_v1">>,
          session_id => <<"vis-TEST01">>,
          agent_role => <<"visionary">>,
          venture_id => <<"v-test-1">>,
          gate_name => <<"vision_gate">>,
          rejected_by => <<"reviewer@test">>,
          rejection_reason => <<"too vague">>,
          rejected_at => 6000}
    ]).

turn_completed_event(TurnNum) ->
    #{event_type => <<"coordinator_turn_completed_v1">>,
      session_id => <<"crd-TEST01">>,
      agent_role => <<"coordinator">>,
      venture_id => <<"v-test-1">>,
      agent_output => <<"What problem does your venture solve?">>,
      turn_number => TurnNum,
      tokens_in => 100,
      tokens_out => 200,
      completed_at => 1500}.

input_received_event(TurnNum) ->
    #{event_type => <<"coordinator_input_received_v1">>,
      session_id => <<"crd-TEST01">>,
      agent_role => <<"coordinator">>,
      venture_id => <<"v-test-1">>,
      input_content => <<"We solve invoice processing pain">>,
      input_by => <<"user@test">>,
      turn_number => TurnNum,
      received_at => 1600}.

awaiting_input_state() ->
    Initiated = agent_orchestration_aggregate:apply(
        fresh(),
        #{event_type => <<"coordinator_initiated_v1">>,
          session_id => <<"crd-TEST01">>,
          agent_role => <<"coordinator">>,
          venture_id => <<"v-test-1">>,
          tier => <<"T2">>,
          model => <<"claude-sonnet-4-20250514">>,
          initiated_by => <<"system:pm">>,
          initiated_at => 1000}),
    agent_orchestration_aggregate:apply(Initiated, turn_completed_event(1)).

%% Command payloads for state guard tests
complete_cmd() ->
    #{command_type => <<"complete_agent">>,
      <<"session_id">> => <<"vis-TEST01">>,
      <<"agent_role">> => <<"visionary">>,
      <<"venture_id">> => <<"v-test-1">>}.

fail_cmd() ->
    #{command_type => <<"fail_agent">>,
      <<"session_id">> => <<"vis-TEST01">>,
      <<"agent_role">> => <<"visionary">>,
      <<"venture_id">> => <<"v-test-1">>,
      <<"error_reason">> => <<"provider_down">>}.

archive_cmd() ->
    #{command_type => <<"archive_agent_session">>,
      <<"session_id">> => <<"vis-TEST01">>,
      <<"archived_by">> => <<"user@test">>}.

escalate_cmd() ->
    #{command_type => <<"escalate_to_gate">>,
      <<"session_id">> => <<"vis-TEST01">>,
      <<"gate_name">> => <<"vision_gate">>}.

pass_gate_cmd() ->
    #{command_type => <<"pass_gate">>,
      <<"session_id">> => <<"vis-TEST01">>,
      <<"passed_by">> => <<"reviewer@test">>}.

reject_gate_cmd() ->
    #{command_type => <<"reject_gate">>,
      <<"session_id">> => <<"vis-TEST01">>,
      <<"rejected_by">> => <<"reviewer@test">>,
      <<"rejection_reason">> => <<"vision too vague">>}.

complete_turn_cmd() ->
    #{command_type => <<"complete_agent_turn">>,
      <<"session_id">> => <<"crd-TEST01">>,
      <<"agent_role">> => <<"coordinator">>,
      <<"venture_id">> => <<"v-test-1">>,
      <<"agent_output">> => <<"What problem does your venture solve?">>,
      <<"tokens_in">> => 100,
      <<"tokens_out">> => 200}.

receive_input_cmd() ->
    #{command_type => <<"receive_agent_input">>,
      <<"session_id">> => <<"crd-TEST01">>,
      <<"input_content">> => <<"We solve invoice processing pain">>,
      <<"input_by">> => <<"user@test">>}.

%% ===================================================================
%% State machine guards (rejection paths)
%% ===================================================================

exec_non_initiate_on_fresh() ->
    ?assertEqual({error, session_not_initiated},
                 agent_orchestration_aggregate:execute(fresh(), complete_cmd())).

exec_archived_rejects_all() ->
    ?assertEqual({error, session_archived},
                 agent_orchestration_aggregate:execute(archived_state(), complete_cmd())).

exec_unknown_command() ->
    Cmd = #{command_type => <<"do_something_weird">>},
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(initiated_state(), Cmd)).

exec_complete_on_fresh() ->
    ?assertEqual({error, session_not_initiated},
                 agent_orchestration_aggregate:execute(fresh(), complete_cmd())).

exec_fail_on_fresh() ->
    ?assertEqual({error, session_not_initiated},
                 agent_orchestration_aggregate:execute(fresh(), fail_cmd())).

exec_escalate_on_fresh() ->
    ?assertEqual({error, session_not_initiated},
                 agent_orchestration_aggregate:execute(fresh(), escalate_cmd())).

exec_escalate_on_initiated() ->
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(initiated_state(), escalate_cmd())).

exec_escalate_after_fail() ->
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(failed_state(), escalate_cmd())).

exec_pass_gate_on_completed() ->
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(completed_state(), pass_gate_cmd())).

exec_reject_gate_on_completed() ->
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(completed_state(), reject_gate_cmd())).

exec_gate_passed_archive_only() ->
    %% Cannot complete after gate passed
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(gate_passed_state(), complete_cmd())).

exec_gate_rejected_archive_only() ->
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(gate_rejected_state(), complete_cmd())).

exec_complete_turn_on_fresh() ->
    ?assertEqual({error, session_not_initiated},
                 agent_orchestration_aggregate:execute(fresh(), complete_turn_cmd())).

exec_complete_turn_while_awaiting() ->
    ?assertEqual({error, awaiting_input},
                 agent_orchestration_aggregate:execute(awaiting_input_state(), complete_turn_cmd())).

exec_receive_input_on_initiated() ->
    ?assertEqual({error, unknown_command},
                 agent_orchestration_aggregate:execute(initiated_state(), receive_input_cmd())).

exec_complete_while_awaiting() ->
    ?assertEqual({error, awaiting_input},
                 agent_orchestration_aggregate:execute(awaiting_input_state(), complete_cmd())).

%% ===================================================================
%% Role dispatch (no roles implemented yet)
%% ===================================================================

exec_initiate_visionary() ->
    Cmd = #{command_type => <<"initiate_agent">>,
            <<"agent_role">> => <<"visionary">>,
            <<"venture_id">> => <<"v-1">>,
            <<"session_id">> => <<"vis-1">>},
    {ok, [Event]} = agent_orchestration_aggregate:execute(fresh(), Cmd),
    ?assertEqual(visionary_initiated_v1, maps:get(event_type, Event)),
    ?assertEqual(<<"vis-1">>, maps:get(session_id, Event)),
    ?assertEqual(<<"visionary">>, maps:get(agent_role, Event)).

exec_initiate_unknown_role() ->
    Cmd = #{command_type => <<"initiate_agent">>,
            <<"agent_role">> => <<"unknown_role">>,
            <<"venture_id">> => <<"v-1">>,
            <<"session_id">> => <<"x-1">>},
    ?assertEqual({error, role_not_implemented},
                 agent_orchestration_aggregate:execute(fresh(), Cmd)).

%% ===================================================================
%% Execute: Complete/Fail visionary (full aggregate path)
%% ===================================================================

exec_complete_visionary() ->
    CompleteCmd = #{command_type => <<"complete_agent">>,
                   <<"agent_role">> => <<"visionary">>,
                   <<"session_id">> => <<"vis-TEST01">>,
                   <<"notation_output">> => <<"DIV billing">>,
                   <<"parsed_terms">> => [],
                   <<"tokens_in">> => 100,
                   <<"tokens_out">> => 200},
    {ok, [Event]} = agent_orchestration_aggregate:execute(initiated_state(), CompleteCmd),
    ?assertEqual(visionary_completed_v1, maps:get(event_type, Event)),
    ?assertEqual(<<"vis-TEST01">>, maps:get(session_id, Event)),
    %% Event echoes aggregate state
    ?assertEqual(<<"v-test-1">>, maps:get(venture_id, Event)),
    ?assertEqual(<<"T1">>, maps:get(tier, Event)).

exec_fail_visionary() ->
    FailCmd = #{command_type => <<"fail_agent">>,
                <<"agent_role">> => <<"visionary">>,
                <<"session_id">> => <<"vis-TEST01">>,
                <<"error_reason">> => <<"llm_timeout">>,
                <<"tokens_in">> => 50,
                <<"tokens_out">> => 0},
    {ok, [Event]} = agent_orchestration_aggregate:execute(initiated_state(), FailCmd),
    ?assertEqual(visionary_failed_v1, maps:get(event_type, Event)),
    ?assertEqual(<<"vis-TEST01">>, maps:get(session_id, Event)),
    ?assertEqual(<<"llm_timeout">>, maps:get(error_reason, Event)),
    %% Event echoes aggregate state
    ?assertEqual(<<"v-test-1">>, maps:get(venture_id, Event)).

%% ===================================================================
%% Execute: Archive (role-agnostic)
%% ===================================================================

exec_archive_after_initiate() ->
    {ok, [Event]} = agent_orchestration_aggregate:execute(initiated_state(), archive_cmd()),
    ?assertEqual(agent_session_archived_v1, maps:get(event_type, Event)).

exec_archive_after_complete() ->
    {ok, [Event]} = agent_orchestration_aggregate:execute(completed_state(), archive_cmd()),
    ?assertEqual(agent_session_archived_v1, maps:get(event_type, Event)).

exec_archive_after_fail() ->
    {ok, [Event]} = agent_orchestration_aggregate:execute(failed_state(), archive_cmd()),
    ?assertEqual(agent_session_archived_v1, maps:get(event_type, Event)).

exec_archive_on_archived() ->
    ?assertEqual({error, session_archived},
                 agent_orchestration_aggregate:execute(archived_state(), archive_cmd())).

%% ===================================================================
%% Apply: State Transitions
%% ===================================================================

apply_initiated() ->
    State = initiated_state(),
    ?assertEqual(<<"vis-TEST01">>, State#agent_session_state.session_id),
    ?assertEqual(<<"visionary">>, State#agent_session_state.agent_role),
    ?assertEqual(<<"v-test-1">>, State#agent_session_state.venture_id),
    ?assertEqual(<<"T1">>, State#agent_session_state.tier),
    ?assertEqual(<<"claude-sonnet-4-20250514">>, State#agent_session_state.model),
    ?assertEqual(<<"system:pm">>, State#agent_session_state.initiated_by),
    ?assertEqual(1000, State#agent_session_state.initiated_at),
    ?assert(State#agent_session_state.status band ?AO_INITIATED =/= 0).

apply_completed() ->
    State = completed_state(),
    ?assert(State#agent_session_state.status band ?AO_COMPLETED =/= 0),
    ?assertEqual(2000, State#agent_session_state.completed_at),
    ?assertEqual(500, State#agent_session_state.tokens_in),
    ?assertEqual(1200, State#agent_session_state.tokens_out),
    ?assertEqual(<<"DIV billing \"Invoice processing\"">>, State#agent_session_state.notation_output),
    ?assertEqual([{division, <<"billing">>, <<"Invoice processing">>}],
                 State#agent_session_state.parsed_terms).

apply_failed() ->
    State = failed_state(),
    ?assert(State#agent_session_state.status band ?AO_FAILED =/= 0),
    ?assertEqual(3000, State#agent_session_state.failed_at),
    ?assertEqual(<<"timeout">>, State#agent_session_state.error_reason).

apply_archived() ->
    State = archived_state(),
    ?assert(State#agent_session_state.status band ?AO_ARCHIVED =/= 0),
    ?assertEqual(4000, State#agent_session_state.archived_at).

apply_unknown_event() ->
    Event = #{event_type => <<"something_weird_v1">>},
    State = initiated_state(),
    ?assertEqual(State, agent_orchestration_aggregate:apply(State, Event)).

%% ===================================================================
%% Apply: binary vs atom keys
%% ===================================================================

apply_binary_keys() ->
    Event = #{event_type => <<"visionary_initiated_v1">>,
              <<"session_id">> => <<"vis-BIN">>,
              <<"agent_role">> => <<"visionary">>,
              <<"venture_id">> => <<"v-bin">>,
              <<"tier">> => <<"T2">>,
              <<"model">> => <<"test-model">>,
              <<"initiated_at">> => 9000},
    State = agent_orchestration_aggregate:apply(fresh(), Event),
    ?assertEqual(<<"vis-BIN">>, State#agent_session_state.session_id),
    ?assertEqual(<<"v-bin">>, State#agent_session_state.venture_id),
    ?assertEqual(<<"T2">>, State#agent_session_state.tier).

apply_atom_keys() ->
    Event = #{event_type => <<"visionary_initiated_v1">>,
              session_id => <<"vis-ATOM">>,
              agent_role => <<"visionary">>,
              venture_id => <<"v-atom">>,
              tier => <<"T3">>,
              model => <<"atom-model">>,
              initiated_at => 8000},
    State = agent_orchestration_aggregate:apply(fresh(), Event),
    ?assertEqual(<<"vis-ATOM">>, State#agent_session_state.session_id),
    ?assertEqual(<<"v-atom">>, State#agent_session_state.venture_id),
    ?assertEqual(<<"T3">>, State#agent_session_state.tier).

%% ===================================================================
%% Apply: Gate State Transitions
%% ===================================================================

apply_gate_escalated() ->
    State = gate_pending_state(),
    ?assert(State#agent_session_state.status band ?AO_GATE_PENDING =/= 0),
    ?assertEqual(<<"vision_gate">>, State#agent_session_state.gate_name),
    ?assertEqual(5000, State#agent_session_state.escalated_at).

apply_gate_passed() ->
    State = gate_passed_state(),
    ?assert(State#agent_session_state.status band ?AO_GATE_PASSED =/= 0),
    ?assertEqual(<<"passed">>, State#agent_session_state.gate_verdict),
    ?assertEqual(<<"reviewer@test">>, State#agent_session_state.gate_decided_by),
    ?assertEqual(6000, State#agent_session_state.gate_decided_at).

apply_gate_rejected() ->
    State = gate_rejected_state(),
    ?assert(State#agent_session_state.status band ?AO_GATE_REJECTED =/= 0),
    ?assertEqual(<<"rejected">>, State#agent_session_state.gate_verdict),
    ?assertEqual(<<"reviewer@test">>, State#agent_session_state.gate_decided_by),
    ?assertEqual(6000, State#agent_session_state.gate_decided_at),
    ?assertEqual(<<"too vague">>, State#agent_session_state.rejection_reason).

%% ===================================================================
%% Apply: Conversational Turn State Transitions
%% ===================================================================

apply_turn_completed() ->
    State = awaiting_input_state(),
    ?assert(State#agent_session_state.status band ?AO_AWAITING_INPUT =/= 0),
    ?assert(State#agent_session_state.status band ?AO_INITIATED =/= 0),
    ?assertEqual(1, State#agent_session_state.turn_count),
    ?assertEqual(<<"What problem does your venture solve?">>, State#agent_session_state.last_agent_output),
    ?assertEqual(100, State#agent_session_state.tokens_in),
    ?assertEqual(200, State#agent_session_state.tokens_out).

apply_input_received() ->
    Initiated = agent_orchestration_aggregate:apply(
        fresh(),
        #{event_type => <<"coordinator_initiated_v1">>,
          session_id => <<"crd-TEST01">>,
          agent_role => <<"coordinator">>,
          venture_id => <<"v-test-1">>,
          tier => <<"T2">>,
          model => <<"claude-sonnet-4-20250514">>,
          initiated_by => <<"system:pm">>,
          initiated_at => 1000}),
    TurnDone = agent_orchestration_aggregate:apply(Initiated, turn_completed_event(1)),
    State = agent_orchestration_aggregate:apply(TurnDone, input_received_event(1)),
    %% AWAITING_INPUT should be cleared
    ?assert(State#agent_session_state.status band ?AO_AWAITING_INPUT =:= 0),
    %% INITIATED should still be set
    ?assert(State#agent_session_state.status band ?AO_INITIATED =/= 0),
    ?assertEqual(<<"We solve invoice processing pain">>, State#agent_session_state.last_input),
    ?assertEqual(<<"user@test">>, State#agent_session_state.last_input_by).

apply_tokens_accumulate() ->
    Initiated = agent_orchestration_aggregate:apply(
        fresh(),
        #{event_type => <<"coordinator_initiated_v1">>,
          session_id => <<"crd-TEST01">>,
          agent_role => <<"coordinator">>,
          venture_id => <<"v-test-1">>,
          tier => <<"T2">>,
          model => <<"claude-sonnet-4-20250514">>,
          initiated_by => <<"system:pm">>,
          initiated_at => 1000}),
    %% Two turns then complete — tokens should sum
    State = lists:foldl(
        fun(E, S) -> agent_orchestration_aggregate:apply(S, E) end,
        Initiated,
        [turn_completed_event(1),    %% +100 in, +200 out
         input_received_event(1),
         turn_completed_event(2),    %% +100 in, +200 out
         input_received_event(2),
         completed_event()           %% +500 in, +1200 out
        ]),
    ?assertEqual(100 + 100 + 500, State#agent_session_state.tokens_in),
    ?assertEqual(200 + 200 + 1200, State#agent_session_state.tokens_out),
    ?assertEqual(2, State#agent_session_state.turn_count).

%% ===================================================================
%% Role modules dispatch table
%% ===================================================================

role_modules_unknown() ->
    ?assertEqual({error, role_not_implemented},
                 agent_orchestration_aggregate:role_modules(initiate, <<"unknown_role">>)),
    ?assertEqual({error, role_not_implemented},
                 agent_orchestration_aggregate:role_modules(complete, <<"unknown_role">>)).

role_modules_visionary() ->
    {ok, CmdMod, HandlerMod, _ToMapFn} =
        agent_orchestration_aggregate:role_modules(initiate, <<"visionary">>),
    ?assertEqual(initiate_visionary_v1, CmdMod),
    ?assertEqual(maybe_initiate_visionary, HandlerMod),
    {ok, CmdMod2, HandlerMod2, _} =
        agent_orchestration_aggregate:role_modules(complete, <<"visionary">>),
    ?assertEqual(complete_visionary_v1, CmdMod2),
    ?assertEqual(maybe_complete_visionary, HandlerMod2),
    {ok, CmdMod3, HandlerMod3, _} =
        agent_orchestration_aggregate:role_modules(fail, <<"visionary">>),
    ?assertEqual(fail_visionary_v1, CmdMod3),
    ?assertEqual(maybe_fail_visionary, HandlerMod3).
