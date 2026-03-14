%%% @doc Auto-discovery route handler for Martha API.
%%%
%%% Discovers all API handlers across Martha domain apps by looking
%%% for modules that export routes/0. Delegates incoming requests
%%% to the matching handler.
%%%
%%% This module acts as a Cowboy handler for /api/[...] and dispatches
%%% to the correct domain handler based on path matching.
%%% @end
-module(app_marthad_api_routes).

-export([init/2]).
-export([compile/0, discover_routes/0]).

%% Martha OTP apps that may contain API handlers.
-define(MARTHA_APPS, [
    hecate_app_marthad,
    martha,
    guide_venture_lifecycle, project_ventures, query_ventures,
    guide_division_lifecycle, project_divisions, query_divisions,
    orchestrate_agents, project_agent_sessions, query_agent_sessions,
    guide_knowledge_graph, project_knowledge_graph, query_knowledge_graph,
    guide_retry_strategy, project_retry_strategy, query_retry_strategy,
    guard_cost_budget, project_cost_budgets, query_cost_budgets
]).

%% @doc Cowboy handler init - dispatches to domain route handlers.
init(Req0, _State) ->
    %% Strip /api prefix and re-dispatch
    PathInfo = cowboy_req:path_info(Req0),
    Path = case PathInfo of
        undefined -> cowboy_req:path(Req0);
        Parts -> iolist_to_binary([<<"/">>, lists:join(<<"/">>, Parts)])
    end,
    case find_handler(Path, discover_routes()) of
        {ok, Handler, HandlerState} ->
            Handler:init(Req0, HandlerState);
        nomatch ->
            hecate_plugin_api:not_found(Req0)
    end.

%% @doc Compile all routes into a Cowboy dispatch table.
-spec compile() -> cowboy_router:dispatch_rules().
compile() ->
    cowboy_router:compile([{'_', discover_routes()}]).

%%% Internal

-spec discover_routes() -> [tuple()].
discover_routes() ->
    lists:flatmap(fun collect_app_routes/1, ?MARTHA_APPS).

collect_app_routes(App) ->
    Mods = app_modules(App),
    Handlers = [M || M <- Mods, M =/= ?MODULE, exports_routes(M)],
    lists:flatmap(fun(M) -> M:routes() end, Handlers).

app_modules(App) ->
    case application:get_key(App, modules) of
        {ok, Mods} -> Mods;
        _ -> []
    end.

exports_routes(Mod) ->
    code:ensure_loaded(Mod),
    erlang:function_exported(Mod, routes, 0).

find_handler(_Path, []) ->
    nomatch;
find_handler(Path, [{Pattern, Handler, HandlerState} | Rest]) ->
    case match_path(Path, Pattern) of
        true -> {ok, Handler, HandlerState};
        false -> find_handler(Path, Rest)
    end;
find_handler(Path, [_ | Rest]) ->
    find_handler(Path, Rest).

match_path(Path, Pattern) when is_binary(Pattern) ->
    Path =:= Pattern;
match_path(Path, Pattern) when is_list(Pattern) ->
    Path =:= list_to_binary(Pattern);
match_path(_, _) ->
    false.
