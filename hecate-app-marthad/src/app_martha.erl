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
-include_lib("guide_division_storming/include/storming_status.hrl").
-include_lib("guide_division_planning/include/planning_status.hrl").
-include_lib("guide_kanban_lifecycle/include/kanban_board_status.hrl").
-include_lib("guide_division_crafting/include/crafting_status.hrl").

-export([init/1, routes/0, store_config/0, static_dir/0, manifest/0, flag_maps/0]).

-define(DOMAIN_APPS, [
    guide_venture_lifecycle, project_ventures, query_ventures,
    guide_division_planning, guide_division_storming, guide_division_crafting,
    guide_kanban_lifecycle,
    orchestrate_agents, project_agent_sessions, query_agent_sessions,
    project_division_plannings, project_division_stormings,
    project_division_craftings, project_division_kanbans,
    query_division_plannings, query_division_stormings,
    query_division_craftings, query_division_kanbans
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
        version => <<"0.3.4">>,
        description => <<"AI-Assisted Application Lifecycle">>,
        icon => <<"dog2">>,
        tag => <<"martha-studio">>,
        min_sdk_version => <<"0.1.0">>
    }.

-spec flag_maps() -> #{binary() => evoq_bit_flags:flag_map()}.
flag_maps() ->
    #{
        <<"storming_status">> => ?STORMING_FLAG_MAP,
        <<"planning_status">> => ?PLANNING_FLAG_MAP,
        <<"kanban_status">> => ?BOARD_FLAG_MAP,
        <<"crafting_status">> => ?CRAFTING_FLAG_MAP
    }.

%%% Internal

strip_api_prefix({"/api" ++ Rest, Handler, Opts}) ->
    {Rest, Handler, Opts};
strip_api_prefix(Route) ->
    Route.
