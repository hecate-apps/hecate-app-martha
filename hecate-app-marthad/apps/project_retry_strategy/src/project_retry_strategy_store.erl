%%% @doc ETS-backed read model store for retry strategies.
%%% Key: session_id, Value: retry state map.
-module(project_retry_strategy_store).
-behaviour(gen_server).

-export([start_link/0, get_retry/1, list_retries/1]).
-export([init/1, handle_call/3, handle_cast/2]).

-define(TABLE, project_retry_strategy).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

%% Query functions — read directly from ETS

-spec get_retry(binary()) -> {ok, map()} | {error, not_found}.
get_retry(SessionId) ->
    case table_exists(?TABLE) of
        false -> {error, not_found};
        true ->
            case ets:lookup(?TABLE, SessionId) of
                [{_, Data}] -> {ok, Data};
                [] -> {error, not_found}
            end
    end.

-spec list_retries(binary()) -> {ok, [map()]}.
list_retries(VentureId) ->
    case table_exists(?TABLE) of
        false -> {ok, []};
        true ->
            All = ets:tab2list(?TABLE),
            Filtered = [V || {_, V} <- All,
                             maps:get(<<"venture_id">>, V, maps:get(venture_id, V, <<>>)) =:= VentureId],
            {ok, Filtered}
    end.

%% Internal

table_exists(Table) ->
    ets:info(Table) =/= undefined.

%% gen_server callbacks

init([]) ->
    ?TABLE = ets:new(?TABLE, [set, public, named_table, {read_concurrency, true}]),
    {ok, #{}}.

handle_call(_Req, _From, State) ->
    {reply, {error, unknown_call}, State}.

handle_cast(_Msg, State) ->
    {noreply, State}.
