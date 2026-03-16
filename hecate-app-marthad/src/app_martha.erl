%%% @doc Martha plugin callback module.
%%%
%%% Implements the hecate_plugin behaviour for in-VM loading.
%%% When loaded by hecate_plugin_loader, this module provides:
%%%   - ReckonDB store config (martha_store)
%%%   - Cowboy routes (mounted under /plugin/hecate-app-martha/api/)
%%%     Routes use screaming desk names as URLs (URL = desk name).
%%%   - Static dir (frontend assets at /plugin/hecate-app-martha/)
%%%   - Plugin manifest with flag maps for planning/crafting status
%%% @end
-module(app_martha).
-behaviour(hecate_plugin).

-include_lib("hecate_sdk/include/hecate_plugin.hrl").
-include_lib("guide_division_lifecycle/include/division_lifecycle_status.hrl").
-include_lib("guide_division_lifecycle/include/kanban_card_status.hrl").

-export([init/1, routes/0, store_config/0, static_dir/0, manifest/0, flag_maps/0]).
-export([health/0]).

%% Additional Martha stores beyond the primary martha_store.
%% The primary store is created by the plugin loader via store_config/0.
%% These are created in init/1 after the primary store is ready.
-define(EXTRA_STORES, [
    {orchestration_store,       "orchestration",       "Agent Orchestration (sessions)"},
    {knowledge_graph_store,     "knowledge_graph",     "Knowledge Graph (long-term memory)"},
    {retry_strategy_store,      "retry_strategy",      "Retry Strategy (adaptive retries)"},
    {cost_budget_store,         "cost_budget",         "Cost Budget (token spending limits)"}
]).

-define(DOMAIN_APPS, [
    martha,
    guide_venture_lifecycle, project_ventures, query_ventures,
    guide_division_lifecycle, project_divisions, query_divisions,
    orchestrate_agents, project_agent_sessions, query_agent_sessions,
    guide_knowledge_graph, project_knowledge_graph, query_knowledge_graph,
    guide_retry_strategy, project_retry_strategy, query_retry_strategy,
    guard_cost_budget, project_cost_budgets, query_cost_budgets
]).

