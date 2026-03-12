#!/usr/bin/env bash
set -euo pipefail

# Fix the generated initiation PM files — they're missing the closing `end`
# for the outer case statement from the context extraction functions.

BASE="apps/orchestrate_agents/src"

fix_venture_pm() {
    local ROLE="$1" TRIGGER_EVENT="$2" TIER="$3" STORE="$4"
    local PM_NAME="on_${TRIGGER_EVENT}_initiate_${ROLE}"
    local INIT_CMD="initiate_${ROLE}_v1"
    local INIT_HANDLER="maybe_initiate_${ROLE}"
    local FILE="${BASE}/run_${ROLE}/initiate_${ROLE}/${PM_NAME}.erl"

    echo "  FIX  ${FILE}"
    cat > "$FILE" <<ERLANG
%%% @doc Process manager: on ${TRIGGER_EVENT}, initiate ${ROLE}.
%%% Subscribes to ${TRIGGER_EVENT} from ${STORE}.
-module(${PM_NAME}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${TRIGGER_EVENT}">>).
-define(SUB_NAME, <<"${PM_NAME}">>).
-define(STORE_ID, ${STORE}).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun process_event/1, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

%% Internal

process_event(RawEvent) ->
    Event = app_marthad_projection_event:to_map(RawEvent),
    VentureId = get_value(venture_id, Event),
    case VentureId of
        undefined ->
            logger:warning("[~s] missing venture_id in event", [?MODULE]);
        _ ->
            CmdParams = #{
                venture_id => VentureId,
                tier => <<"${TIER}">>,
                initiated_by => <<"system:pm">>,
                input_context => get_value(description, Event)
            },
            case ${INIT_CMD}:new(CmdParams) of
                {ok, Cmd} ->
                    case ${INIT_HANDLER}:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated ${ROLE} session", [?MODULE]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate ${ROLE}: ~p",
                                          [?MODULE, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG
}

fix_gate_passed_pm() {
    local ROLE="$1" SOURCE_EVENT="$2" TIER="$3"
    local PM_NAME="on_${SOURCE_EVENT}_initiate_${ROLE}"
    local INIT_CMD="initiate_${ROLE}_v1"
    local INIT_HANDLER="maybe_initiate_${ROLE}"
    local FILE="${BASE}/run_${ROLE}/initiate_${ROLE}/${PM_NAME}.erl"

    echo "  FIX  ${FILE}"
    cat > "$FILE" <<ERLANG
%%% @doc Process manager: on ${SOURCE_EVENT}, initiate ${ROLE}.
%%% Subscribes to ${SOURCE_EVENT} from orchestration_store.
-module(${PM_NAME}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${SOURCE_EVENT}">>).
-define(SUB_NAME, <<"${PM_NAME}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun process_event/1, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

%% Internal

process_event(RawEvent) ->
    Event = app_marthad_projection_event:to_map(RawEvent),
    VentureId = get_value(venture_id, Event),
    SessionId = get_value(session_id, Event),
    case VentureId of
        undefined ->
            logger:warning("[~s] missing venture_id in event", [?MODULE]);
        _ ->
            CmdParams = #{
                venture_id => VentureId,
                tier => <<"${TIER}">>,
                initiated_by => <<"system:pm">>,
                input_context => get_value(notation_output, Event)
            },
            case ${INIT_CMD}:new(CmdParams) of
                {ok, Cmd} ->
                    case ${INIT_HANDLER}:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated ${ROLE} from ~s", [?MODULE, SessionId]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate ${ROLE}: ~p",
                                          [?MODULE, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG
}

fix_team_formed_pm() {
    local ROLE="$1" TIER="$2"
    local PM_NAME="on_team_formed_initiate_${ROLE}"
    local INIT_CMD="initiate_${ROLE}_v1"
    local INIT_HANDLER="maybe_initiate_${ROLE}"
    local FILE="${BASE}/run_${ROLE}/initiate_${ROLE}/${PM_NAME}.erl"

    echo "  FIX  ${FILE}"
    cat > "$FILE" <<ERLANG
%%% @doc Process manager: on team_formed_v1, initiate ${ROLE}.
%%% Subscribes to team_formed_v1 from orchestration_store.
-module(${PM_NAME}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"team_formed_v1">>).
-define(SUB_NAME, <<"${PM_NAME}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun process_event/1, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

%% Internal

process_event(RawEvent) ->
    Event = app_marthad_projection_event:to_map(RawEvent),
    DivisionId = get_value(division_id, Event),
    VentureId = get_value(venture_id, Event),
    case {DivisionId, VentureId} of
        {undefined, _} ->
            logger:warning("[~s] missing division_id in event", [?MODULE]);
        {_, undefined} ->
            logger:warning("[~s] missing venture_id in event", [?MODULE]);
        _ ->
            CmdParams = #{
                venture_id => VentureId,
                division_id => DivisionId,
                tier => <<"${TIER}">>,
                initiated_by => <<"system:pm">>
            },
            case ${INIT_CMD}:new(CmdParams) of
                {ok, Cmd} ->
                    case ${INIT_HANDLER}:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated ${ROLE} for division ~s",
                                       [?MODULE, DivisionId]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate ${ROLE}: ~p",
                                          [?MODULE, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG
}

echo "=== Fixing initiation PM files ==="

# Venture-level
fix_venture_pm visionary    venture_initiated_v1 T1 martha_store
fix_venture_pm coordinator  venture_initiated_v1 T2 martha_store
fix_venture_pm mentor       venture_initiated_v1 T1 martha_store

# Gate-passed
fix_gate_passed_pm explorer vision_gate_passed_v1 T1

# Team-formed
fix_team_formed_pm stormer          T1
fix_team_formed_pm architect        T2
fix_team_formed_pm reviewer         T1
fix_team_formed_pm delivery_manager T2

echo "=== Done ==="
