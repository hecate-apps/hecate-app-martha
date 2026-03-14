%%% @doc Process Manager: cost_budget_breached_v1 -> notify via pg
%%%
%%% When a cost budget is breached, log a warning and broadcast
%%% to pg process group for frontend notification.
%%% @end
-module(on_budget_breached_pause_agents).
-behaviour(evoq_event_handler).
-export([interested_in/0, init/1, handle_event/4]).

interested_in() -> [<<"cost_budget_breached_v1">>].

init(_Config) -> {ok, #{}}.

handle_event(_EventType, Event, _Metadata, State) ->
    Data = maps:get(data, Event),
    VentureId = hecate_plugin_api:get_field(venture_id, Data),
    SpentUsd = hecate_plugin_api:get_field(spent_usd, Data),
    BudgetUsd = hecate_plugin_api:get_field(budget_usd, Data),

    logger:warning("[BUDGET BREACHED] Venture ~s spent $~.2f / $~.2f budget",
                    [VentureId, to_float(SpentUsd), to_float(BudgetUsd)]),

    %% Broadcast to pg group for frontend notification
    Members = pg:get_members(pg, cost_budget_breached_v1),
    Msg = {cost_budget_breached, VentureId, SpentUsd, BudgetUsd},
    lists:foreach(fun(Pid) -> Pid ! Msg end, Members),

    {ok, State}.

%% Internal
to_float(V) when is_float(V) -> V;
to_float(V) when is_integer(V) -> V * 1.0;
to_float(undefined) -> 0.0;
to_float(V) -> V.
