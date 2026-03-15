%%% @doc Martha plugin callback module.
%%%
%%% Implements the hecate_plugin behaviour for in-VM loading.
%%% When loaded by hecate_plugin_loader, this module provides:
%%%   - ReckonDB store config (martha_store)
%%%   - Cowboy routes (mounted under /plugin/hecate-app-martha/api/)
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
    %% Explicit route table — no dynamic discovery.
    %% Each handler still defines routes/0 for standalone use, but
    %% plugin loading uses this list to avoid scanning 851 modules.
    [
     %% SSE (root app)
     {"/events/stream", app_marthad_sse_handler, []},

     %% === Query: Ventures ===
     {"/venture",                                        get_active_venture_api, []},
     {"/ventures",                                       get_ventures_page_api, []},
     {"/ventures/:venture_id",                           get_venture_by_id_api, []},
     {"/ventures/:venture_id/status",                    get_venture_status_api, []},
     {"/ventures/:venture_id/tasks",                     get_venture_tasks_api, []},
     {"/ventures/:venture_id/events",                    get_venture_events_page_api, []},
     {"/ventures/:venture_id/divisions",                 get_discovered_divisions_page_api, []},
     {"/ventures/:venture_id/storm/state",               get_storm_state_api, []},

     %% === Query: Divisions ===
     {"/divisions",                                      get_divisions_page_api, []},
     {"/divisions/:division_id",                         get_division_by_id_api, []},
     {"/divisions/:division_id/planning",                get_division_planning_api, []},
     {"/divisions/:division_id/storming",                get_division_storming_api, []},
     {"/divisions/:division_id/kanban",                  get_division_kanban_api, []},
     {"/divisions/:division_id/kanban/cards",            get_division_kanban_cards_api, []},
     {"/divisions/:division_id/crafting",                get_division_crafting_api, []},

     %% NOTE: query_divisions also serves this under /ventures/:venture_id/divisions
     %% but get_discovered_divisions_page_api (query_ventures) handles that path above.
     %% This is the query_divisions version for divisions-by-venture:
     %% Cowboy picks the first matching route, so this second registration is safe
     %% only if they return the same data. Both exist for standalone-mode compat.

     %% === Query: Agent Sessions ===
     {"/agents/sessions",                                get_sessions_page_api, []},
     {"/agents/sessions/active",                         get_active_sessions_api, []},
     {"/agents/sessions/:session_id",                    get_session_by_id_api, []},
     {"/agents/sessions/:session_id/turns",              get_session_turns_api, []},

     %% === Query: Knowledge Graph ===
     {"/knowledge-graph/:venture_id",                    get_knowledge_graph_api, []},
     {"/knowledge-graph/:venture_id/entities",           get_entities_page_api, []},
     {"/knowledge-graph/:venture_id/insights",           get_insights_page_api, []},
     {"/knowledge-graph/:venture_id/search",             search_knowledge_graph_api, []},
     {"/knowledge-graph/:venture_id/narrative",          get_venture_narrative_api, []},

     %% === Query: Cost Budgets ===
     {"/cost-budgets/:venture_id",                       get_cost_budget_api, []},
     {"/cost-budgets",                                   get_cost_budget_api, []},

     %% === Query: Retry Strategy ===
     {"/retry-strategy/:venture_id",                     get_retry_history_api, []},
     {"/retry-strategy/:venture_id/:session_id",         get_retry_history_api, []},

     %% === CMD: Venture Lifecycle ===
     {"/ventures/initiate",                              initiate_venture_api, []},
     {"/ventures/:venture_id/archive",                   archive_venture_api, []},
     {"/ventures/:venture_id/scaffold",                  scaffold_venture_repo_api, []},
     %% Vision
     {"/ventures/:venture_id/vision",                    submit_vision_api, []},
     {"/ventures/:venture_id/vision/refine",             refine_vision_api, []},
     %% Discovery
     {"/ventures/:venture_id/discovery/start",           start_discovery_api, []},
     {"/ventures/:venture_id/discovery/pause",           pause_discovery_api, []},
     {"/ventures/:venture_id/discovery/resume",          resume_discovery_api, []},
     {"/ventures/:venture_id/discovery/complete",        complete_discovery_api, []},
     {"/ventures/:venture_id/discovery/identify",        identify_division_api, []},
     %% Knowledge Preparation
     {"/ventures/:venture_id/knowledge/prepare",         prepare_venture_knowledge_api, []},
     {"/ventures/:venture_id/knowledge/brief",           contribute_research_brief_api, []},
     {"/ventures/:venture_id/knowledge/complete",        complete_venture_preparation_api, []},
     %% Big Picture Storm
     {"/ventures/:venture_id/storm/start",               start_big_picture_storm_api, []},
     {"/ventures/:venture_id/storm/shelve",              shelve_big_picture_storm_api, []},
     {"/ventures/:venture_id/storm/resume",              resume_big_picture_storm_api, []},
     {"/ventures/:venture_id/storm/archive",             archive_big_picture_storm_api, []},
     {"/ventures/:venture_id/storm/phase/advance",       advance_storm_phase_api, []},
     %% Storm Artifacts
     {"/ventures/:venture_id/storm/fact",                draw_fact_arrow_api, []},
     {"/ventures/:venture_id/storm/fact/:arrow_id/erase", erase_fact_arrow_api, []},
     {"/ventures/:venture_id/storm/sticky",              post_event_sticky_api, []},
     {"/ventures/:venture_id/storm/sticky/:sticky_id/stack",      stack_event_sticky_api, []},
     {"/ventures/:venture_id/storm/sticky/:sticky_id/unstack",    unstack_event_sticky_api, []},
     {"/ventures/:venture_id/storm/sticky/:sticky_id/pull",       pull_event_sticky_api, []},
     {"/ventures/:venture_id/storm/sticky/:sticky_id/cluster",    cluster_event_sticky_api, []},
     {"/ventures/:venture_id/storm/sticky/:sticky_id/uncluster",  uncluster_event_sticky_api, []},
     %% Storm Clusters
     {"/ventures/:venture_id/storm/cluster/:cluster_id/name",     name_event_cluster_api, []},
     {"/ventures/:venture_id/storm/cluster/:cluster_id/promote",  promote_event_cluster_api, []},
     {"/ventures/:venture_id/storm/cluster/:cluster_id/dissolve", dissolve_event_cluster_api, []},

     %% === CMD: Division Lifecycle ===
     {"/divisions/:division_id/initiate",                initiate_division_api, []},
     {"/divisions/:division_id/archive",                 archive_division_api, []},
     %% Planning
     {"/plannings/:division_id/open",                    open_planning_api, []},
     {"/plannings/:division_id/shelve",                  shelve_planning_api, []},
     {"/plannings/:division_id/resume",                  resume_planning_api, []},
     {"/plannings/:division_id/submit",                  submit_planning_api, []},
     %% Storming (design)
     {"/stormings/:division_id/design-event",            design_event_api, []},
     {"/stormings/:division_id/design-aggregate",        design_aggregate_api, []},
     {"/stormings/:division_id/plan-dependency",         plan_dependency_api, []},
     {"/stormings/:division_id/plan-desk",               plan_desk_api, []},
     %% Crafting
     {"/craftings/:division_id/open",                    open_crafting_api, []},
     {"/craftings/:division_id/shelve",                  shelve_crafting_api, []},
     {"/craftings/:division_id/resume",                  resume_crafting_api, []},
     {"/craftings/:division_id/generate-module",         generate_module_api, []},
     {"/craftings/:division_id/generate-test",           generate_test_api, []},
     {"/craftings/:division_id/run-test-suite",          run_test_suite_api, []},
     {"/craftings/:division_id/record-test-result",      record_test_result_api, []},
     {"/craftings/:division_id/stage-delivery",          stage_delivery_api, []},
     {"/craftings/:division_id/deliver-release",         deliver_release_api, []},
     %% Kanban Cards
     {"/kanbans/:division_id/cards",                     post_kanban_card_api, []},
     {"/kanbans/:division_id/cards/:card_id/pick",       pick_kanban_card_api, []},
     {"/kanbans/:division_id/cards/:card_id/unpick",     unpick_kanban_card_api, []},
     {"/kanbans/:division_id/cards/:card_id/park",       park_kanban_card_api, []},
     {"/kanbans/:division_id/cards/:card_id/unpark",     unpark_kanban_card_api, []},
     {"/kanbans/:division_id/cards/:card_id/block",      block_kanban_card_api, []},
     {"/kanbans/:division_id/cards/:card_id/unblock",    unblock_kanban_card_api, []},
     {"/kanbans/:division_id/cards/:card_id/finish",     finish_kanban_card_api, []},

     %% === CMD: Agent Orchestration ===
     {"/agents/sessions/archive",                        archive_agent_session_api, []},
     %% Visionary
     {"/agents/visionary/initiate",                      initiate_visionary_api, []},
     {"/agents/visionary/gate/pass",                     pass_vision_gate_api, []},
     {"/agents/visionary/gate/reject",                   reject_vision_gate_api, []},
     %% Explorer
     {"/agents/explorer/initiate",                       initiate_explorer_api, []},
     {"/agents/explorer/gates/boundary-gate/pass",       pass_boundary_gate_api, []},
     {"/agents/explorer/gates/boundary-gate/reject",     reject_boundary_gate_api, []},
     %% Stormer
     {"/agents/stormer/initiate",                        initiate_stormer_api, []},
     {"/agents/stormer/gates/design-gate/pass",          pass_design_gate_api, []},
     {"/agents/stormer/gates/design-gate/reject",        reject_design_gate_api, []},
     %% Architect
     {"/agents/architect/initiate",                      initiate_architect_api, []},
     %% Coders
     {"/agents/erlang_coder/initiate",                   initiate_erlang_coder_api, []},
     {"/agents/svelte_coder/initiate",                   initiate_svelte_coder_api, []},
     {"/agents/sql_coder/initiate",                      initiate_sql_coder_api, []},
     %% Reviewer
     {"/agents/reviewer/initiate",                       initiate_reviewer_api, []},
     {"/agents/reviewer/gates/review-gate/pass",         pass_review_gate_api, []},
     {"/agents/reviewer/gates/review-gate/reject",       reject_review_gate_api, []},
     %% Tester
     {"/agents/tester/initiate",                         initiate_tester_api, []},
     %% Delivery Manager
     {"/agents/delivery_manager/initiate",               initiate_delivery_manager_api, []},
     %% Mentor
     {"/agents/mentor/initiate",                         initiate_mentor_api, []},
     %% Coordinator
     {"/agents/coordinator/initiate",                    initiate_coordinator_api, []}
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
        version => <<"0.5.5">>,
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
