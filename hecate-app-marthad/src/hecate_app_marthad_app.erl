%%% @doc Hecate Martha daemon application.
%%%
%%% Standalone mode startup:
%%% 1. Ensures the namespace directory layout exists
%%% 2. Starts ReckonDB infrastructure and martha_store
%%% 3. Starts Cowboy on a Unix domain socket
%%% 4. Starts domain supervisors via app_martha_sup
%%%
%%% In-VM mode: hecate_plugin_loader calls app_martha:init/1 instead.
%%% The store is created by the loader, and routes are mounted by the
%%% daemon's cowboy instance.
%%% @end
-module(hecate_app_marthad_app).
-behaviour(application).

-include_lib("reckon_db/include/reckon_db.hrl").

-export([start/2, stop/1]).

%% reckon_db is excluded from dialyzer PLT (no debug_info in hex dep beams).
-dialyzer({nowarn_function, start_martha_store/0}).

start(_StartType, _StartArgs) ->
    ok = app_marthad_paths:ensure_layout(),
    ok = ensure_pg_scope(),
    ok = start_martha_store(),
    ok = start_cowboy(),
    logger:info("[hecate_app_marthad] Started, socket at ~s",
                [app_marthad_paths:socket_path("api.sock")]),
    app_martha_sup:start_link().

stop(_State) ->
    ok = cowboy:stop_listener(app_marthad_http),
    cleanup_socket(),
    ok.

%%% Internal

ensure_pg_scope() ->
    case pg:start_link(hecate_app_marthad) of
        {ok, _Pid} -> ok;
        {error, {already_started, _Pid}} -> ok
    end.

start_martha_store() ->
    DataDir = app_marthad_paths:reckon_path("martha"),
    ok = filelib:ensure_path(DataDir),
    Config = #store_config{
        store_id = martha_store,
        data_dir = DataDir,
        mode = single,
        writer_pool_size = 5,
        reader_pool_size = 5,
        gateway_pool_size = 2,
        options = #{}
    },
    case reckon_db_sup:start_store(Config) of
        {ok, _Pid} ->
            logger:info("[hecate_app_marthad] martha_store ready"),
            ok;
        {error, {already_started, _Pid}} ->
            logger:info("[hecate_app_marthad] martha_store already running"),
            ok;
        {error, Reason} ->
            logger:error("[hecate_app_marthad] Failed to start martha_store: ~p",
                        [Reason]),
            error({martha_store_start_failed, Reason})
    end.

start_cowboy() ->
    SocketPath = app_marthad_paths:socket_path("api.sock"),
    cleanup_socket_file(SocketPath),
    StaticDir = static_dir(),
    CoreRoutes = [
        {"/ui/[...]", cowboy_static, {dir, StaticDir, [{mimetypes, cow_mimetypes, all}]}}
    ],
    ApiRoutes = app_marthad_api_routes:discover_routes(),
    Dispatch = cowboy_router:compile([{'_', CoreRoutes ++ ApiRoutes}]),
    TransOpts = #{
        socket_opts => [{ifaddr, {local, SocketPath}}],
        num_acceptors => 5
    },
    ProtoOpts = #{
        env => #{dispatch => Dispatch}
    },
    {ok, _} = cowboy:start_clear(app_marthad_http, TransOpts, ProtoOpts),
    ok.

static_dir() ->
    PrivDir = code:priv_dir(hecate_app_marthad),
    filename:join(PrivDir, "static").

cleanup_socket() ->
    SocketPath = app_marthad_paths:socket_path("api.sock"),
    cleanup_socket_file(SocketPath).

cleanup_socket_file(Path) ->
    case file:delete(Path) of
        ok -> ok;
        {error, enoent} -> ok;
        {error, Reason} ->
            logger:warning("[hecate_app_marthad] Failed to remove socket ~s: ~p",
                          [Path, Reason]),
            ok
    end.
