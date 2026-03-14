%%% @doc Projection: cost budget lifecycle events -> cost_budgets ETS read model.
%%%
%%% Merged projection handling ALL cost budget events in a SINGLE
%%% gen_server to guarantee ordering. Keyed by venture_id.
%%% @end
-module(cost_budget_lifecycle_to_budgets).
-behaviour(evoq_projection).
-export([interested_in/0, init/1, project/4]).

-include_lib("guard_cost_budget/include/cost_budget_status.hrl").

-define(TABLE, cost_budgets).

interested_in() ->
    [<<"cost_budget_set_v1">>,
     <<"spending_recorded_v1">>,
     <<"cost_budget_warning_v1">>,
     <<"cost_budget_breached_v1">>,
     <<"cost_budget_adjusted_v1">>].

init(_Config) ->
    {ok, RM} = evoq_read_model:new(evoq_read_model_ets, #{name => ?TABLE}),
    {ok, #{}, RM}.

project(#{data := Data} = Event, _Metadata, State, RM) ->
    EventType = get_event_type(Event),
    case EventType of
        <<"cost_budget_set_v1">>      -> project_set(Data, State, RM);
        <<"spending_recorded_v1">>    -> project_spending(Data, State, RM);
        <<"cost_budget_warning_v1">>  -> project_warning(Data, State, RM);
        <<"cost_budget_breached_v1">> -> project_breached(Data, State, RM);
        <<"cost_budget_adjusted_v1">> -> project_adjusted(Data, State, RM);
        _                            -> {ok, State, RM}
    end.

%% --- Set: birth event, full entry ---

project_set(Data, State, RM) ->
    VentureId = gf(venture_id, Data),
    Status = evoq_bit_flags:set(evoq_bit_flags:set(0, ?CB_INITIATED), ?CB_ACTIVE),
    Entry = #{
        venture_id   => VentureId,
        budget_usd   => gf(budget_usd, Data),
        spent_usd    => 0.0,
        warning_pct  => gf(warning_pct, Data),
        model_policy => gf(model_policy, Data),
        status       => Status,
        status_label => <<"Active">>,
        pct_used     => 0.0,
        initiated_at => gf(initiated_at, Data)
    },
    {ok, RM2} = evoq_read_model:put(VentureId, Entry, RM),
    {ok, State, RM2}.

%% --- Spending recorded: update spent and percentage ---

project_spending(Data, State, RM) ->
    VentureId = gf(venture_id, Data),
    case evoq_read_model:get(VentureId, RM) of
        {ok, Existing} ->
            NewTotal = gf(new_total_usd, Data),
            BudgetUsd = maps:get(budget_usd, Existing),
            PctUsed = case BudgetUsd > 0 of
                true  -> NewTotal / BudgetUsd;
                false -> 0.0
            end,
            Updated = Existing#{
                spent_usd => NewTotal,
                pct_used  => PctUsed
            },
            {ok, RM2} = evoq_read_model:put(VentureId, Updated, RM),
            {ok, State, RM2};
        {error, not_found} ->
            {ok, State, RM}
    end.

%% --- Warning: update status ---

project_warning(Data, State, RM) ->
    VentureId = gf(venture_id, Data),
    case evoq_read_model:get(VentureId, RM) of
        {ok, Existing} ->
            NewStatus = evoq_bit_flags:set(maps:get(status, Existing), ?CB_WARNING),
            Updated = Existing#{
                status       => NewStatus,
                status_label => <<"Warning">>,
                warned_at    => gf(warned_at, Data)
            },
            {ok, RM2} = evoq_read_model:put(VentureId, Updated, RM),
            {ok, State, RM2};
        {error, not_found} ->
            {ok, State, RM}
    end.

%% --- Breached: update status ---

project_breached(Data, State, RM) ->
    VentureId = gf(venture_id, Data),
    case evoq_read_model:get(VentureId, RM) of
        {ok, Existing} ->
            NewStatus = evoq_bit_flags:set(maps:get(status, Existing), ?CB_BREACHED),
            Updated = Existing#{
                status       => NewStatus,
                status_label => <<"Breached">>,
                breached_at  => gf(breached_at, Data)
            },
            {ok, RM2} = evoq_read_model:put(VentureId, Updated, RM),
            {ok, State, RM2};
        {error, not_found} ->
            {ok, State, RM}
    end.

%% --- Adjusted: update budget, clear warning/breach flags ---

project_adjusted(Data, State, RM) ->
    VentureId = gf(venture_id, Data),
    case evoq_read_model:get(VentureId, RM) of
        {ok, Existing} ->
            NewBudgetUsd = gf(new_budget_usd, Data),
            SpentUsd = maps:get(spent_usd, Existing),
            PctUsed = case NewBudgetUsd > 0 of
                true  -> SpentUsd / NewBudgetUsd;
                false -> 0.0
            end,
            Status0 = evoq_bit_flags:unset(maps:get(status, Existing), ?CB_BREACHED),
            NewStatus = evoq_bit_flags:unset(Status0, ?CB_WARNING),
            Updated = Existing#{
                budget_usd   => NewBudgetUsd,
                status       => NewStatus,
                status_label => <<"Active">>,
                pct_used     => PctUsed,
                adjusted_at  => gf(adjusted_at, Data)
            },
            {ok, RM2} = evoq_read_model:put(VentureId, Updated, RM),
            {ok, State, RM2};
        {error, not_found} ->
            {ok, State, RM}
    end.

%% --- Internal ---

get_event_type(#{event_type := T}) -> T;
get_event_type(_) -> undefined.

gf(Key, Data) -> hecate_plugin_api:get_field(Key, Data).
