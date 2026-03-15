%%% @doc ETS store for knowledge graph read models.
%%%
%%% Creates and owns the named ETS table for knowledge graphs.
%%% Query functions read directly from ETS (no gen_server:call needed).
%%% @end
-module(project_knowledge_graph_store).
-behaviour(gen_server).

-include_lib("guide_knowledge_graph/include/knowledge_graph_status.hrl").

-export([start_link/0]).
-export([get_graph/1, get_entities/1, get_insights/1, search_entities/2]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(TABLE, project_knowledge_graph).

%%====================================================================
%% API
%%====================================================================

-spec start_link() -> {ok, pid()} | {error, term()}.
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

-spec get_graph(binary()) -> {ok, map()} | {error, not_found}.
get_graph(VentureId) ->
    case table_exists(?TABLE) of
        false -> {error, not_found};
        true ->
            case ets:lookup(?TABLE, VentureId) of
                [{_, G}] -> {ok, G};
                [] -> {error, not_found}
            end
    end.

-spec get_entities(binary()) -> {ok, [map()]}.
get_entities(VentureId) ->
    case table_exists(?TABLE) of
        false -> {ok, []};
        true ->
            case ets:lookup(?TABLE, VentureId) of
                [{_, #{entities := Entities}}] ->
                    {ok, maps:values(Entities)};
                [] ->
                    {ok, []}
            end
    end.

-spec get_insights(binary()) -> {ok, [map()]}.
get_insights(VentureId) ->
    case table_exists(?TABLE) of
        false -> {ok, []};
        true ->
            case ets:lookup(?TABLE, VentureId) of
                [{_, #{insights := Insights}}] ->
                    %% Filter out superseded insights by default
                    Active = [I || I <- Insights,
                                   maps:get(superseded, I, false) =:= false],
                    {ok, Active};
                [] ->
                    {ok, []}
            end
    end.

-spec search_entities(binary(), binary()) -> {ok, [map()]}.
search_entities(VentureId, Query) ->
    case table_exists(?TABLE) of
        false -> {ok, []};
        true ->
            case ets:lookup(?TABLE, VentureId) of
                [{_, #{entities := Entities}}] ->
                    LowerQuery = string:lowercase(Query),
                    Matches = maps:fold(fun(_Id, Entity, Acc) ->
                        Name = string:lowercase(maps:get(name, Entity, <<>>)),
                        Desc = string:lowercase(maps:get(description, Entity, <<>>)),
                        case binary:match(Name, LowerQuery) of
                            {_, _} -> [Entity | Acc];
                            nomatch ->
                                case binary:match(Desc, LowerQuery) of
                                    {_, _} -> [Entity | Acc];
                                    nomatch -> Acc
                                end
                        end
                    end, [], Entities),
                    {ok, Matches};
                [] ->
                    {ok, []}
            end
    end.

%%====================================================================
%% Internal
%%====================================================================

table_exists(Table) ->
    ets:info(Table) =/= undefined.

%%====================================================================
%% gen_server callbacks
%%====================================================================

init([]) ->
    ?TABLE = ets:new(?TABLE, [set, public, named_table, {read_concurrency, true}]),
    {ok, #{}}.

handle_call(_Req, _From, State) -> {reply, {error, unknown_call}, State}.
handle_cast(_Msg, State) -> {noreply, State}.
handle_info(_Info, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
