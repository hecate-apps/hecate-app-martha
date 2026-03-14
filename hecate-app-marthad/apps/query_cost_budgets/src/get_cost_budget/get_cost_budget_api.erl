%%% @doc API handler: GET /api/cost-budgets/:venture_id and GET /api/cost-budgets
%%%
%%% Returns a single cost budget by venture ID, or lists all budgets.
%%% @end
-module(get_cost_budget_api).

-export([init/2, routes/0]).

routes() ->
    [{"/api/cost-budgets/:venture_id", ?MODULE, []},
     {"/api/cost-budgets", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    case cowboy_req:binding(venture_id, Req0, undefined) of
        undefined ->
            handle_list(Req0);
        VentureId ->
            handle_get_by_id(VentureId, Req0)
    end.

handle_get_by_id(VentureId, Req0) ->
    case project_cost_budgets_store:get_budget(VentureId) of
        {ok, Budget} ->
            hecate_plugin_api:json_ok(Budget, Req0);
        {error, not_found} ->
            hecate_plugin_api:json_error(404, <<"Cost budget not found">>, Req0)
    end.

handle_list(Req0) ->
    case project_cost_budgets_store:list_budgets() of
        {ok, Items} ->
            hecate_plugin_api:json_ok(#{items => Items}, Req0);
        {error, Reason} ->
            hecate_plugin_api:json_error(500, Reason, Req0)
    end.
