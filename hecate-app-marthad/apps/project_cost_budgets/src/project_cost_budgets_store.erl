%%% @doc ETS-backed read model facade for the cost budgets domain.
%%%
%%% Single named ETS table:
%%%   - cost_budgets (keyed by venture_id)
%%%
%%% Creates the table on start_link, then projections join it
%%% via evoq_read_model_ets shared named table support.
%%% @end
-module(project_cost_budgets_store).
-behaviour(gen_server).

-include_lib("guard_cost_budget/include/cost_budget_status.hrl").

-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2]).

%% Budget queries
-export([get_budget/1, list_budgets/0]).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    ets:new(cost_budgets, [public, named_table, set, {read_concurrency, true}]),
    {ok, #{}}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.

%% -- Budget queries --

get_budget(VentureId) ->
    case table_exists(cost_budgets) of
        false -> {error, not_found};
        true ->
            case ets:lookup(cost_budgets, VentureId) of
                [{_, Budget}] -> {ok, Budget};
                [] -> {error, not_found}
            end
    end.

list_budgets() ->
    case table_exists(cost_budgets) of
        false -> {ok, []};
        true ->
            All = ets:tab2list(cost_budgets),
            Items = [B || {_K, B} <- All],
            {ok, Items}
    end.

%% -- Internal --

table_exists(Table) ->
    ets:info(Table) =/= undefined.
