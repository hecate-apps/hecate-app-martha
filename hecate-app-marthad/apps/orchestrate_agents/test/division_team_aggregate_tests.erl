%%% @doc Tests for division_team_aggregate (execute/2 + apply_event/2).
%%%
%%% Pure logic tests — no external deps.
%%% Tests all command types through the aggregate, state guards,
%%% and bit flag transitions.
-module(division_team_aggregate_tests).

-include_lib("eunit/include/eunit.hrl").
-include_lib("orchestrate_agents/include/division_team_status.hrl").
-include_lib("orchestrate_agents/include/division_team_state.hrl").

%% ===================================================================
%% Test generators
%% ===================================================================

aggregate_test_() ->
    [
        %% Execute: form_team
        {"form_team on fresh state succeeds",               fun exec_form_ok/0},
        {"only form_team allowed on fresh state",           fun exec_non_form_on_fresh/0},

        %% Execute: assign_agent_to_team
        {"assign on formed state succeeds",                 fun exec_assign_on_formed/0},
        {"assign on active state succeeds",                 fun exec_assign_on_active/0},
        {"assign on fresh state fails",                     fun exec_assign_on_fresh/0},

        %% Execute: activate_team
        {"activate on formed state succeeds",               fun exec_activate_on_formed/0},
        {"activate on active state fails",                  fun exec_activate_on_active/0},

        %% Execute: disband_team
        {"disband on formed state succeeds",                fun exec_disband_on_formed/0},
        {"disband on active state succeeds",                fun exec_disband_on_active/0},
        {"disband on disbanded state fails",                fun exec_disband_on_disbanded/0},

        %% Execute: disbanded rejects all
        {"disbanded rejects form_team",                     fun exec_disbanded_rejects_form/0},
        {"disbanded rejects assign",                        fun exec_disbanded_rejects_assign/0},

        %% Apply: form_team
        {"apply team_formed sets state",                    fun apply_formed/0},

        %% Apply: assign_agent_to_team
        {"apply assigned accumulates members",              fun apply_assigned/0},

        %% Apply: activate_team
        {"apply activated sets active flag",                fun apply_activated/0},

        %% Apply: disband_team
        {"apply disbanded sets disbanded flag",             fun apply_disbanded/0},

        %% Full lifecycle
        {"full lifecycle: form -> assign -> activate -> disband", fun full_lifecycle/0}
    ].

%% ===================================================================
%% Command handler tests
%% ===================================================================

handler_test_() ->
    [
        %% form_team_v1
        {"form_team_v1 new/1 ok",                          fun cmd_form_new/0},
        {"form_team_v1 from_map binary keys",               fun cmd_form_from_map/0},
        {"form_team_v1 validate missing division",          fun cmd_form_validate_bad_div/0},

        %% assign_agent_to_team_v1
        {"assign_agent_to_team_v1 new/1 ok",               fun cmd_assign_new/0},
        {"assign rejects duplicate session",                fun handler_assign_duplicate/0},

        %% activate_team_v1
        {"activate_team_v1 new/1 ok",                      fun cmd_activate_new/0},
        {"activate rejects empty team",                     fun handler_activate_empty/0},

        %% disband_team_v1
        {"disband_team_v1 new/1 ok",                       fun cmd_disband_new/0},

        %% Events
        {"team_formed_v1 to_map has event_type",            fun event_formed_type/0},
        {"agent_assigned_to_team_v1 to_map has event_type", fun event_assigned_type/0},
        {"team_activated_v1 to_map has event_type",         fun event_activated_type/0},
        {"team_disbanded_v1 to_map has event_type",         fun event_disbanded_type/0}
    ].

%% ===================================================================
%% Execute tests
%% ===================================================================

exec_form_ok() ->
    State = division_team_aggregate:initial_state(),
    Cmd = form_team_cmd(),
    {ok, Events} = division_team_aggregate:execute(State, Cmd),
    ?assertEqual(1, length(Events)),
    [E] = Events,
    ?assertEqual(<<"team_formed_v1">>, maps:get(<<"event_type">>, E)).

exec_non_form_on_fresh() ->
    State = division_team_aggregate:initial_state(),
    Cmd = assign_cmd(),
    ?assertEqual({error, team_not_formed}, division_team_aggregate:execute(State, Cmd)).

