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
-include_lib("guide_division_planning/include/planning_status.hrl").
-include_lib("guide_division_crafting/include/crafting_status.hrl").

-export([init/1, routes/0, store_config/0, static_dir/0, manifest/0, flag_maps/0]).

-spec init(map()) -> {ok, map()} | {error, term()}.
init(#{plugin_name := PluginName, store_id := StoreId, data_dir := DataDir}) ->
    logger:info("[app-martha] Initializing plugin ~s (store: ~p, data: ~s)",
                [PluginName, StoreId, DataDir]),
    persistent_term:put(app_martha_config, #{
        plugin_name => PluginName,
        store_id => StoreId,
        data_dir => DataDir
    }),
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
    app_marthad_api_routes:discover_routes().

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
        version => <<"0.2.0">>,
        description => <<"AI-Assisted Application Lifecycle">>,
        icon => <<"\xF0\x9F\xA7\x91\xE2\x80\x8D\xF0\x9F\x92\xBB"/utf8>>,
        tag => <<"martha-studio">>,
        min_sdk_version => <<"0.1.0">>
    }.

-spec flag_maps() -> #{binary() => evoq_bit_flags:flag_map()}.
flag_maps() ->
    #{
        <<"planning_status">> => ?PLANNING_FLAG_MAP,
        <<"crafting_status">> => ?CRAFTING_FLAG_MAP
    }.
