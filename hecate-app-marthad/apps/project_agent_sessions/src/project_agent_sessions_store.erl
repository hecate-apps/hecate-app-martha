%%% @doc ETS store for project_agent_sessions read models.
%%%
%%% Creates and owns named ETS tables for agent conversation turns
%%% and session lifecycle status.
%%% Query functions read directly from ETS (no gen_server:call needed).
-module(project_agent_sessions_store).
-behaviour(gen_server).

-export([start_link/0]).

%% Turns
-export([list_turns_by_session/1,
         get_turn/2,
         count_turns/1,
         total_tokens_by_session/1,
         list_turns_by_venture/1]).

%% Sessions
-export([get_session/1,
         list_sessions_by_venture/1,
         list_sessions_by_division/1,
         list_sessions_by_role/1,
         list_active_sessions/0]).

-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(TURNS, project_agent_sessions_turns).
-define(SESSIONS, project_agent_sessions_sessions).

%%====================================================================
%% API
%%====================================================================

-spec start_link() -> {ok, pid()} | {error, term()}.
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

%% --- Turns ---

-spec list_turns_by_session(binary()) -> {ok, [map()]}.
list_turns_by_session(SessionId) ->
    All = [T || {{S, _N, _D}, T} <- ets:tab2list(?TURNS),
                S =:= SessionId],
    Sorted = lists:sort(fun(A, B) ->
        {maps:get(turn_number, A, 0), maps:get(timestamp, A, 0)} =<
        {maps:get(turn_number, B, 0), maps:get(timestamp, B, 0)}
    end, All),
    {ok, Sorted}.

-spec get_turn(binary(), non_neg_integer()) -> {ok, [map()]} | {error, not_found}.
get_turn(SessionId, TurnNumber) ->
    Matches = [T || {{S, N, _D}, T} <- ets:tab2list(?TURNS),
                    S =:= SessionId, N =:= TurnNumber],
    case Matches of
        [] -> {error, not_found};
        _ ->
            Sorted = lists:sort(fun(A, B) ->
                maps:get(timestamp, A, 0) =< maps:get(timestamp, B, 0)
            end, Matches),
            {ok, Sorted}
    end.

-spec count_turns(binary()) -> non_neg_integer().
count_turns(SessionId) ->
    length([1 || {{S, _N, _D}, _T} <- ets:tab2list(?TURNS),
                 S =:= SessionId]).

-spec total_tokens_by_session(binary()) -> {non_neg_integer(), non_neg_integer()}.
total_tokens_by_session(SessionId) ->
    Turns = [T || {{S, _N, _D}, T} <- ets:tab2list(?TURNS),
                  S =:= SessionId],
    lists:foldl(fun(T, {InAcc, OutAcc}) ->
        {InAcc + maps:get(tokens_in, T, 0),
         OutAcc + maps:get(tokens_out, T, 0)}
    end, {0, 0}, Turns).

-spec list_turns_by_venture(binary()) -> {ok, [map()]}.
list_turns_by_venture(VentureId) ->
    All = [T || {_Key, #{venture_id := V} = T} <- ets:tab2list(?TURNS),
                V =:= VentureId],
    Sorted = lists:sort(fun(A, B) ->
        maps:get(timestamp, A, 0) =< maps:get(timestamp, B, 0)
    end, All),
    {ok, Sorted}.

%% --- Sessions ---

-spec get_session(binary()) -> {ok, map()} | {error, not_found}.
get_session(SessionId) ->
    case ets:lookup(?SESSIONS, SessionId) of
        [{_, Session}] -> {ok, Session};
        [] -> {error, not_found}
    end.

-spec list_sessions_by_venture(binary()) -> {ok, [map()]}.
list_sessions_by_venture(VentureId) ->
    All = [S || {_Key, #{venture_id := V} = S} <- ets:tab2list(?SESSIONS),
                V =:= VentureId],
    {ok, sort_by_initiated_at(All)}.

-spec list_sessions_by_division(binary()) -> {ok, [map()]}.
list_sessions_by_division(DivisionId) ->
    All = [S || {_Key, #{division_id := D} = S} <- ets:tab2list(?SESSIONS),
                D =:= DivisionId],
    {ok, sort_by_initiated_at(All)}.

-spec list_sessions_by_role(binary()) -> {ok, [map()]}.
list_sessions_by_role(AgentRole) ->
    All = [S || {_Key, #{agent_role := R} = S} <- ets:tab2list(?SESSIONS),
                R =:= AgentRole],
    {ok, sort_by_initiated_at(All)}.

-spec list_active_sessions() -> {ok, [map()]}.
list_active_sessions() ->
    All = [S || {_Key, #{archived_at := A} = S} <- ets:tab2list(?SESSIONS),
                A =:= undefined],
    {ok, sort_by_initiated_at(All)}.

%%====================================================================
%% gen_server callbacks
%%====================================================================

init([]) ->
    ?TURNS = ets:new(?TURNS, [set, public, named_table, {read_concurrency, true}]),
    ?SESSIONS = ets:new(?SESSIONS, [set, public, named_table, {read_concurrency, true}]),
    {ok, #{}}.

handle_call(_Req, _From, State) -> {reply, {error, unknown_call}, State}.
handle_cast(_Msg, State) -> {noreply, State}.
handle_info(_Info, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

%%====================================================================
%% Internal
%%====================================================================

sort_by_initiated_at(List) ->
    lists:sort(fun(A, B) ->
        maps:get(initiated_at, A, 0) =< maps:get(initiated_at, B, 0)
    end, List).
