%%% @doc Tests for martha_notation_kanban converter.
%%%
%%% Pure function tests — no external deps.
%%% Tests conversion of parsed notation terms into kanban card payloads.
-module(martha_notation_kanban_tests).

-include_lib("eunit/include/eunit.hrl").

%% ===================================================================
%% Test generators
%% ===================================================================

kanban_test_() ->
    [
        %% extract_desks
        {"extract desks from agg terms",              fun extract_desks_from_agg/0},
        {"extract desks skips non-agg terms",         fun extract_desks_skips_non_agg/0},
        {"extract desks from multiple aggs",          fun extract_desks_multiple_aggs/0},
        {"extract desks empty input",                 fun extract_desks_empty/0},

        %% extract_apps
        {"extract apps from parsed terms",            fun extract_apps/0},
        {"extract apps empty input",                  fun extract_apps_empty/0},

        %% desks_to_cards
        {"desks to cards produces cmd_desk cards",    fun desks_to_cards/0},
        {"desks to cards with division id",           fun desks_to_cards_division_id/0},
        {"desks to cards empty",                      fun desks_to_cards_empty/0},

        %% apps_to_cards
        {"apps to cards produces prj and qry cards",  fun apps_to_cards_prj_qry/0},
        {"apps to cards skips cmd apps",              fun apps_to_cards_skips_cmd/0},
        {"apps to cards empty",                       fun apps_to_cards_empty/0},

        %% Integration: full parse -> kanban
        {"full parse to kanban cards",                fun full_parse_to_kanban/0}
    ].

%% ===================================================================
%% Helpers
%% ===================================================================

sample_agg_terms() ->
    [{agg, <<"invoice">>, <<"invoice-{id}">>, #{
        desks => [
            {desk, <<"issue_invoice">>, <<"invoice_issued_v1">>,
                [<<"invoice_id">>, <<"venture_id">>, <<"amount">>]},
            {desk, <<"pay_invoice">>, <<"invoice_paid_v1">>,
                [<<"invoice_id">>, <<"paid_by">>]}
        ],
        flags => [{<<"INITIATED">>, 1}],
        pms => []
    }}].

