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
-include_lib("reckon_db/include/reckon_db.hrl").
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
    start_extra_stores(DataDir),
    %% Start store subscriptions for all Martha stores
    AllStoreIds = [StoreId | [Id || {Id, _, _} <- ?EXTRA_STORES]],
    start_store_subscriptions(AllStoreIds),
    %% Load OTP application metadata so application:get_key/2 works
    %% for route discovery (app_marthad_api_routes:discover_routes/0).
    lists:foreach(fun(App) -> application:load(App) end, ?DOMAIN_APPS),
    case app_martha_sup:start_link() of
        {ok, Pid} ->
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
    %% Domain handlers return routes with "/api/" prefix (for standalone mode).
    %% Plugin loader mounts at /plugin/{name}/api/, so strip the prefix to
    %% avoid double "/api/api/..." paths.
    [strip_api_prefix(R) || R <- app_marthad_api_routes:discover_routes()].

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
        version => <<"0.5.0">>,
        description => <<"AI-Assisted Application Lifecycle">>,
        icon => <<"dog2">>,
        tag => <<"martha-studio">>,
        min_sdk_version => <<"0.4.0">>
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

%%% Internal

strip_api_prefix({"/api" ++ Rest, Handler, Opts}) ->
    {Rest, Handler, Opts};
strip_api_prefix(Route) ->
    Route.

start_extra_stores(BaseDataDir) ->
    lists:foreach(fun({StoreId, SubDir, Label}) ->
        DataDir = filename:join(BaseDataDir, SubDir),
        ok = filelib:ensure_path(DataDir),
        Config = #store_config{
            store_id = StoreId,
            data_dir = DataDir,
            mode = single,
            writer_pool_size = 5,
            reader_pool_size = 5,
            gateway_pool_size = 2,
            options = #{}
        },
        case reckon_db_sup:start_store(Config) of
            {ok, _Pid} ->
                logger:info("[app-martha] Store ~p ready (~s)", [StoreId, Label]);
            {error, {already_started, _Pid}} ->
                logger:info("[app-martha] Store ~p already running", [StoreId]);
            {error, Reason} ->
                logger:error("[app-martha] Failed to start store ~p: ~p", [StoreId, Reason])
        end
    end, ?EXTRA_STORES).

start_store_subscriptions(StoreIds) ->
    lists:foreach(fun(StoreId) ->
        case evoq_store_subscription:start_link(StoreId) of
            {ok, _Pid} ->
                logger:info("[app-martha] Store subscription ready for ~p", [StoreId]);
            {error, Reason} ->
                logger:warning("[app-martha] Store subscription failed for ~p: ~p",
                               [StoreId, Reason])
        end
    end, StoreIds).
