#!/usr/bin/env bash
set -euo pipefail

# 1. Add dispatch/1 to all complete_{role} and fail_{role} handlers
# 2. Generate LLM runner PMs for all 12 roles

BASE="apps/orchestrate_agents/src"

ALL_ROLES=(visionary explorer stormer architect erlang_coder svelte_coder sql_coder tester reviewer coordinator delivery_manager mentor)

##############################################################################
# PART 1: Add dispatch/1 to complete/fail handlers
##############################################################################

add_complete_dispatch() {
    local ROLE="$1"
    local HANDLER="maybe_complete_${ROLE}"
    local CMD_MOD="complete_${ROLE}_v1"
    local FILE="${BASE}/run_${ROLE}/complete_${ROLE}/${HANDLER}.erl"

    if grep -q 'dispatch' "$FILE" 2>/dev/null; then
        echo "  SKIP ${HANDLER} (dispatch exists)"
        return
    fi

    echo "  ADD  dispatch/1 to ${HANDLER}"

    # Read existing content, inject include + export + dispatch function
    local TMPFILE
    TMPFILE=$(mktemp)

    # Add include and update export, then append dispatch
    sed \
        -e 's/-include("agent_session_state.hrl")./-include("agent_session_state.hrl").\n-include_lib("evoq\/include\/evoq.hrl")./' \
        -e 's/-export(\[handle\/2\])./-export([handle\/2, dispatch\/1])./' \
        "$FILE" > "$TMPFILE"

    # Append dispatch function
    cat >> "$TMPFILE" <<ERLANG

-spec dispatch(${CMD_MOD}:${CMD_MOD}()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = ${CMD_MOD}:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = complete_agent,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = ${CMD_MOD}:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => agent_orchestration_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    evoq_dispatcher:dispatch(EvoqCmd, Opts).
ERLANG

    mv "$TMPFILE" "$FILE"
}

add_fail_dispatch() {
    local ROLE="$1"
    local HANDLER="maybe_fail_${ROLE}"
    local CMD_MOD="fail_${ROLE}_v1"
    local FILE="${BASE}/run_${ROLE}/fail_${ROLE}/${HANDLER}.erl"

    if grep -q 'dispatch' "$FILE" 2>/dev/null; then
        echo "  SKIP ${HANDLER} (dispatch exists)"
        return
    fi

    echo "  ADD  dispatch/1 to ${HANDLER}"

    local TMPFILE
    TMPFILE=$(mktemp)

    sed \
        -e 's/-include("agent_session_state.hrl")./-include("agent_session_state.hrl").\n-include_lib("evoq\/include\/evoq.hrl")./' \
        -e 's/-export(\[handle\/2\])./-export([handle\/2, dispatch\/1])./' \
        "$FILE" > "$TMPFILE"

    cat >> "$TMPFILE" <<ERLANG

-spec dispatch(${CMD_MOD}:${CMD_MOD}()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = ${CMD_MOD}:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = fail_agent,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = ${CMD_MOD}:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => agent_orchestration_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    evoq_dispatcher:dispatch(EvoqCmd, Opts).
ERLANG

    mv "$TMPFILE" "$FILE"
}

echo "=== Part 1: Adding dispatch/1 to complete/fail handlers ==="

for ROLE in "${ALL_ROLES[@]}"; do
    add_complete_dispatch "$ROLE"
    add_fail_dispatch "$ROLE"
done

##############################################################################
# PART 2: Generate LLM Runner PMs
##############################################################################

gen_llm_runner_pm() {
    local ROLE="$1"
    local MOD="on_${ROLE}_initiated_run_${ROLE}_llm"
    local EVENT_TYPE="${ROLE}_initiated_v1"
    local COMPLETE_CMD="complete_${ROLE}_v1"
    local COMPLETE_HANDLER="maybe_complete_${ROLE}"
    local FAIL_CMD="fail_${ROLE}_v1"
    local FAIL_HANDLER="maybe_fail_${ROLE}"
    local DIR="${BASE}/run_${ROLE}/initiate_${ROLE}"
    local FILE="${DIR}/${MOD}.erl"

    if [ -f "$FILE" ]; then
        echo "  SKIP ${MOD} (exists)"
        return
    fi

    echo "  GEN  ${MOD}"

    cat > "$FILE" <<ERLANG
%%% @doc LLM runner PM: on ${ROLE} initiated, run LLM and complete/fail.
%%% Subscribes to ${EVENT_TYPE} from orchestration_store.
%%% Loads role spec, builds prompt, calls chat_to_llm, parses notation,
%%% then dispatches complete or fail command.
-module(${MOD}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${EVENT_TYPE}">>).
-define(SUB_NAME, <<"${MOD}">>).
-define(STORE_ID, orchestration_store).
-define(ROLE, <<"${ROLE}">>).

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
    Model = get_value(model, Event),
    InputContext = get_value(input_context, Event),
    spawn_link(fun() -> run_llm(SessionId, Model, InputContext) end).

run_llm(SessionId, Model, InputContext) ->
    case load_agent_role:load(?ROLE) of
        {ok, RoleContent} ->
            Messages = [
                #{role => <<"system">>, content => RoleContent},
                #{role => <<"user">>, content => ensure_binary(InputContext)}
            ],
            Opts = #{
                venture_id => <<"default">>,
                agent_id => SessionId
            },
            case chat_to_llm:chat(Model, Messages, Opts) of
                {ok, Response} ->
                    handle_llm_success(SessionId, Response);
                {error, Reason} ->
                    handle_llm_failure(SessionId, Reason)
            end;
        {error, Reason} ->
            handle_llm_failure(SessionId, {role_load_failed, Reason})
    end.

handle_llm_success(SessionId, Response) ->
    Content = extract_content(Response),
    TokensIn = extract_tokens_in(Response),
    TokensOut = extract_tokens_out(Response),
    {ParsedTerms, NotationOutput} = parse_notation(Content),
    CmdParams = #{
        session_id => SessionId,
        notation_output => NotationOutput,
        parsed_terms => ParsedTerms,
        tokens_in => TokensIn,
        tokens_out => TokensOut
    },
    case ${COMPLETE_CMD}:new(CmdParams) of
        {ok, Cmd} ->
            case ${COMPLETE_HANDLER}:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:info("[~s] completed ${ROLE} session ~s", [?MODULE, SessionId]);
                {error, Reason} ->
                    logger:warning("[~s] failed to dispatch complete for ~s: ~p",
                                  [?MODULE, SessionId, Reason])
            end;
        {error, Reason} ->
            logger:warning("[~s] failed to create complete command for ~s: ~p",
                          [?MODULE, SessionId, Reason])
    end.

handle_llm_failure(SessionId, Reason) ->
    ErrorBin = iolist_to_binary(io_lib:format("~p", [Reason])),
    CmdParams = #{
        session_id => SessionId,
        error_reason => ErrorBin,
        tokens_in => 0,
        tokens_out => 0
    },
    case ${FAIL_CMD}:new(CmdParams) of
        {ok, Cmd} ->
            case ${FAIL_HANDLER}:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:warning("[~s] ${ROLE} session ~s failed: ~s",
                                  [?MODULE, SessionId, ErrorBin]);
                {error, DispErr} ->
                    logger:error("[~s] failed to dispatch fail for ~s: ~p",
                               [?MODULE, SessionId, DispErr])
            end;
        {error, CmdErr} ->
            logger:error("[~s] failed to create fail command for ~s: ~p",
                        [?MODULE, SessionId, CmdErr])
    end.

extract_content(#{<<"message">> := #{<<"content">> := C}}) -> C;
extract_content(#{<<"content">> := [#{<<"text">> := T} | _]}) -> T;
extract_content(#{<<"content">> := C}) when is_binary(C) -> C;
extract_content(_) -> <<>>.

extract_tokens_in(#{<<"usage">> := #{<<"input_tokens">> := N}}) -> N;
extract_tokens_in(#{<<"prompt_eval_count">> := N}) -> N;
extract_tokens_in(_) -> 0.

extract_tokens_out(#{<<"usage">> := #{<<"output_tokens">> := N}}) -> N;
extract_tokens_out(#{<<"eval_count">> := N}) -> N;
extract_tokens_out(_) -> 0.

parse_notation(Content) when is_binary(Content), byte_size(Content) > 0 ->
    case martha_notation:parse(Content) of
        {ok, Terms} -> {Terms, Content};
        {error, _} -> {[], Content}
    end;
parse_notation(_) ->
    {[], <<>>}.

ensure_binary(V) when is_binary(V) -> V;
ensure_binary(undefined) -> <<>>;
ensure_binary(V) -> iolist_to_binary(io_lib:format("~p", [V])).

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG
}

echo ""
echo "=== Part 2: Generating LLM Runner PMs ==="

for ROLE in "${ALL_ROLES[@]}"; do
    gen_llm_runner_pm "$ROLE"
done

echo ""
echo "=== Done ==="
echo "Next: wire LLM runner PMs into initiate_{role}_sup supervisors"