sample_app_terms() ->
    [{app, <<"guide_billing">>, cmd, #{}},
     {app, <<"project_billings">>, prj, #{}},
     {app, <<"query_billings">>, qry, #{}}].

%% ===================================================================
%% extract_desks
%% ===================================================================

extract_desks_from_agg() ->
    Desks = martha_notation_kanban:extract_desks(sample_agg_terms()),
    ?assertEqual(2, length(Desks)),
    [{DeskName1, Event1, Fields1}, {DeskName2, _, _}] = Desks,
    ?assertEqual(<<"issue_invoice">>, DeskName1),
    ?assertEqual(<<"invoice_issued_v1">>, Event1),
    ?assertEqual([<<"invoice_id">>, <<"venture_id">>, <<"amount">>], Fields1),
    ?assertEqual(<<"pay_invoice">>, DeskName2).

extract_desks_skips_non_agg() ->
    Terms = [{division, <<"billing">>, <<"desc">>},
             {division_owns, [<<"invoice">>]},
             {app, <<"guide_billing">>, cmd, #{}}],
    Desks = martha_notation_kanban:extract_desks(Terms),
    ?assertEqual([], Desks).

extract_desks_multiple_aggs() ->
    Terms = [
        {agg, <<"invoice">>, <<"invoice-{id}">>, #{
            desks => [{desk, <<"issue_invoice">>, <<"invoice_issued_v1">>, []}],
            flags => [], pms => []
        }},
        {agg, <<"payment">>, <<"payment-{id}">>, #{
            desks => [{desk, <<"process_payment">>, <<"payment_processed_v1">>, []}],
            flags => [], pms => []
        }}
    ],
    Desks = martha_notation_kanban:extract_desks(Terms),
    ?assertEqual(2, length(Desks)).

extract_desks_empty() ->
    ?assertEqual([], martha_notation_kanban:extract_desks([])).

%% ===================================================================
%% extract_apps
%% ===================================================================

extract_apps() ->
    Apps = martha_notation_kanban:extract_apps(sample_app_terms()),
    ?assertEqual(3, length(Apps)),
    ?assertEqual({<<"guide_billing">>, cmd, #{}}, hd(Apps)).

extract_apps_empty() ->
    ?assertEqual([], martha_notation_kanban:extract_apps([])).

%% ===================================================================
%% desks_to_cards
%% ===================================================================

desks_to_cards() ->
    Cards = martha_notation_kanban:desks_to_cards(<<"div-1">>, sample_agg_terms()),
    ?assertEqual(2, length(Cards)),
    [Card1, _Card2] = Cards,
    ?assertEqual(<<"cmd_desk">>, maps:get(card_type, Card1)),
    ?assertEqual(<<"issue_invoice">>, maps:get(title, Card1)),
    ?assertEqual(<<"div-1">>, maps:get(division_id, Card1)).

desks_to_cards_division_id() ->
    Cards = martha_notation_kanban:desks_to_cards(<<"div-custom">>, sample_agg_terms()),
    lists:foreach(fun(Card) ->
        ?assertEqual(<<"div-custom">>, maps:get(division_id, Card))
    end, Cards).

desks_to_cards_empty() ->
    ?assertEqual([], martha_notation_kanban:desks_to_cards(<<"div-1">>, [])).

%% ===================================================================
%% apps_to_cards
%% ===================================================================

apps_to_cards_prj_qry() ->
    Cards = martha_notation_kanban:apps_to_cards(<<"div-1">>, sample_app_terms()),
    %% CMD apps are skipped, so only PRJ + QRY = 2 cards
    ?assertEqual(2, length(Cards)),
    [PrjCard, QryCard] = Cards,
    ?assertEqual(<<"prj_desk">>, maps:get(card_type, PrjCard)),
    ?assertEqual(<<"project_billings">>, maps:get(title, PrjCard)),
    ?assertEqual(<<"qry_desk">>, maps:get(card_type, QryCard)),
    ?assertEqual(<<"query_billings">>, maps:get(title, QryCard)).

apps_to_cards_skips_cmd() ->
    CmdOnly = [{app, <<"guide_billing">>, cmd, #{}}],
    Cards = martha_notation_kanban:apps_to_cards(<<"div-1">>, CmdOnly),
    ?assertEqual([], Cards).

apps_to_cards_empty() ->
    ?assertEqual([], martha_notation_kanban:apps_to_cards(<<"div-1">>, [])).

%% ===================================================================
%% Integration: full parse -> kanban
%% ===================================================================

full_parse_to_kanban() ->
    Input = <<"AGG invoice invoice-{invoice_id}\n"
              "  DESK issue_invoice -> invoice_issued_v1 [invoice_id venture_id]\n"
              "  DESK pay_invoice -> invoice_paid_v1 [invoice_id paid_by]\n"
              "  DESK void_invoice -> invoice_voided_v1 [invoice_id reason]\n"
              "\n"
              "APP guide_billing CMD\n"
              "APP project_billings PRJ\n"
              "APP query_billings QRY">>,
    {ok, Terms} = martha_notation:parse(Input),

    %% desks_to_cards: 3 cmd_desk cards
    DeskCards = martha_notation_kanban:desks_to_cards(<<"div-billing">>, Terms),
    ?assertEqual(3, length(DeskCards)),
    lists:foreach(fun(Card) ->
        ?assertEqual(<<"cmd_desk">>, maps:get(card_type, Card)),
        ?assertEqual(<<"div-billing">>, maps:get(division_id, Card))
    end, DeskCards),

    %% apps_to_cards: 2 cards (PRJ + QRY, CMD skipped)
    AppCards = martha_notation_kanban:apps_to_cards(<<"div-billing">>, Terms),
    ?assertEqual(2, length(AppCards)),
    CardTypes = [maps:get(card_type, C) || C <- AppCards],
    ?assert(lists:member(<<"prj_desk">>, CardTypes)),
    ?assert(lists:member(<<"qry_desk">>, CardTypes)).