exec_assign_on_formed() ->
    State = formed_state(),
    Cmd = assign_cmd(),
    {ok, Events} = division_team_aggregate:execute(State, Cmd),
    ?assertEqual(1, length(Events)),
    [E] = Events,
    ?assertEqual(<<"agent_assigned_to_team_v1">>, maps:get(<<"event_type">>, E)).

exec_assign_on_active() ->
    State = active_state(),
    Cmd = #{<<"command_type">> => <<"assign_agent_to_team">>,
            <<"division_id">> => <<"div-001">>,
            <<"agent_role">> => <<"explorer">>,
            <<"session_id">> => <<"sess-exp">>},
    {ok, Events} = division_team_aggregate:execute(State, Cmd),
    ?assertEqual(1, length(Events)).

exec_assign_on_fresh() ->
    State = division_team_aggregate:initial_state(),
    Cmd = assign_cmd(),
    ?assertEqual({error, team_not_formed}, division_team_aggregate:execute(State, Cmd)).

exec_activate_on_formed() ->
    State = formed_with_members_state(),
    Cmd = activate_cmd(),
    {ok, Events} = division_team_aggregate:execute(State, Cmd),
    ?assertEqual(1, length(Events)),
    [E] = Events,
    ?assertEqual(<<"team_activated_v1">>, maps:get(<<"event_type">>, E)).

exec_activate_on_active() ->
    State = active_state(),
    Cmd = activate_cmd(),
    ?assertEqual({error, unknown_command}, division_team_aggregate:execute(State, Cmd)).

exec_disband_on_formed() ->
    State = formed_state(),
    Cmd = disband_cmd(),
    {ok, Events} = division_team_aggregate:execute(State, Cmd),
    ?assertEqual(1, length(Events)),
    [E] = Events,
    ?assertEqual(<<"team_disbanded_v1">>, maps:get(<<"event_type">>, E)).

exec_disband_on_active() ->
    State = active_state(),
    Cmd = disband_cmd(),
    {ok, Events} = division_team_aggregate:execute(State, Cmd),
    ?assertEqual(1, length(Events)).

exec_disband_on_disbanded() ->
    State = disbanded_state(),
    Cmd = disband_cmd(),
    ?assertEqual({error, team_disbanded}, division_team_aggregate:execute(State, Cmd)).

exec_disbanded_rejects_form() ->
    State = disbanded_state(),
    Cmd = form_team_cmd(),
    ?assertEqual({error, team_disbanded}, division_team_aggregate:execute(State, Cmd)).

exec_disbanded_rejects_assign() ->
    State = disbanded_state(),
    Cmd = assign_cmd(),
    ?assertEqual({error, team_disbanded}, division_team_aggregate:execute(State, Cmd)).

%% ===================================================================
%% Apply tests
%% ===================================================================

