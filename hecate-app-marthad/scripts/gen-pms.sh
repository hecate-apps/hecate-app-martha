#!/usr/bin/env bash
set -euo pipefail

# Generate Process Manager modules for orchestrate_agents.
# Usage: ./scripts/gen-pms.sh

BASE="apps/orchestrate_agents/src"

##############################################################################
# HELPERS
##############################################################################

# get_value helper shared by all PMs
get_value_fn() {
cat <<'ERLANG'

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG
}

##############################################################################
# TIER 1: Initiation PMs
# Pattern: subscribe to source event, dispatch initiate_{role}_v1
##############################################################################

gen_initiate_pm() {
    local PM_NAME="$1"       # e.g. on_venture_initiated_initiate_visionary
    local SOURCE_STORE="$2"  # e.g. martha_store
    local SOURCE_EVENT="$3"  # e.g. venture_initiated_v1
    local TARGET_ROLE="$4"   # e.g. visionary
    local INIT_CMD="initiate_${TARGET_ROLE}_v1"
    local INIT_HANDLER="maybe_initiate_${TARGET_ROLE}"
    local TIER="$5"          # e.g. T1
    local CONTEXT_FIELDS="$6" # bash function name to call for context extraction

    local DIR="${BASE}/run_${TARGET_ROLE}/initiate_${TARGET_ROLE}"
    local FILE="${DIR}/${PM_NAME}.erl"

    if [ -f "$FILE" ]; then
        echo "  SKIP $FILE (exists)"
        return
    fi

    echo "  GEN  $FILE"

    cat > "$FILE" <<ERLANG
%%% @doc Process manager: on ${SOURCE_EVENT}, initiate ${TARGET_ROLE}.
%%% Subscribes to ${SOURCE_EVENT} from ${SOURCE_STORE}.
-module(${PM_NAME}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${SOURCE_EVENT}">>).
-define(SUB_NAME, <<"${PM_NAME}">>).
-define(STORE_ID, ${SOURCE_STORE}).

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
$(${CONTEXT_FIELDS} "$TARGET_ROLE" "$TIER")
    case ${INIT_CMD}:new(CmdParams) of
        {ok, Cmd} ->
            case ${INIT_HANDLER}:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:info("[~s] initiated ${TARGET_ROLE} session", [?MODULE]);
                {error, Reason} ->
                    logger:warning("[~s] failed to initiate ${TARGET_ROLE}: ~p",
                                  [?MODULE, Reason])
            end;
        {error, Reason} ->
            logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
    end.
$(get_value_fn)
ERLANG
}

# Context extraction for venture-level agents (visionary, coordinator, mentor)
venture_context() {
    local ROLE="$1"
    local TIER="$2"
    cat <<ERLANG
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
ERLANG
}

# Context extraction for gate-passed agents (explorer triggered by vision_gate_passed)
gate_passed_context() {
    local ROLE="$1"
    local TIER="$2"
    cat <<ERLANG
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
ERLANG
}

# Context extraction for team-formed agents (division-level: stormer, architect, reviewer, delivery_manager)
team_formed_context() {
    local ROLE="$1"
    local TIER="$2"
    cat <<ERLANG
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
ERLANG
}

##############################################################################
# TIER 2: Gate Auto-Escalation PMs
# Pattern: subscribe to {role}_completed_v1, dispatch escalate_{gate}_v1
##############################################################################

gen_escalate_pm() {
    local PM_NAME="$1"       # e.g. on_visionary_completed_escalate_vision_gate
    local SOURCE_EVENT="$2"  # e.g. visionary_completed_v1
    local ROLE="$3"          # e.g. visionary
    local GATE="$4"          # e.g. vision_gate
    local ESC_CMD="escalate_${GATE}_v1"
    local ESC_HANDLER="maybe_escalate_${GATE}"

    local DIR="${BASE}/run_${ROLE}/escalate_${GATE}"
    local FILE="${DIR}/${PM_NAME}.erl"

    if [ -f "$FILE" ]; then
        echo "  SKIP $FILE (exists)"
        return
    fi

    echo "  GEN  $FILE"

    cat > "$FILE" <<ERLANG
%%% @doc Process manager: on ${SOURCE_EVENT}, auto-escalate to ${GATE}.
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
    SessionId = get_value(session_id, Event),
    case SessionId of
        undefined ->
            logger:warning("[~s] missing session_id in event", [?MODULE]);
        _ ->
            CmdParams = #{session_id => SessionId},
            case ${ESC_CMD}:new(CmdParams) of
                {ok, Cmd} ->
                    case ${ESC_HANDLER}:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] escalated ~s to ${GATE}",
                                       [?MODULE, SessionId]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to escalate ~s: ~p",
                                          [?MODULE, SessionId, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.
$(get_value_fn)
ERLANG
}

##############################################################################
# MAIN — Generate all PMs
##############################################################################

echo "=== Tier 1: Initiation PMs ==="

# Venture-level agents (subscribe to martha_store)
gen_initiate_pm on_venture_initiated_initiate_visionary    martha_store venture_initiated_v1 visionary    T1 venture_context
gen_initiate_pm on_venture_initiated_initiate_coordinator  martha_store venture_initiated_v1 coordinator  T2 venture_context
gen_initiate_pm on_venture_initiated_initiate_mentor       martha_store venture_initiated_v1 mentor       T1 venture_context

# Explorer triggered by vision gate passed (orchestration_store)
gen_initiate_pm on_vision_gate_passed_initiate_explorer    orchestration_store vision_gate_passed_v1 explorer T1 gate_passed_context

# Division-level agents triggered by team_formed (orchestration_store)
gen_initiate_pm on_team_formed_initiate_stormer            orchestration_store team_formed_v1 stormer          T1 team_formed_context
gen_initiate_pm on_team_formed_initiate_architect           orchestration_store team_formed_v1 architect        T2 team_formed_context
gen_initiate_pm on_team_formed_initiate_reviewer            orchestration_store team_formed_v1 reviewer         T1 team_formed_context
gen_initiate_pm on_team_formed_initiate_delivery_manager    orchestration_store team_formed_v1 delivery_manager T2 team_formed_context

echo ""
echo "=== Tier 2: Gate Auto-Escalation PMs ==="

gen_escalate_pm on_visionary_completed_escalate_vision_gate    visionary_completed_v1 visionary vision_gate
gen_escalate_pm on_explorer_completed_escalate_boundary_gate   explorer_completed_v1  explorer  boundary_gate
gen_escalate_pm on_stormer_completed_escalate_design_gate      stormer_completed_v1   stormer   design_gate
gen_escalate_pm on_reviewer_completed_escalate_review_gate     reviewer_completed_v1  reviewer  review_gate

echo ""
echo "=== Done ==="
echo "Next: wire PMs into desk supervisors"
