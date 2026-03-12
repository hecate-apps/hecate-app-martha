#!/usr/bin/env bash
set -euo pipefail

# Generate Tier 1 initiation PMs and Tier 2 gate auto-escalation PMs.
# Each PM is a gen_server subscribing to a source event and dispatching a command.

BASE="apps/orchestrate_agents/src"

##############################################################################
# Common boilerplate fragments
##############################################################################

gen_header() {
    local MOD="$1" DESC="$2" STORE="$3" EVENT_TYPE="$4"
    cat <<ERLANG
%%% @doc Process manager: ${DESC}.
%%% Subscribes to ${EVENT_TYPE} from ${STORE}.
-module(${MOD}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${EVENT_TYPE}">>).
-define(SUB_NAME, <<"${MOD}">>).
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
ERLANG
}

gen_get_value() {
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
##############################################################################

echo "=== Tier 1: Initiation PMs ==="

# --- on_venture_initiated_initiate_visionary ---
FILE="${BASE}/run_visionary/initiate_visionary/on_venture_initiated_initiate_visionary.erl"
echo "  GEN ${FILE}"
cat > "$FILE" <<ERLANG
$(gen_header on_venture_initiated_initiate_visionary \
    "on venture_initiated, initiate visionary" martha_store venture_initiated_v1)

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
                tier => <<"T1">>,
                initiated_by => <<"system:pm">>,
                input_context => get_value(description, Event)
            },
            case initiate_visionary_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_initiate_visionary:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated visionary session", [?MODULE]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate visionary: ~p",
                                          [?MODULE, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.
$(gen_get_value)
ERLANG

# --- on_venture_initiated_initiate_coordinator ---
FILE="${BASE}/run_coordinator/initiate_coordinator/on_venture_initiated_initiate_coordinator.erl"
echo "  GEN ${FILE}"
cat > "$FILE" <<ERLANG
$(gen_header on_venture_initiated_initiate_coordinator \
    "on venture_initiated, initiate coordinator" martha_store venture_initiated_v1)

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
                tier => <<"T2">>,
                initiated_by => <<"system:pm">>,
                input_context => get_value(description, Event)
            },
            case initiate_coordinator_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_initiate_coordinator:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated coordinator session", [?MODULE]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate coordinator: ~p",
                                          [?MODULE, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.
$(gen_get_value)
ERLANG

# --- on_venture_initiated_initiate_mentor ---
FILE="${BASE}/run_mentor/initiate_mentor/on_venture_initiated_initiate_mentor.erl"
echo "  GEN ${FILE}"
cat > "$FILE" <<ERLANG
$(gen_header on_venture_initiated_initiate_mentor \
    "on venture_initiated, initiate mentor" martha_store venture_initiated_v1)

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
                tier => <<"T1">>,
                initiated_by => <<"system:pm">>,
                input_context => get_value(description, Event)
            },
            case initiate_mentor_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_initiate_mentor:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated mentor session", [?MODULE]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate mentor: ~p",
                                          [?MODULE, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.
$(gen_get_value)
ERLANG

# --- on_vision_gate_passed_initiate_explorer ---
FILE="${BASE}/run_explorer/initiate_explorer/on_vision_gate_passed_initiate_explorer.erl"
echo "  GEN ${FILE}"
cat > "$FILE" <<ERLANG
$(gen_header on_vision_gate_passed_initiate_explorer \
    "on vision_gate_passed, initiate explorer" orchestration_store vision_gate_passed_v1)

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
                tier => <<"T1">>,
                initiated_by => <<"system:pm">>,
                input_context => get_value(notation_output, Event)
            },
            case initiate_explorer_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_initiate_explorer:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] initiated explorer session", [?MODULE]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to initiate explorer: ~p",
                                          [?MODULE, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.
$(gen_get_value)
ERLANG

# --- Team-formed PMs (stormer, architect, reviewer, delivery_manager) ---

gen_team_formed_pm() {
    local ROLE="$1" TIER="$2"
    local MOD="on_team_formed_initiate_${ROLE}"
    local INIT_CMD="initiate_${ROLE}_v1"
    local HANDLER="maybe_initiate_${ROLE}"
    local FILE="${BASE}/run_${ROLE}/initiate_${ROLE}/${MOD}.erl"

    echo "  GEN ${FILE}"
    cat > "$FILE" <<ERLANG
$(gen_header "${MOD}" "on team_formed, initiate ${ROLE}" orchestration_store team_formed_v1)

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
                    case ${HANDLER}:dispatch(Cmd) of
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
$(gen_get_value)
ERLANG
}

gen_team_formed_pm stormer          T1
gen_team_formed_pm architect        T2
gen_team_formed_pm reviewer         T1
gen_team_formed_pm delivery_manager T2

echo ""
echo "=== Done: 8 initiation PMs generated ==="
