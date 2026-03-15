-module(project_divisions_store).
-behaviour(gen_server).

-include_lib("guide_division_lifecycle/include/division_lifecycle_status.hrl").
-include_lib("guide_division_lifecycle/include/kanban_card_status.hrl").

-export([start_link/0]).

%% Divisions
-export([get_division/1, list_divisions_by_venture/1, list_divisions/0]).
%% Storming
-export([list_designed_aggregates/1, list_designed_events/1,
         list_planned_desks/1, list_planned_dependencies/1]).
%% Kanban
-export([list_kanban_cards/1, list_kanban_cards_by_status/2]).
%% Crafting
-export([list_generated_modules/1, list_generated_tests/1,
         list_test_suites/1, list_test_results/1,
         list_releases/1, list_delivery_stages/1]).

-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(DIVISIONS, project_divisions_divisions).
-define(DESIGNED_AGGREGATES, project_divisions_designed_aggregates).
-define(DESIGNED_EVENTS, project_divisions_designed_events).
-define(PLANNED_DESKS, project_divisions_planned_desks).
-define(PLANNED_DEPS, project_divisions_planned_deps).
-define(KANBAN_CARDS, project_divisions_kanban_cards).
-define(GENERATED_MODULES, project_divisions_generated_modules).
-define(GENERATED_TESTS, project_divisions_generated_tests).
-define(TEST_SUITES, project_divisions_test_suites).
-define(TEST_RESULTS, project_divisions_test_results).
-define(RELEASES, project_divisions_releases).
-define(DELIVERY_STAGES, project_divisions_delivery_stages).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

%% --- Divisions ---

-spec get_division(binary()) -> {ok, map()} | {error, not_found}.
get_division(DivisionId) ->
    case table_exists(?DIVISIONS) of
        false -> {error, not_found};
        true ->
            case ets:lookup(?DIVISIONS, DivisionId) of
                [{_, V}] -> {ok, V};
                [] -> {error, not_found}
            end
    end.

-spec list_divisions_by_venture(binary()) -> {ok, [map()]}.
list_divisions_by_venture(VentureId) ->
    case table_exists(?DIVISIONS) of
        false -> {ok, []};
        true ->
            All = [D || {_, #{venture_id := V} = D} <- ets:tab2list(?DIVISIONS),
                        V =:= VentureId],
            Sorted = lists:sort(fun(A, B) ->
                maps:get(initiated_at, A, 0) >= maps:get(initiated_at, B, 0)
            end, All),
            {ok, Sorted}
    end.

-spec list_divisions() -> {ok, [map()]}.
list_divisions() ->
    case table_exists(?DIVISIONS) of
        false -> {ok, []};
        true ->
            All = [D || {_, D} <- ets:tab2list(?DIVISIONS)],
            Sorted = lists:sort(fun(A, B) ->
                maps:get(initiated_at, A, 0) >= maps:get(initiated_at, B, 0)
            end, All),
            {ok, Sorted}
    end.

%% --- Storming ---

-spec list_designed_aggregates(binary()) -> {ok, [map()]}.
list_designed_aggregates(DivisionId) ->
    case table_exists(?DESIGNED_AGGREGATES) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?DESIGNED_AGGREGATES), D =:= DivisionId],
            {ok, All}
    end.

-spec list_designed_events(binary()) -> {ok, [map()]}.
list_designed_events(DivisionId) ->
    case table_exists(?DESIGNED_EVENTS) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?DESIGNED_EVENTS), D =:= DivisionId],
            {ok, All}
    end.

-spec list_planned_desks(binary()) -> {ok, [map()]}.
list_planned_desks(DivisionId) ->
    case table_exists(?PLANNED_DESKS) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?PLANNED_DESKS), D =:= DivisionId],
            {ok, All}
    end.

-spec list_planned_dependencies(binary()) -> {ok, [map()]}.
list_planned_dependencies(DivisionId) ->
    case table_exists(?PLANNED_DEPS) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?PLANNED_DEPS), D =:= DivisionId],
            {ok, All}
    end.

%% --- Kanban ---

-spec list_kanban_cards(binary()) -> {ok, [map()]}.
list_kanban_cards(DivisionId) ->
    case table_exists(?KANBAN_CARDS) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?KANBAN_CARDS), D =:= DivisionId],
            {ok, All}
    end.

-spec list_kanban_cards_by_status(binary(), non_neg_integer()) -> {ok, [map()]}.
list_kanban_cards_by_status(DivisionId, StatusFilter) ->
    case table_exists(?KANBAN_CARDS) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, #{status := S} = V} <- ets:tab2list(?KANBAN_CARDS),
                        D =:= DivisionId, S =:= StatusFilter],
            {ok, All}
    end.

%% --- Crafting ---

-spec list_generated_modules(binary()) -> {ok, [map()]}.
list_generated_modules(DivisionId) ->
    case table_exists(?GENERATED_MODULES) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?GENERATED_MODULES), D =:= DivisionId],
            {ok, All}
    end.

-spec list_generated_tests(binary()) -> {ok, [map()]}.
list_generated_tests(DivisionId) ->
    case table_exists(?GENERATED_TESTS) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?GENERATED_TESTS), D =:= DivisionId],
            {ok, All}
    end.

-spec list_test_suites(binary()) -> {ok, [map()]}.
list_test_suites(DivisionId) ->
    case table_exists(?TEST_SUITES) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?TEST_SUITES), D =:= DivisionId],
            {ok, All}
    end.

-spec list_test_results(binary()) -> {ok, [map()]}.
list_test_results(DivisionId) ->
    case table_exists(?TEST_RESULTS) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?TEST_RESULTS), D =:= DivisionId],
            {ok, All}
    end.

-spec list_releases(binary()) -> {ok, [map()]}.
list_releases(DivisionId) ->
    case table_exists(?RELEASES) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?RELEASES), D =:= DivisionId],
            {ok, All}
    end.

-spec list_delivery_stages(binary()) -> {ok, [map()]}.
list_delivery_stages(DivisionId) ->
    case table_exists(?DELIVERY_STAGES) of
        false -> {ok, []};
        true ->
            All = [V || {{D, _}, V} <- ets:tab2list(?DELIVERY_STAGES), D =:= DivisionId],
            {ok, All}
    end.

%% --- Internal ---

table_exists(Table) ->
    ets:info(Table) =/= undefined.

%% --- gen_server ---

init([]) ->
    Tables = [
        ?DIVISIONS, ?DESIGNED_AGGREGATES, ?DESIGNED_EVENTS,
        ?PLANNED_DESKS, ?PLANNED_DEPS, ?KANBAN_CARDS,
        ?GENERATED_MODULES, ?GENERATED_TESTS, ?TEST_SUITES,
        ?TEST_RESULTS, ?RELEASES, ?DELIVERY_STAGES
    ],
    lists:foreach(fun(T) ->
        T = ets:new(T, [set, public, named_table, {read_concurrency, true}])
    end, Tables),
    {ok, #{}}.

handle_call(_Req, _From, State) -> {reply, {error, unknown_call}, State}.
handle_cast(_Msg, State) -> {noreply, State}.
handle_info(_Info, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
