%%% @doc Tests for martha_notation parser.
%%%
%%% Pure function tests — no external deps.
%%% Tests parsing of all 21 keyword types + edge cases.
-module(martha_notation_tests).

-include_lib("eunit/include/eunit.hrl").

%% ===================================================================
%% Test generators
%% ===================================================================

parse_test_() ->
    [
        %% Basic parsing
        {"empty input returns empty list",            fun parse_empty/0},
        {"blank lines are skipped",                   fun parse_blank_lines/0},
        {"comment lines are skipped",                 fun parse_comments/0},
        {"unknown keywords are skipped",              fun parse_unknown_keyword/0},

        %% DIV
        {"DIV with name and description",             fun parse_div_full/0},
        {"DIV with name only",                        fun parse_div_name_only/0},

        %% OWNS / PUBLISHES / CONSUMES
        {"OWNS parses concept list",                  fun parse_owns/0},
        {"PUBLISHES parses multiple facts",           fun parse_publishes/0},
        {"CONSUMES with FROM clause",                 fun parse_consumes_from/0},
        {"CONSUMES without FROM clause",              fun parse_consumes_no_from/0},

        %% AGG
        {"AGG with name and stream",                  fun parse_agg/0},
        {"AGG with name only",                        fun parse_agg_name_only/0},

        %% DESK (nested under AGG)
        {"DESK attaches to current AGG",              fun parse_desk_in_agg/0},
        {"DESK without AGG is skipped",               fun parse_desk_no_agg/0},
        {"DESK with no fields",                       fun parse_desk_no_fields/0},

        %% FLAGS (nested under AGG)
        {"FLAGS attaches to current AGG",             fun parse_flags_in_agg/0},

        %% WALK (nested under AGG)
        {"WALK attaches to current AGG",              fun parse_walk_in_agg/0},

        %% PM (nested under AGG)
        {"PM with target attaches to AGG",            fun parse_pm_in_agg/0},
        {"PM without target",                         fun parse_pm_no_target/0},

        %% APP
        {"APP CMD parsed correctly",                  fun parse_app_cmd/0},
        {"APP PRJ parsed correctly",                  fun parse_app_prj/0},
        {"APP QRY parsed correctly",                  fun parse_app_qry/0},

        %% SUP / EMIT / STORE / TABLE
        {"SUP with strategy",                         fun parse_sup/0},
        {"SUP defaults to one_for_one",               fun parse_sup_default/0},
        {"EMIT parsed correctly",                     fun parse_emit/0},
        {"STORE parsed correctly",                    fun parse_store/0},
        {"TABLE with fields",                         fun parse_table/0},

        %% PROJ / QUERY
        {"PROJ with event, table, and op",            fun parse_proj/0},
        {"PROJ defaults to INSERT",                   fun parse_proj_default_op/0},
        {"QUERY with name, method, path",             fun parse_query/0},

        %% PHASE / ITEM
        {"PHASE with props",                          fun parse_phase/0},
        {"ITEM with props",                           fun parse_item/0},

        %% FLAG / AMEND
        {"FLAG with agent, severity, message",        fun parse_flag/0},
        {"AMEND add rule",                            fun parse_amend_add/0},
        {"AMEND remove rule",                         fun parse_amend_remove/0},

        %% GATE
        {"GATE PASS",                                 fun parse_gate_pass/0},
        {"GATE FAIL",                                 fun parse_gate_fail/0},

        %% COST / TOTAL / STATUS
        {"COST parsed correctly",                     fun parse_cost/0},
        {"TOTAL parsed correctly",                    fun parse_total/0},
        {"STATUS parsed correctly",                   fun parse_status/0},

        %% Integration: full document
        {"full EventStorm document",                  fun parse_full_document/0}
    ].

%% ===================================================================
%% Basic parsing
%% ===================================================================

parse_empty() ->
    {ok, []} = martha_notation:parse(<<>>).

parse_blank_lines() ->
    {ok, []} = martha_notation:parse(<<"\n\n\n">>).

parse_comments() ->
    {ok, []} = martha_notation:parse(<<"# this is a comment\n# another">>).

parse_unknown_keyword() ->
    {ok, []} = martha_notation:parse(<<"FOOBAR something">>).

%% ===================================================================
%% DIV
%% ===================================================================

parse_div_full() ->
    {ok, [Term]} = martha_notation:parse(<<"DIV billing \"Invoice and payment processing\"">>),
    ?assertEqual({division, <<"billing">>, <<"Invoice and payment processing">>}, Term).

parse_div_name_only() ->
    {ok, [Term]} = martha_notation:parse(<<"DIV billing">>),
    ?assertEqual({division, <<"billing">>, <<>>}, Term).