-spec init(map()) -> {ok, map()} | {error, term()}.
init(#{plugin_name := PluginName, store_id := StoreId, data_dir := DataDir}) ->
    logger:info("[app-martha] Initializing plugin ~s (store: ~p, data: ~s)",
                [PluginName, StoreId, DataDir]),
    persistent_term:put(app_martha_config, #{
        plugin_name => PluginName,
        store_id => StoreId,
        data_dir => DataDir
    }),
    %% Set plugin name for ?METRIC_* macros
    persistent_term:put(hecate_current_plugin, PluginName),
    %% Create additional Martha stores (primary martha_store already created by loader)
    hecate_plugin_store:start_extra_stores(DataDir, ?EXTRA_STORES),
    %% Start store subscriptions for all Martha stores
    AllStoreIds = [StoreId | [Id || {Id, _, _} <- ?EXTRA_STORES]],
    hecate_plugin_store:start_subscriptions(AllStoreIds),
    %% Load OTP application metadata so modules are findable by the BEAM.
    lists:foreach(fun(App) -> application:load(App) end, ?DOMAIN_APPS),
    case app_martha_sup:start_link() of
        {ok, Pid} ->
            %% CRITICAL: unlink supervisor from this process.
            %% Plugin loader calls init/1 from a temporary spawned process.
            %% OTP supervisors track their parent (the start_link caller) and
            %% stop themselves when the parent exits. Without unlink, the
            %% supervisor dies as soon as the init process completes.
            unlink(Pid),
            logger:info("[app-martha] Supervision tree started (~p)", [Pid]),
            {ok, #{sup_pid => Pid}};
        {error, {already_started, Pid}} ->
            logger:info("[app-martha] Supervision tree already running (~p)", [Pid]),
            {ok, #{sup_pid => Pid}};
        {error, Reason} ->
            logger:error("[app-martha] Failed to start supervision tree: ~p", [Reason]),
            {error, Reason}
    end.

-spec routes() -> [{string(), module(), term()}].
routes() ->
    %% Screaming desk routes — URL = desk name.
    %% CMD desks: POST /desk_name[/:id]
    %% QRY desks: GET /desk_name[/:id]
    %% No REST-style resource paths. The handler module IS the desk.
    [
     %% SSE (root app)
     {"/events/stream", app_marthad_sse_handler, []},

     %% === QRY: Ventures ===
     {"/get_active_venture",                                    get_active_venture_api, []},
     {"/get_ventures_page",                                     get_ventures_page_api, []},
     {"/get_venture_by_id/:venture_id",                         get_venture_by_id_api, []},
     {"/get_venture_status/:venture_id",                        get_venture_status_api, []},
     {"/get_venture_tasks/:venture_id",                         get_venture_tasks_api, []},
     {"/get_venture_events_page/:venture_id",                   get_venture_events_page_api, []},
     {"/get_discovered_divisions_page/:venture_id",             get_discovered_divisions_page_api, []},
     {"/get_storm_state/:venture_id",                           get_storm_state_api, []},

     %% === CMD: Venture Lifecycle ===
     {"/initiate_venture",                                      initiate_venture_api, []},
     {"/archive_venture/:venture_id",                           archive_venture_api, []},
     {"/scaffold_venture_repo/:venture_id",                     scaffold_venture_repo_api, []},
     %% Vision
     {"/submit_vision/:venture_id",                             submit_vision_api, []},
     {"/refine_vision/:venture_id",                             refine_vision_api, []},
     %% Discovery
     {"/start_discovery/:venture_id",                           start_discovery_api, []},
     {"/pause_discovery/:venture_id",                           pause_discovery_api, []},
     {"/resume_discovery/:venture_id",                          resume_discovery_api, []},
     {"/complete_discovery/:venture_id",                        complete_discovery_api, []},
     {"/identify_division/:venture_id",                         identify_division_api, []},
     %% Knowledge Preparation
     {"/prepare_venture_knowledge/:venture_id",                 prepare_venture_knowledge_api, []},
     {"/contribute_research_brief/:venture_id",                 contribute_research_brief_api, []},
     {"/complete_venture_preparation/:venture_id",              complete_venture_preparation_api, []},
     %% Big Picture Storm
     {"/start_big_picture_storm/:venture_id",                   start_big_picture_storm_api, []},
     {"/shelve_big_picture_storm/:venture_id",                  shelve_big_picture_storm_api, []},
     {"/resume_big_picture_storm/:venture_id",                  resume_big_picture_storm_api, []},
     {"/archive_big_picture_storm/:venture_id",                 archive_big_picture_storm_api, []},
     {"/advance_storm_phase/:venture_id",                       advance_storm_phase_api, []},
     %% Storm Artifacts
     {"/draw_fact_arrow/:venture_id",                           draw_fact_arrow_api, []},
     {"/erase_fact_arrow/:venture_id/:arrow_id",                erase_fact_arrow_api, []},
     {"/post_event_sticky/:venture_id",                         post_event_sticky_api, []},
     {"/stack_event_sticky/:venture_id/:sticky_id",             stack_event_sticky_api, []},
     {"/unstack_event_sticky/:venture_id/:sticky_id",           unstack_event_sticky_api, []},
     {"/pull_event_sticky/:venture_id/:sticky_id",              pull_event_sticky_api, []},
     {"/cluster_event_sticky/:venture_id/:sticky_id",           cluster_event_sticky_api, []},
     {"/uncluster_event_sticky/:venture_id/:sticky_id",         uncluster_event_sticky_api, []},
     %% Storm Clusters
     {"/name_event_cluster/:venture_id/:cluster_id",            name_event_cluster_api, []},
     {"/promote_event_cluster/:venture_id/:cluster_id",         promote_event_cluster_api, []},
     {"/dissolve_event_cluster/:venture_id/:cluster_id",        dissolve_event_cluster_api, []},

     %% === QRY: Divisions ===
     {"/get_divisions_page",                                    get_divisions_page_api, []},
     {"/get_division_by_id/:division_id",                       get_division_by_id_api, []},
     {"/get_division_planning/:division_id",                    get_division_planning_api, []},
     {"/get_division_storming/:division_id",                    get_division_storming_api, []},
     {"/get_division_kanban/:division_id",                      get_division_kanban_api, []},
     {"/get_division_kanban_cards/:division_id",                get_division_kanban_cards_api, []},
     {"/get_division_crafting/:division_id",                    get_division_crafting_api, []},

     %% === CMD: Division Lifecycle ===
     {"/initiate_division/:division_id",                        initiate_division_api, []},
     {"/archive_division/:division_id",                         archive_division_api, []},
     %% Planning
     {"/open_planning/:division_id",                            open_planning_api, []},
     {"/shelve_planning/:division_id",                          shelve_planning_api, []},
     {"/resume_planning/:division_id",                          resume_planning_api, []},
     {"/submit_planning/:division_id",                          submit_planning_api, []},
     %% Storming (design)
     {"/design_event/:division_id",                             design_event_api, []},
     {"/design_aggregate/:division_id",                         design_aggregate_api, []},
     {"/plan_dependency/:division_id",                          plan_dependency_api, []},
     {"/plan_desk/:division_id",                                plan_desk_api, []},
     %% Crafting
     {"/open_crafting/:division_id",                            open_crafting_api, []},
     {"/shelve_crafting/:division_id",                          shelve_crafting_api, []},
     {"/resume_crafting/:division_id",                          resume_crafting_api, []},
     {"/generate_module/:division_id",                          generate_module_api, []},
     {"/generate_test/:division_id",                            generate_test_api, []},
     {"/run_test_suite/:division_id",                           run_test_suite_api, []},
     {"/record_test_result/:division_id",                       record_test_result_api, []},
     {"/stage_delivery/:division_id",                           stage_delivery_api, []},
     {"/deliver_release/:division_id",                          deliver_release_api, []},
     %% Kanban Cards
     {"/post_kanban_card/:division_id",                         post_kanban_card_api, []},
     {"/pick_kanban_card/:division_id/:card_id",                pick_kanban_card_api, []},
     {"/unpick_kanban_card/:division_id/:card_id",              unpick_kanban_card_api, []},
     {"/park_kanban_card/:division_id/:card_id",                park_kanban_card_api, []},
     {"/unpark_kanban_card/:division_id/:card_id",              unpark_kanban_card_api, []},
     {"/block_kanban_card/:division_id/:card_id",               block_kanban_card_api, []},
     {"/unblock_kanban_card/:division_id/:card_id",             unblock_kanban_card_api, []},
     {"/finish_kanban_card/:division_id/:card_id",              finish_kanban_card_api, []},

     %% === QRY: Agent Sessions ===
     {"/get_sessions_page",                                     get_sessions_page_api, []},
     {"/get_active_sessions",                                   get_active_sessions_api, []},
     {"/get_session_by_id/:session_id",                         get_session_by_id_api, []},
     {"/get_session_turns/:session_id",                         get_session_turns_api, []},

     %% === CMD: Agent Orchestration ===
     {"/archive_agent_session",                                 archive_agent_session_api, []},
     %% Visionary
     {"/initiate_visionary",                                    initiate_visionary_api, []},
     {"/pass_vision_gate",                                      pass_vision_gate_api, []},
     {"/reject_vision_gate",                                    reject_vision_gate_api, []},
     %% Explorer
     {"/initiate_explorer",                                     initiate_explorer_api, []},
     {"/pass_boundary_gate",                                    pass_boundary_gate_api, []},
     {"/reject_boundary_gate",                                  reject_boundary_gate_api, []},
     %% Stormer
     {"/initiate_stormer",                                      initiate_stormer_api, []},
     {"/pass_design_gate",                                      pass_design_gate_api, []},
     {"/reject_design_gate",                                    reject_design_gate_api, []},
     %% Architect
     {"/initiate_architect",                                    initiate_architect_api, []},
     %% Coders
     {"/initiate_erlang_coder",                                 initiate_erlang_coder_api, []},
     {"/initiate_svelte_coder",                                 initiate_svelte_coder_api, []},
     {"/initiate_sql_coder",                                    initiate_sql_coder_api, []},
     %% Reviewer
     {"/initiate_reviewer",                                     initiate_reviewer_api, []},
     {"/pass_review_gate",                                      pass_review_gate_api, []},
     {"/reject_review_gate",                                    reject_review_gate_api, []},
     %% Tester
     {"/initiate_tester",                                       initiate_tester_api, []},
     %% Delivery Manager
     {"/initiate_delivery_manager",                             initiate_delivery_manager_api, []},
     %% Mentor
     {"/initiate_mentor",                                       initiate_mentor_api, []},
     %% Coordinator
     {"/initiate_coordinator",                                  initiate_coordinator_api, []},

     %% === QRY: Knowledge Graph ===
     {"/get_knowledge_graph/:venture_id",                       get_knowledge_graph_api, []},
     {"/get_entities_page/:venture_id",                         get_entities_page_api, []},
     {"/get_insights_page/:venture_id",                         get_insights_page_api, []},
     {"/search_knowledge_graph/:venture_id",                    search_knowledge_graph_api, []},
     {"/get_venture_narrative/:venture_id",                     get_venture_narrative_api, []},

     %% === QRY: Cost Budgets ===
     {"/get_cost_budget/:venture_id",                           get_cost_budget_api, []},
     {"/get_cost_budget",                                       get_cost_budget_api, []},

     %% === QRY: Retry Strategy ===
     {"/get_retry_history/:venture_id",                         get_retry_history_api, []},
     {"/get_retry_history/:venture_id/:session_id",             get_retry_history_api, []}
    ].

-spec store_config() -> #hecate_store_config{}.
store_config() ->
    #hecate_store_config{
        store_id = martha_store,
        dir_name = "martha",
        description = "Martha ALC event store"
    }.

-spec static_dir() -> string() | none.
static_dir() ->
    "priv/static".

-spec manifest() -> map().
manifest() ->
    #{
        name => <<"hecate-app-martha">>,
        display_name => <<"Martha">>,
        version => <<"0.6.4">>,
        description => <<"AI-Assisted Application Lifecycle">>,
        icon => <<"dog2">>,
        tag => <<"martha-studio">>,
        min_sdk_version => <<"0.5.0">>
    }.

-spec flag_maps() -> #{binary() => evoq_bit_flags:flag_map()}.
flag_maps() ->
    #{
        <<"division_status">> => ?DIV_FLAG_MAP,
        <<"storming_status">> => ?STORMING_FLAG_MAP,
        <<"planning_status">> => ?PLANNING_FLAG_MAP,
        <<"kanban_status">> => ?BOARD_FLAG_MAP,
        <<"crafting_status">> => ?CRAFTING_FLAG_MAP,
        <<"card_status">> => ?CARD_FLAG_MAP
    }.

-spec health() -> ok | degraded | {unhealthy, binary()}.
health() ->
    SupAlive = is_pid(whereis(app_martha_sup)) andalso is_process_alive(whereis(app_martha_sup)),
    LlmAvailable = check_llm_availability(),
    health_result(SupAlive, LlmAvailable).

health_result(false, _) ->
    {unhealthy, <<"supervision tree down">>};
health_result(true, false) ->
    degraded;
health_result(true, true) ->
    ok.

check_llm_availability() ->
    try
        case hecate_plugin_llm:list_models() of
            {ok, [_ | _]} -> true;
            _ -> false
        end
    catch _:_ ->
        false
    end.