apply_formed() ->
    S0 = division_team_aggregate:initial_state(),
    E = formed_event(),
    S1 = division_team_aggregate:apply(S0, E),
    ?assertEqual(<<"div-001">>, S1#division_team_state.division_id),
    ?assertEqual(<<"ven-001">>, S1#division_team_state.venture_id),
    ?assertEqual([<<"visionary">>, <<"explorer">>], S1#division_team_state.planned_roles),
    ?assertNotEqual(0, S1#division_team_state.status band ?DT_FORMED).

apply_assigned() ->
    S0 = formed_state(),
    E1 = assigned_event(<<"visionary">>, <<"sess-1">>),
    S1 = division_team_aggregate:apply(S0, E1),
    ?assertEqual(1, length(S1#division_team_state.members)),

    E2 = assigned_event(<<"explorer">>, <<"sess-2">>),
    S2 = division_team_aggregate:apply(S1, E2),
    ?assertEqual(2, length(S2#division_team_state.members)).

apply_activated() ->
    S0 = formed_with_members_state(),
    E = #{<<"event_type">> => <<"team_activated_v1">>,
          <<"activated_at">> => 1234567890},
    S1 = division_team_aggregate:apply(S0, E),
    ?assertNotEqual(0, S1#division_team_state.status band ?DT_ACTIVE),
    ?assertEqual(1234567890, S1#division_team_state.activated_at).

apply_disbanded() ->
    S0 = active_state(),
    E = #{<<"event_type">> => <<"team_disbanded_v1">>,
          <<"disbanded_at">> => 9999999999},
    S1 = division_team_aggregate:apply(S0, E),
    ?assertNotEqual(0, S1#division_team_state.status band ?DT_DISBANDED),
    ?assertEqual(9999999999, S1#division_team_state.disbanded_at).

%% ===================================================================
%% Full lifecycle
%% ===================================================================

full_lifecycle() ->
    S0 = division_team_aggregate:initial_state(),

    %% 1. Form
    {ok, [E1]} = division_team_aggregate:execute(S0, form_team_cmd()),
    S1 = division_team_aggregate:apply(S0, E1),
    ?assertNotEqual(0, S1#division_team_state.status band ?DT_FORMED),

    %% 2. Assign visionary
    {ok, [E2]} = division_team_aggregate:execute(S1, assign_cmd()),
    S2 = division_team_aggregate:apply(S1, E2),
    ?assertEqual(1, length(S2#division_team_state.members)),

    %% 3. Assign explorer
    AssignExp = #{<<"command_type">> => <<"assign_agent_to_team">>,
                  <<"division_id">> => <<"div-001">>,
                  <<"agent_role">> => <<"explorer">>,
                  <<"session_id">> => <<"sess-exp">>},
    {ok, [E3]} = division_team_aggregate:execute(S2, AssignExp),
    S3 = division_team_aggregate:apply(S2, E3),
    ?assertEqual(2, length(S3#division_team_state.members)),

    %% 4. Activate
    {ok, [E4]} = division_team_aggregate:execute(S3, activate_cmd()),
    S4 = division_team_aggregate:apply(S3, E4),
    ?assertNotEqual(0, S4#division_team_state.status band ?DT_ACTIVE),

    %% 5. Disband
    {ok, [E5]} = division_team_aggregate:execute(S4, disband_cmd()),
    S5 = division_team_aggregate:apply(S4, E5),
    ?assertNotEqual(0, S5#division_team_state.status band ?DT_DISBANDED),

    %% 6. Verify disbanded rejects everything
    ?assertEqual({error, team_disbanded}, division_team_aggregate:execute(S5, assign_cmd())),
    ?assertEqual({error, team_disbanded}, division_team_aggregate:execute(S5, activate_cmd())),
    ?assertEqual({error, team_disbanded}, division_team_aggregate:execute(S5, disband_cmd())).

%% ===================================================================
%% Command/event handler tests
%% ===================================================================

cmd_form_new() ->
    {ok, Cmd} = form_team_v1:new(#{
        division_id => <<"div-001">>,
        venture_id => <<"ven-001">>,
        planned_roles => [<<"visionary">>]
    }),
    ?assertEqual(<<"div-001">>, form_team_v1:get_division_id(Cmd)),
    ?assertEqual([<<"visionary">>], form_team_v1:get_planned_roles(Cmd)).

cmd_form_from_map() ->
    {ok, Cmd} = form_team_v1:from_map(#{
        <<"division_id">> => <<"div-001">>,
        <<"venture_id">> => <<"ven-001">>
    }),
    ?assertEqual(<<"div-001">>, form_team_v1:get_division_id(Cmd)).

cmd_form_validate_bad_div() ->
    {ok, Cmd} = form_team_v1:new(#{division_id => <<>>, venture_id => <<"ven-001">>}),
    ?assertEqual({error, invalid_division_id}, form_team_v1:validate(Cmd)).

cmd_assign_new() ->
    {ok, Cmd} = assign_agent_to_team_v1:new(#{
        division_id => <<"div-001">>,
        agent_role => <<"visionary">>,
        session_id => <<"sess-vis">>
    }),
    ?assertEqual(<<"visionary">>, assign_agent_to_team_v1:get_agent_role(Cmd)).

handler_assign_duplicate() ->
    {ok, Cmd} = assign_agent_to_team_v1:new(#{
        division_id => <<"div-001">>,
        agent_role => <<"visionary">>,
        session_id => <<"sess-vis">>
    }),
    State = #division_team_state{
        members = [#{agent_role => <<"visionary">>, session_id => <<"sess-vis">>}]
    },
    ?assertEqual({error, agent_already_assigned}, maybe_assign_agent_to_team:handle(Cmd, State)).

cmd_activate_new() ->
    {ok, Cmd} = activate_team_v1:new(#{division_id => <<"div-001">>}),
    ?assertEqual(<<"div-001">>, activate_team_v1:get_division_id(Cmd)).

handler_activate_empty() ->
    {ok, Cmd} = activate_team_v1:new(#{division_id => <<"div-001">>}),
    State = #division_team_state{members = []},
    ?assertEqual({error, no_members}, maybe_activate_team:handle(Cmd, State)).

cmd_disband_new() ->
    {ok, Cmd} = disband_team_v1:new(#{division_id => <<"div-001">>, reason => <<"done">>}),
    ?assertEqual(<<"done">>, disband_team_v1:get_reason(Cmd)).

event_formed_type() ->
    E = team_formed_v1:new(#{division_id => <<"d">>, venture_id => <<"v">>}),
    M = team_formed_v1:to_map(E),
    ?assertEqual(<<"team_formed_v1">>, maps:get(<<"event_type">>, M)).

event_assigned_type() ->
    E = agent_assigned_to_team_v1:new(#{division_id => <<"d">>, agent_role => <<"r">>, session_id => <<"s">>}),
    M = agent_assigned_to_team_v1:to_map(E),
    ?assertEqual(<<"agent_assigned_to_team_v1">>, maps:get(<<"event_type">>, M)).

event_activated_type() ->
    E = team_activated_v1:new(#{division_id => <<"d">>}),
    M = team_activated_v1:to_map(E),
    ?assertEqual(<<"team_activated_v1">>, maps:get(<<"event_type">>, M)).

event_disbanded_type() ->
    E = team_disbanded_v1:new(#{division_id => <<"d">>}),
    M = team_disbanded_v1:to_map(E),
    ?assertEqual(<<"team_disbanded_v1">>, maps:get(<<"event_type">>, M)).

%% ===================================================================
%% Helpers
%% ===================================================================

form_team_cmd() ->
    #{<<"command_type">> => <<"form_team">>,
      <<"division_id">> => <<"div-001">>,
      <<"venture_id">> => <<"ven-001">>,
      <<"planned_roles">> => [<<"visionary">>, <<"explorer">>],
      <<"formed_by">> => <<"system">>}.

assign_cmd() ->
    #{<<"command_type">> => <<"assign_agent_to_team">>,
      <<"division_id">> => <<"div-001">>,
      <<"agent_role">> => <<"visionary">>,
      <<"session_id">> => <<"sess-vis">>}.

activate_cmd() ->
    #{<<"command_type">> => <<"activate_team">>,
      <<"division_id">> => <<"div-001">>}.

disband_cmd() ->
    #{<<"command_type">> => <<"disband_team">>,
      <<"division_id">> => <<"div-001">>,
      <<"reason">> => <<"completed">>}.

formed_event() ->
    #{<<"event_type">> => <<"team_formed_v1">>,
      <<"division_id">> => <<"div-001">>,
      <<"venture_id">> => <<"ven-001">>,
      <<"planned_roles">> => [<<"visionary">>, <<"explorer">>],
      <<"formed_by">> => <<"system">>,
      <<"formed_at">> => 1000000000}.

assigned_event(Role, SessId) ->
    #{<<"event_type">> => <<"agent_assigned_to_team_v1">>,
      <<"agent_role">> => Role,
      <<"session_id">> => SessId,
      <<"assigned_at">> => 1000000001}.

formed_state() ->
    #division_team_state{
        division_id = <<"div-001">>,
        venture_id = <<"ven-001">>,
        status = evoq_bit_flags:set(0, ?DT_FORMED),
        planned_roles = [<<"visionary">>, <<"explorer">>],
        formed_at = 1000000000,
        formed_by = <<"system">>
    }.

formed_with_members_state() ->
    S = formed_state(),
    S#division_team_state{
        members = [#{agent_role => <<"visionary">>, session_id => <<"sess-vis">>}]
    }.

active_state() ->
    S = formed_with_members_state(),
    Status = evoq_bit_flags:set(S#division_team_state.status, ?DT_ACTIVE),
    S#division_team_state{status = Status, activated_at = 2000000000}.

disbanded_state() ->
    S = active_state(),
    Status = evoq_bit_flags:set(S#division_team_state.status, ?DT_DISBANDED),
    S#division_team_state{status = Status, disbanded_at = 3000000000}.