%% ===================================================================
%% OWNS / PUBLISHES / CONSUMES
%% ===================================================================

parse_owns() ->
    {ok, [Term]} = martha_notation:parse(<<"OWNS invoice payment account_receivable">>),
    ?assertEqual({division_owns, [<<"invoice">>, <<"payment">>, <<"account_receivable">>]}, Term).

parse_publishes() ->
    {ok, Terms} = martha_notation:parse(<<"PUBLISHES invoice_paid_fact payment_received_fact">>),
    ?assertEqual(2, length(Terms)),
    %% Each fact becomes a separate term (reversed from accumulator order)
    ?assertEqual({division_publishes, <<"payment_received_fact">>}, lists:nth(1, Terms)),
    ?assertEqual({division_publishes, <<"invoice_paid_fact">>}, lists:nth(2, Terms)).

parse_consumes_from() ->
    {ok, [Term]} = martha_notation:parse(<<"CONSUMES customer_registered_fact FROM auth">>),
    ?assertEqual({division_consumes, <<"customer_registered_fact">>, <<"auth">>}, Term).

parse_consumes_no_from() ->
    {ok, [Term]} = martha_notation:parse(<<"CONSUMES orphan_fact">>),
    ?assertEqual({division_consumes, <<"orphan_fact">>, <<>>}, Term).

%% ===================================================================
%% AGG
%% ===================================================================

parse_agg() ->
    {ok, [Term]} = martha_notation:parse(<<"AGG invoice invoice-{invoice_id}">>),
    ?assertMatch({agg, <<"invoice">>, <<"invoice-{invoice_id}">>, _}, Term).

parse_agg_name_only() ->
    {ok, [Term]} = martha_notation:parse(<<"AGG invoice">>),
    ?assertMatch({agg, <<"invoice">>, <<>>, _}, Term).

%% ===================================================================
%% DESK (nested under AGG)
%% ===================================================================

parse_desk_in_agg() ->
    Input = <<"AGG invoice invoice-{invoice_id}\n"
              "  DESK issue_invoice -> invoice_issued_v1 [invoice_id venture_id amount]">>,
    {ok, [Agg]} = martha_notation:parse(Input),
    ?assertMatch({agg, <<"invoice">>, _, _}, Agg),
    {agg, _, _, Details} = Agg,
    Desks = maps:get(desks, Details),
    ?assertEqual(1, length(Desks)),
    [{desk, DeskName, Event, Fields}] = Desks,
    ?assertEqual(<<"issue_invoice">>, DeskName),
    ?assertEqual(<<"invoice_issued_v1">>, Event),
    ?assertEqual([<<"invoice_id">>, <<"venture_id">>, <<"amount">>], Fields).

parse_desk_no_agg() ->
    %% DESK without a preceding AGG is skipped
    {ok, []} = martha_notation:parse(<<"DESK issue_invoice -> invoice_issued_v1 [id]">>).

parse_desk_no_fields() ->
    Input = <<"AGG invoice invoice-{id}\n"
              "  DESK archive_invoice -> invoice_archived_v1">>,
    {ok, [Agg]} = martha_notation:parse(Input),
    {agg, _, _, Details} = Agg,
    [{desk, _, _, Fields}] = maps:get(desks, Details),
    ?assertEqual([], Fields).

%% ===================================================================
%% FLAGS (nested under AGG)
%% ===================================================================

parse_flags_in_agg() ->
    Input = <<"AGG invoice invoice-{id}\n"
              "  FLAGS INITIATED=1 ARCHIVED=2 ISSUED=4">>,
    {ok, [Agg]} = martha_notation:parse(Input),
    {agg, _, _, Details} = Agg,
    Flags = maps:get(flags, Details),
    ?assertEqual(3, length(Flags)),
    ?assertEqual({<<"INITIATED">>, 1}, hd(Flags)).

%% ===================================================================
%% WALK (nested under AGG)
%% ===================================================================

parse_walk_in_agg() ->
    Input = <<"AGG invoice invoice-{id}\n"
              "  WALK initiate_invoice archive_invoice">>,
    {ok, [Agg]} = martha_notation:parse(Input),
    {agg, _, _, Details} = Agg,
    ?assertEqual([<<"initiate_invoice">>, <<"archive_invoice">>], maps:get(walk, Details)).

%% ===================================================================
%% PM (nested under AGG)
%% ===================================================================

parse_pm_in_agg() ->
    Input = <<"AGG invoice invoice-{id}\n"
              "  PM on_invoice_paid_notify_customer -> notifications">>,
    {ok, [Agg]} = martha_notation:parse(Input),
    {agg, _, _, Details} = Agg,
    PMs = maps:get(pms, Details),
    ?assertEqual([{pm, <<"on_invoice_paid_notify_customer">>, <<"notifications">>}], PMs).

parse_pm_no_target() ->
    Input = <<"AGG invoice invoice-{id}\n"
              "  PM on_invoice_paid_log">>,
    {ok, [Agg]} = martha_notation:parse(Input),
    {agg, _, _, Details} = Agg,
    [{pm, Name, Target}] = maps:get(pms, Details),
    ?assertEqual(<<"on_invoice_paid_log">>, Name),
    ?assertEqual(<<>>, Target).

%% ===================================================================
%% APP
%% ===================================================================

parse_app_cmd() ->
    {ok, [Term]} = martha_notation:parse(<<"APP guide_billing CMD">>),
    ?assertEqual({app, <<"guide_billing">>, cmd, #{}}, Term).

parse_app_prj() ->
    {ok, [Term]} = martha_notation:parse(<<"APP project_billings PRJ">>),
    ?assertEqual({app, <<"project_billings">>, prj, #{}}, Term).

parse_app_qry() ->
    {ok, [Term]} = martha_notation:parse(<<"APP query_billings QRY">>),
    ?assertEqual({app, <<"query_billings">>, qry, #{}}, Term).

%% ===================================================================
%% SUP / EMIT / STORE / TABLE
%% ===================================================================

parse_sup() ->
    {ok, [Term]} = martha_notation:parse(<<"SUP guide_billing_sup one_for_one">>),
    ?assertEqual({sup, <<"guide_billing_sup">>, <<"one_for_one">>}, Term).

parse_sup_default() ->
    {ok, [Term]} = martha_notation:parse(<<"SUP guide_billing_sup">>),
    ?assertEqual({sup, <<"guide_billing_sup">>, <<"one_for_one">>}, Term).

parse_emit() ->
    {ok, [Term]} = martha_notation:parse(<<"EMIT invoice_issued_v1_to_pg">>),
    ?assertEqual({emit, <<"invoice_issued_v1_to_pg">>}, Term).

parse_store() ->
    {ok, [Term]} = martha_notation:parse(<<"STORE project_billings_store">>),
    ?assertEqual({store, <<"project_billings_store">>}, Term).

parse_table() ->
    {ok, [Term]} = martha_notation:parse(<<"TABLE billings [division_id:pk venture_id:text status:int]">>),
    ?assertEqual({table, <<"billings">>, [<<"division_id:pk">>, <<"venture_id:text">>, <<"status:int">>]}, Term).

%% ===================================================================
%% PROJ / QUERY
%% ===================================================================

parse_proj() ->
    {ok, [Term]} = martha_notation:parse(<<"PROJ invoice_issued_v1 -> invoices INSERT">>),
    ?assertEqual({proj, <<"invoice_issued_v1">>, <<"invoices">>, <<"INSERT">>}, Term).

parse_proj_default_op() ->
    {ok, [Term]} = martha_notation:parse(<<"PROJ invoice_issued_v1 -> invoices">>),
    ?assertEqual({proj, <<"invoice_issued_v1">>, <<"invoices">>, <<"INSERT">>}, Term).

parse_query() ->
    {ok, [Term]} = martha_notation:parse(<<"QUERY get_billing_by_id GET /api/billings/:division_id">>),
    ?assertEqual({query, <<"get_billing_by_id">>, <<"GET">>, <<"/api/billings/:division_id">>}, Term).

%% ===================================================================
%% PHASE / ITEM
%% ===================================================================

parse_phase() ->
    {ok, [Term]} = martha_notation:parse(<<"PHASE planning STATUS=5 LABEL=\"Open\"">>),
    {phase, Code, Props} = Term,
    ?assertEqual(<<"planning">>, Code),
    ?assertEqual(<<"5">>, maps:get(<<"STATUS">>, Props)),
    ?assertEqual(<<"Open">>, maps:get(<<"LABEL">>, Props)).

parse_item() ->
    {ok, [Term]} = martha_notation:parse(<<"ITEM i-001 TYPE=cmd_desk STATUS=ready \"issue_invoice\"">>),
    {item, Id, Props} = Term,
    ?assertEqual(<<"i-001">>, Id),
    ?assertEqual(<<"cmd_desk">>, maps:get(<<"TYPE">>, Props)),
    ?assertEqual(<<"ready">>, maps:get(<<"STATUS">>, Props)).

%% ===================================================================
%% FLAG / AMEND
%% ===================================================================

parse_flag() ->
    {ok, [Term]} = martha_notation:parse(<<"FLAG stormer MAJOR \"invoice_created is CRUD\"">>),
    ?assertEqual({flag, <<"stormer">>, <<"MAJOR">>, <<"invoice_created is CRUD">>}, Term).

parse_amend_add() ->
    {ok, [Term]} = martha_notation:parse(<<"AMEND roles/stormer.md +\"Financial events: issued, not created\"">>),
    ?assertEqual({amend, <<"roles/stormer.md">>, add, <<"Financial events: issued, not created">>}, Term).

parse_amend_remove() ->
    {ok, [Term]} = martha_notation:parse(<<"AMEND roles/stormer.md -\"Old rule to remove\"">>),
    ?assertEqual({amend, <<"roles/stormer.md">>, remove, <<"Old rule to remove">>}, Term).

%% ===================================================================
%% GATE
%% ===================================================================

parse_gate_pass() ->
    {ok, [Term]} = martha_notation:parse(<<"GATE boundary_gate PASS \"5 divisions\"">>),
    ?assertEqual({gate, <<"boundary_gate">>, pass, <<"5 divisions">>}, Term).

parse_gate_fail() ->
    {ok, [Term]} = martha_notation:parse(<<"GATE review_gate FAIL \"3 critical findings\"">>),
    ?assertEqual({gate, <<"review_gate">>, fail, <<"3 critical findings">>}, Term).

%% ===================================================================
%% COST / TOTAL / STATUS
%% ===================================================================

parse_cost() ->
    {ok, [Term]} = martha_notation:parse(<<"COST stormer 4.2K $0.03">>),
    ?assertEqual({cost, <<"stormer">>, <<"4.2K">>, <<"$0.03">>}, Term).

parse_total() ->
    {ok, [Term]} = martha_notation:parse(<<"TOTAL 38.2K $0.24">>),
    ?assertEqual({total, <<"38.2K">>, <<"$0.24">>}, Term).

parse_status() ->
    {ok, [Term]} = martha_notation:parse(<<"STATUS billing stormer COMPLETE">>),
    ?assertEqual({status, <<"billing">>, <<"stormer">>, <<"COMPLETE">>}, Term).

%% ===================================================================
%% Integration: full EventStorm document
%% ===================================================================

parse_full_document() ->
    Input = <<"# Billing Division EventStorm\n"
              "DIV billing \"Invoice and payment processing\"\n"
              "  OWNS invoice payment account_receivable\n"
              "  PUBLISHES invoice_paid_fact\n"
              "  CONSUMES customer_registered_fact FROM auth\n"
              "\n"
              "AGG invoice invoice-{invoice_id}\n"
              "  FLAGS INITIATED=1 ARCHIVED=2 ISSUED=4 PAID=8\n"
              "  WALK initiate_invoice archive_invoice\n"
              "  DESK issue_invoice -> invoice_issued_v1 [invoice_id venture_id amount]\n"
              "  DESK pay_invoice -> invoice_paid_v1 [invoice_id paid_by amount]\n"
              "  PM on_invoice_paid_notify_customer -> notifications\n"
              "\n"
              "APP guide_billing CMD\n"
              "APP project_billings PRJ\n"
              "APP query_billings QRY\n"
              "\n"
              "COST stormer 4.2K $0.03\n"
              "TOTAL 38.2K $0.24\n"
              "STATUS billing stormer COMPLETE">>,
    {ok, Terms} = martha_notation:parse(Input),
    %% division, division_owns, division_publishes, division_consumes,
    %% agg (with 2 desks, flags, walk, 1 pm),
    %% 3 apps, cost, total, status = 11 top-level terms
    %% (PUBLISHES with 1 fact = 1 term; OWNS = 1 term; CONSUMES = 1 term)
    ?assertEqual(11, length(Terms)),

    %% Verify first term is the division
    ?assertMatch({division, <<"billing">>, _}, hd(Terms)),

    %% Find the aggregate and verify nested content
    [Agg] = [T || {agg, _, _, _} = T <- Terms],
    {agg, <<"invoice">>, <<"invoice-{invoice_id}">>, Details} = Agg,
    ?assertEqual(2, length(maps:get(desks, Details))),
    ?assertEqual(4, length(maps:get(flags, Details))),
    ?assertEqual([<<"initiate_invoice">>, <<"archive_invoice">>], maps:get(walk, Details)),
    ?assertEqual(1, length(maps:get(pms, Details))),

    %% Verify apps
    Apps = [T || {app, _, _, _} = T <- Terms],
    ?assertEqual(3, length(Apps)),

    %% Verify cost/total/status
    ?assertMatch([{cost, <<"stormer">>, _, _}], [T || {cost, _, _, _} = T <- Terms]),
    ?assertMatch([{total, _, _}], [T || {total, _, _} = T <- Terms]),
    ?assertMatch([{status, <<"billing">>, <<"stormer">>, _}], [T || {status, _, _, _} = T <- Terms]).
