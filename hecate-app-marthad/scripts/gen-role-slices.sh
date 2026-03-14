#!/usr/bin/env bash
set -euo pipefail

# Generate per-role desk slices for orchestrate_agents.
# Uses visionary as the template, substitutes role-specific names.
#
# Usage: ./scripts/gen-role-slices.sh
#
# Roles and their properties:
#   standard:       architect, erlang_coder, svelte_coder, sql_coder, tester, delivery_manager
#   gated:          explorer(boundary_gate), stormer(design_gate), reviewer(review_gate)
#   conversational: coordinator, mentor
#   done:           visionary (already created manually)

BASE="apps/orchestrate_agents/src"

# --- Template functions ---

gen_initiate_command() {
    local role="$1" prefix="$2"
    local mod="initiate_${role}_v1"
    local rec="initiate_${role}_v1"
    local dir="${BASE}/run_${role}/initiate_${role}"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Initiates a ${role} agent session.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1,
         get_initiated_by/1, get_input_context/1]).

-record(${rec}, {
    session_id    :: binary(),
    venture_id    :: binary(),
    tier          :: binary() | undefined,
    initiated_by  :: binary() | undefined,
    input_context :: binary() | undefined
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{venture_id := VentureId} = Params) when is_binary(VentureId), byte_size(VentureId) > 0 ->
    SessionId = case maps:get(session_id, Params, undefined) of
        undefined -> generate_session_id();
        Sid -> Sid
    end,
    {ok, #${rec}{
        session_id = SessionId,
        venture_id = VentureId,
        tier = maps:get(tier, Params, <<"T1">>),
        initiated_by = maps:get(initiated_by, Params, undefined),
        input_context = maps:get(input_context, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{venture_id = V}) when not is_binary(V); byte_size(V) =:= 0 ->
    {error, invalid_venture_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"initiate_agent">>,
        <<"agent_role">> => <<"${role}">>,
        <<"session_id">> => Cmd#${rec}.session_id,
        <<"venture_id">> => Cmd#${rec}.venture_id,
        <<"tier">> => Cmd#${rec}.tier,
        <<"initiated_by">> => Cmd#${rec}.initiated_by,
        <<"input_context">> => Cmd#${rec}.input_context
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    VentureId = get_value(venture_id, Map),
    case VentureId of
        undefined -> {error, missing_required_fields};
        _ ->
            SessionId = case get_value(session_id, Map) of
                undefined -> generate_session_id();
                Sid -> Sid
            end,
            {ok, #${rec}{
                session_id = SessionId,
                venture_id = VentureId,
                tier = get_value(tier, Map, <<"T1">>),
                initiated_by = get_value(initiated_by, Map, undefined),
                input_context = get_value(input_context, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_venture_id(#${rec}{venture_id = V}) -> V.
get_tier(#${rec}{tier = V}) -> V.
get_initiated_by(#${rec}{initiated_by = V}) -> V.
get_input_context(#${rec}{input_context = V}) -> V.

%% Internal
generate_session_id() ->
    Rand = integer_to_binary(erlang:unique_integer([positive, monotonic])),
    <<"${prefix}-", Rand/binary>>.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_initiated_event() {
    local role="$1"
    local mod="${role}_initiated_v1"
    local rec="${role}_initiated_v1"
    local dir="${BASE}/run_${role}/initiate_${role}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when a ${role} agent session is initiated.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1, get_model/1,
         get_initiated_at/1, get_initiated_by/1, get_input_context/1]).

-record(${rec}, {
    session_id    :: binary(),
    agent_role    :: binary(),
    venture_id    :: binary(),
    division_id   :: binary() | undefined,
    tier          :: binary(),
    model         :: binary(),
    input_context :: binary() | undefined,
    initiated_at  :: integer(),
    initiated_by  :: binary() | undefined
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        tier = maps:get(tier, Params, <<"T1">>),
        model = maps:get(model, Params, <<>>),
        input_context = maps:get(input_context, Params, undefined),
        initiated_at = erlang:system_time(millisecond),
        initiated_by = maps:get(initiated_by, Params, undefined)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"division_id">> => E#${rec}.division_id,
        <<"tier">> => E#${rec}.tier,
        <<"model">> => E#${rec}.model,
        <<"input_context">> => E#${rec}.input_context,
        <<"initiated_at">> => E#${rec}.initiated_at,
        <<"initiated_by">> => E#${rec}.initiated_by
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                tier = get_value(tier, Map, <<"T1">>),
                model = get_value(model, Map, <<>>),
                input_context = get_value(input_context, Map, undefined),
                initiated_at = get_value(initiated_at, Map, 0),
                initiated_by = get_value(initiated_by, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_venture_id(#${rec}{venture_id = V}) -> V.
get_tier(#${rec}{tier = V}) -> V.
get_model(#${rec}{model = V}) -> V.
get_initiated_at(#${rec}{initiated_at = V}) -> V.
get_initiated_by(#${rec}{initiated_by = V}) -> V.
get_input_context(#${rec}{input_context = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_initiate_handler() {
    local role="$1"
    local dir="${BASE}/run_${role}/initiate_${role}"
    cat > "${dir}/maybe_initiate_${role}.erl" <<ERLEOF
%%% @doc maybe_initiate_${role} handler.
%%% Validates command and produces ${role}_initiated_v1 event.
%%% Resolves tier to model via resolve_llm_model.
-module(maybe_initiate_${role}).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(initiate_${role}_v1:initiate_${role}_v1()) ->
    {ok, [${role}_initiated_v1:${role}_initiated_v1()]} | {error, term()}.
handle(Cmd) ->
    case initiate_${role}_v1:validate(Cmd) of
        ok ->
            Tier = initiate_${role}_v1:get_tier(Cmd),
            Model = resolve_model(Tier),
            Event = ${role}_initiated_v1:new(#{
                session_id => initiate_${role}_v1:get_session_id(Cmd),
                venture_id => initiate_${role}_v1:get_venture_id(Cmd),
                tier => Tier,
                model => Model,
                input_context => initiate_${role}_v1:get_input_context(Cmd),
                initiated_by => initiate_${role}_v1:get_initiated_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(initiate_${role}_v1:initiate_${role}_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = initiate_${role}_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = initiate_${role},
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = initiate_${role}_v1:to_map(Cmd),
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

%% Internal
resolve_model(Tier) ->
    case resolve_llm_model:resolve(Tier) of
        {ok, Model} -> Model;
        {error, _} -> error({no_llm_model_for_tier, Tier})
    end.
ERLEOF
}

gen_initiated_emitter() {
    local role="$1"
    local mod="${role}_initiated_v1_to_pg"
    local dir="${BASE}/run_${role}/initiate_${role}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${role}_initiated_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${role}_initiated_v1">>).
-define(PG_GROUP, ${role}_initiated_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_initiate_api() {
    local role="$1"
    local dir="${BASE}/run_${role}/initiate_${role}"
    cat > "${dir}/initiate_${role}_api.erl" <<ERLEOF
%%% @doc HTTP handler for initiating a ${role} agent session.
-module(initiate_${role}_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/${role}/initiate", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} -> do_initiate(Params, Req1);
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_initiate(Params, Req) ->
    VentureId = hecate_plugin_api:get_field(venture_id, Params),
    case VentureId of
        undefined ->
            hecate_plugin_api:bad_request(<<"venture_id required">>, Req);
        _ ->
            CmdParams = #{
                venture_id => VentureId,
                tier => hecate_plugin_api:get_field(tier, Params, <<"T1">>),
                initiated_by => hecate_plugin_api:get_field(initiated_by, Params),
                input_context => hecate_plugin_api:get_field(input_context, Params)
            },
            case initiate_${role}_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req);
                {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
            end
    end.

dispatch(Cmd, Req) ->
    case maybe_initiate_${role}:dispatch(Cmd) of
        {ok, Version, EventMaps} ->
            SessionId = initiate_${role}_v1:get_session_id(Cmd),
            hecate_plugin_api:json_ok(201, #{
                session_id => SessionId,
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
ERLEOF
}

gen_initiate_sup() {
    local role="$1"
    local dir="${BASE}/run_${role}/initiate_${role}"
    cat > "${dir}/initiate_${role}_sup.erl" <<ERLEOF
%%% @doc Supervisor for initiate_${role} desk.
-module(initiate_${role}_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${role}_initiated_v1_to_pg,
          start => {${role}_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker}

        %% PMs added here:
        %% on_{trigger}_initiate_${role} (trigger PM)
        %% on_${role}_initiated_run_${role}_llm (LLM runner PM)
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

gen_complete_command() {
    local role="$1"
    local mod="complete_${role}_v1"
    local rec="complete_${role}_v1"
    local dir="${BASE}/run_${role}/complete_${role}"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Completes a ${role} agent session with LLM output.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_notation_output/1, get_parsed_terms/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(${rec}, {
    session_id      :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    tokens_in       :: non_neg_integer(),
    tokens_out      :: non_neg_integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #${rec}{
        session_id = SessionId,
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"complete_agent">>,
        <<"agent_role">> => <<"${role}">>,
        <<"session_id">> => Cmd#${rec}.session_id,
        <<"notation_output">> => Cmd#${rec}.notation_output,
        <<"parsed_terms">> => Cmd#${rec}.parsed_terms,
        <<"tokens_in">> => Cmd#${rec}.tokens_in,
        <<"tokens_out">> => Cmd#${rec}.tokens_out
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_notation_output(#${rec}{notation_output = V}) -> V.
get_parsed_terms(#${rec}{parsed_terms = V}) -> V.
get_tokens_in(#${rec}{tokens_in = V}) -> V.
get_tokens_out(#${rec}{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_completed_event() {
    local role="$1"
    local mod="${role}_completed_v1"
    local rec="${role}_completed_v1"
    local dir="${BASE}/run_${role}/complete_${role}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when a ${role} agent session completes successfully.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1, get_model/1,
         get_completed_at/1, get_notation_output/1, get_parsed_terms/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(${rec}, {
    session_id      :: binary(),
    agent_role      :: binary(),
    venture_id      :: binary(),
    division_id     :: binary() | undefined,
    tier            :: binary(),
    model           :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    tokens_in       :: non_neg_integer(),
    tokens_out      :: non_neg_integer(),
    completed_at    :: integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        tier = maps:get(tier, Params, <<>>),
        model = maps:get(model, Params, <<>>),
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0),
        completed_at = erlang:system_time(millisecond)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"division_id">> => E#${rec}.division_id,
        <<"tier">> => E#${rec}.tier,
        <<"model">> => E#${rec}.model,
        <<"notation_output">> => E#${rec}.notation_output,
        <<"parsed_terms">> => E#${rec}.parsed_terms,
        <<"tokens_in">> => E#${rec}.tokens_in,
        <<"tokens_out">> => E#${rec}.tokens_out,
        <<"completed_at">> => E#${rec}.completed_at
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                tier = get_value(tier, Map, <<>>),
                model = get_value(model, Map, <<>>),
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0),
                completed_at = get_value(completed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_venture_id(#${rec}{venture_id = V}) -> V.
get_tier(#${rec}{tier = V}) -> V.
get_model(#${rec}{model = V}) -> V.
get_completed_at(#${rec}{completed_at = V}) -> V.
get_notation_output(#${rec}{notation_output = V}) -> V.
get_parsed_terms(#${rec}{parsed_terms = V}) -> V.
get_tokens_in(#${rec}{tokens_in = V}) -> V.
get_tokens_out(#${rec}{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_complete_handler() {
    local role="$1"
    local dir="${BASE}/run_${role}/complete_${role}"
    cat > "${dir}/maybe_complete_${role}.erl" <<ERLEOF
%%% @doc maybe_complete_${role} handler.
%%% Validates completion command and produces ${role}_completed_v1 event.
-module(maybe_complete_${role}).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(complete_${role}_v1:complete_${role}_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [${role}_completed_v1:${role}_completed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case complete_${role}_v1:validate(Cmd) of
        ok ->
            Event = ${role}_completed_v1:new(#{
                session_id => complete_${role}_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                tier => State#agent_session_state.tier,
                model => State#agent_session_state.model,
                notation_output => complete_${role}_v1:get_notation_output(Cmd),
                parsed_terms => complete_${role}_v1:get_parsed_terms(Cmd),
                tokens_in => complete_${role}_v1:get_tokens_in(Cmd),
                tokens_out => complete_${role}_v1:get_tokens_out(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLEOF
}

gen_completed_emitter() {
    local role="$1"
    local mod="${role}_completed_v1_to_pg"
    local dir="${BASE}/run_${role}/complete_${role}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${role}_completed_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${role}_completed_v1">>).
-define(PG_GROUP, ${role}_completed_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_complete_sup() {
    local role="$1"
    local dir="${BASE}/run_${role}/complete_${role}"
    cat > "${dir}/complete_${role}_sup.erl" <<ERLEOF
%%% @doc Supervisor for complete_${role} desk.
-module(complete_${role}_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${role}_completed_v1_to_pg,
          start => {${role}_completed_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

gen_fail_command() {
    local role="$1"
    local mod="fail_${role}_v1"
    local rec="fail_${role}_v1"
    local dir="${BASE}/run_${role}/fail_${role}"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Fails a ${role} agent session with error details.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_error_reason/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(${rec}, {
    session_id   :: binary(),
    error_reason :: binary() | undefined,
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #${rec}{
        session_id = SessionId,
        error_reason = maps:get(error_reason, Params, undefined),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"fail_agent">>,
        <<"agent_role">> => <<"${role}">>,
        <<"session_id">> => Cmd#${rec}.session_id,
        <<"error_reason">> => Cmd#${rec}.error_reason,
        <<"tokens_in">> => Cmd#${rec}.tokens_in,
        <<"tokens_out">> => Cmd#${rec}.tokens_out
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                error_reason = get_value(error_reason, Map, undefined),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_error_reason(#${rec}{error_reason = V}) -> V.
get_tokens_in(#${rec}{tokens_in = V}) -> V.
get_tokens_out(#${rec}{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_failed_event() {
    local role="$1"
    local mod="${role}_failed_v1"
    local rec="${role}_failed_v1"
    local dir="${BASE}/run_${role}/fail_${role}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when a ${role} agent session fails.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1, get_model/1,
         get_failed_at/1, get_error_reason/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(${rec}, {
    session_id   :: binary(),
    agent_role   :: binary(),
    venture_id   :: binary(),
    division_id  :: binary() | undefined,
    tier         :: binary(),
    model        :: binary(),
    error_reason :: binary() | undefined,
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer(),
    failed_at    :: integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        tier = maps:get(tier, Params, <<>>),
        model = maps:get(model, Params, <<>>),
        error_reason = maps:get(error_reason, Params, undefined),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0),
        failed_at = erlang:system_time(millisecond)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"division_id">> => E#${rec}.division_id,
        <<"tier">> => E#${rec}.tier,
        <<"model">> => E#${rec}.model,
        <<"error_reason">> => E#${rec}.error_reason,
        <<"tokens_in">> => E#${rec}.tokens_in,
        <<"tokens_out">> => E#${rec}.tokens_out,
        <<"failed_at">> => E#${rec}.failed_at
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                tier = get_value(tier, Map, <<>>),
                model = get_value(model, Map, <<>>),
                error_reason = get_value(error_reason, Map, undefined),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0),
                failed_at = get_value(failed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_venture_id(#${rec}{venture_id = V}) -> V.
get_tier(#${rec}{tier = V}) -> V.
get_model(#${rec}{model = V}) -> V.
get_failed_at(#${rec}{failed_at = V}) -> V.
get_error_reason(#${rec}{error_reason = V}) -> V.
get_tokens_in(#${rec}{tokens_in = V}) -> V.
get_tokens_out(#${rec}{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_fail_handler() {
    local role="$1"
    local dir="${BASE}/run_${role}/fail_${role}"
    cat > "${dir}/maybe_fail_${role}.erl" <<ERLEOF
%%% @doc maybe_fail_${role} handler.
%%% Validates fail command and produces ${role}_failed_v1 event.
-module(maybe_fail_${role}).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(fail_${role}_v1:fail_${role}_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [${role}_failed_v1:${role}_failed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case fail_${role}_v1:validate(Cmd) of
        ok ->
            Event = ${role}_failed_v1:new(#{
                session_id => fail_${role}_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                tier => State#agent_session_state.tier,
                model => State#agent_session_state.model,
                error_reason => fail_${role}_v1:get_error_reason(Cmd),
                tokens_in => fail_${role}_v1:get_tokens_in(Cmd),
                tokens_out => fail_${role}_v1:get_tokens_out(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLEOF
}

gen_failed_emitter() {
    local role="$1"
    local mod="${role}_failed_v1_to_pg"
    local dir="${BASE}/run_${role}/fail_${role}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${role}_failed_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${role}_failed_v1">>).
-define(PG_GROUP, ${role}_failed_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_fail_sup() {
    local role="$1"
    local dir="${BASE}/run_${role}/fail_${role}"
    cat > "${dir}/fail_${role}_sup.erl" <<ERLEOF
%%% @doc Supervisor for fail_${role} desk.
-module(fail_${role}_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${role}_failed_v1_to_pg,
          start => {${role}_failed_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

gen_run_sup() {
    local role="$1"
    local extra_children="${2:-}"
    local dir="${BASE}/run_${role}"
    cat > "${dir}/run_${role}_sup.erl" <<ERLEOF
%%% @doc Top-level supervisor for the ${role} agent role.
-module(run_${role}_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => initiate_${role}_sup,
          start => {initiate_${role}_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => complete_${role}_sup,
          start => {complete_${role}_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => fail_${role}_sup,
          start => {fail_${role}_sup, start_link, []},
          restart => permanent, type => supervisor}${extra_children}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

# --- Conversational desk generators ---

gen_complete_turn_command() {
    local role="$1"
    local mod="complete_${role}_turn_v1"
    local rec="complete_${role}_turn_v1"
    local dir="${BASE}/run_${role}/complete_${role}_turn"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Completes a turn for a conversational ${role} agent.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_agent_output/1, get_turn_number/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(${rec}, {
    session_id   :: binary(),
    agent_output :: binary() | undefined,
    turn_number  :: non_neg_integer(),
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #${rec}{
        session_id = SessionId,
        agent_output = maps:get(agent_output, Params, undefined),
        turn_number = maps:get(turn_number, Params, 1),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"complete_agent_turn">>,
        <<"agent_role">> => <<"${role}">>,
        <<"session_id">> => Cmd#${rec}.session_id,
        <<"agent_output">> => Cmd#${rec}.agent_output,
        <<"turn_number">> => Cmd#${rec}.turn_number,
        <<"tokens_in">> => Cmd#${rec}.tokens_in,
        <<"tokens_out">> => Cmd#${rec}.tokens_out
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_output = get_value(agent_output, Map, undefined),
                turn_number = get_value(turn_number, Map, 1),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_agent_output(#${rec}{agent_output = V}) -> V.
get_turn_number(#${rec}{turn_number = V}) -> V.
get_tokens_in(#${rec}{tokens_in = V}) -> V.
get_tokens_out(#${rec}{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_turn_completed_event() {
    local role="$1"
    local mod="${role}_turn_completed_v1"
    local rec="${role}_turn_completed_v1"
    local dir="${BASE}/run_${role}/complete_${role}_turn"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when a ${role} agent completes a conversational turn.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_agent_output/1, get_turn_number/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(${rec}, {
    session_id   :: binary(),
    agent_role   :: binary(),
    venture_id   :: binary(),
    agent_output :: binary() | undefined,
    turn_number  :: non_neg_integer(),
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer(),
    completed_at :: integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        agent_output = maps:get(agent_output, Params, undefined),
        turn_number = maps:get(turn_number, Params, 1),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0),
        completed_at = erlang:system_time(millisecond)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"agent_output">> => E#${rec}.agent_output,
        <<"turn_number">> => E#${rec}.turn_number,
        <<"tokens_in">> => E#${rec}.tokens_in,
        <<"tokens_out">> => E#${rec}.tokens_out,
        <<"completed_at">> => E#${rec}.completed_at
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                agent_output = get_value(agent_output, Map, undefined),
                turn_number = get_value(turn_number, Map, 1),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0),
                completed_at = get_value(completed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_agent_output(#${rec}{agent_output = V}) -> V.
get_turn_number(#${rec}{turn_number = V}) -> V.
get_tokens_in(#${rec}{tokens_in = V}) -> V.
get_tokens_out(#${rec}{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_complete_turn_handler() {
    local role="$1"
    local dir="${BASE}/run_${role}/complete_${role}_turn"
    cat > "${dir}/maybe_complete_${role}_turn.erl" <<ERLEOF
%%% @doc maybe_complete_${role}_turn handler.
%%% Validates turn completion and produces ${role}_turn_completed_v1 event.
-module(maybe_complete_${role}_turn).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(complete_${role}_turn_v1:complete_${role}_turn_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [${role}_turn_completed_v1:${role}_turn_completed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case complete_${role}_turn_v1:validate(Cmd) of
        ok ->
            Event = ${role}_turn_completed_v1:new(#{
                session_id => complete_${role}_turn_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                agent_output => complete_${role}_turn_v1:get_agent_output(Cmd),
                turn_number => complete_${role}_turn_v1:get_turn_number(Cmd),
                tokens_in => complete_${role}_turn_v1:get_tokens_in(Cmd),
                tokens_out => complete_${role}_turn_v1:get_tokens_out(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLEOF
}

gen_turn_completed_emitter() {
    local role="$1"
    local mod="${role}_turn_completed_v1_to_pg"
    local dir="${BASE}/run_${role}/complete_${role}_turn"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${role}_turn_completed_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${role}_turn_completed_v1">>).
-define(PG_GROUP, ${role}_turn_completed_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_complete_turn_sup() {
    local role="$1"
    local dir="${BASE}/run_${role}/complete_${role}_turn"
    cat > "${dir}/complete_${role}_turn_sup.erl" <<ERLEOF
%%% @doc Supervisor for complete_${role}_turn desk.
-module(complete_${role}_turn_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${role}_turn_completed_v1_to_pg,
          start => {${role}_turn_completed_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

gen_receive_input_command() {
    local role="$1"
    local mod="receive_${role}_input_v1"
    local rec="receive_${role}_input_v1"
    local dir="${BASE}/run_${role}/receive_${role}_input"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Receives new input for a conversational ${role} agent.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_input_content/1, get_input_by/1]).

-record(${rec}, {
    session_id    :: binary(),
    input_content :: binary() | undefined,
    input_by      :: binary() | undefined
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #${rec}{
        session_id = SessionId,
        input_content = maps:get(input_content, Params, undefined),
        input_by = maps:get(input_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"receive_agent_input">>,
        <<"agent_role">> => <<"${role}">>,
        <<"session_id">> => Cmd#${rec}.session_id,
        <<"input_content">> => Cmd#${rec}.input_content,
        <<"input_by">> => Cmd#${rec}.input_by
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                input_content = get_value(input_content, Map, undefined),
                input_by = get_value(input_by, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_input_content(#${rec}{input_content = V}) -> V.
get_input_by(#${rec}{input_by = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_input_received_event() {
    local role="$1"
    local mod="${role}_input_received_v1"
    local rec="${role}_input_received_v1"
    local dir="${BASE}/run_${role}/receive_${role}_input"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when a ${role} agent receives new input.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_input_content/1, get_input_by/1, get_received_at/1]).

-record(${rec}, {
    session_id    :: binary(),
    agent_role    :: binary(),
    venture_id    :: binary(),
    input_content :: binary() | undefined,
    input_by      :: binary() | undefined,
    received_at   :: integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        input_content = maps:get(input_content, Params, undefined),
        input_by = maps:get(input_by, Params, undefined),
        received_at = erlang:system_time(millisecond)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"input_content">> => E#${rec}.input_content,
        <<"input_by">> => E#${rec}.input_by,
        <<"received_at">> => E#${rec}.received_at
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                input_content = get_value(input_content, Map, undefined),
                input_by = get_value(input_by, Map, undefined),
                received_at = get_value(received_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_input_content(#${rec}{input_content = V}) -> V.
get_input_by(#${rec}{input_by = V}) -> V.
get_received_at(#${rec}{received_at = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_receive_input_handler() {
    local role="$1"
    local dir="${BASE}/run_${role}/receive_${role}_input"
    cat > "${dir}/maybe_receive_${role}_input.erl" <<ERLEOF
%%% @doc maybe_receive_${role}_input handler.
%%% Validates input and produces ${role}_input_received_v1 event.
-module(maybe_receive_${role}_input).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(receive_${role}_input_v1:receive_${role}_input_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [${role}_input_received_v1:${role}_input_received_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case receive_${role}_input_v1:validate(Cmd) of
        ok ->
            Event = ${role}_input_received_v1:new(#{
                session_id => receive_${role}_input_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                input_content => receive_${role}_input_v1:get_input_content(Cmd),
                input_by => receive_${role}_input_v1:get_input_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLEOF
}

gen_input_received_emitter() {
    local role="$1"
    local mod="${role}_input_received_v1_to_pg"
    local dir="${BASE}/run_${role}/receive_${role}_input"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${role}_input_received_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${role}_input_received_v1">>).
-define(PG_GROUP, ${role}_input_received_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_receive_input_sup() {
    local role="$1"
    local dir="${BASE}/run_${role}/receive_${role}_input"
    cat > "${dir}/receive_${role}_input_sup.erl" <<ERLEOF
%%% @doc Supervisor for receive_${role}_input desk.
-module(receive_${role}_input_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${role}_input_received_v1_to_pg,
          start => {${role}_input_received_v1_to_pg, start_link, []},
          restart => permanent, type => worker}

        %% PM added here:
        %% on_${role}_input_received_run_${role}_llm (resume LLM PM)
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

# --- Gate desk generators ---

gen_escalate_gate_command() {
    local role="$1" gate="$2"
    local mod="escalate_${gate}_v1"
    local rec="escalate_${gate}_v1"
    local dir="${BASE}/run_${role}/escalate_${gate}"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Escalates a completed ${role} session to the ${gate} for HITL review.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1]).

-record(${rec}, {
    session_id :: binary()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{session_id := SessionId}) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #${rec}{session_id = SessionId}};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"escalate_to_gate">>,
        <<"agent_role">> => <<"${role}">>,
        <<"gate_name">> => <<"${gate}">>,
        <<"session_id">> => Cmd#${rec}.session_id
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ -> {ok, #${rec}{session_id = SessionId}}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.

%% Internal
get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, undefined)
    end.
ERLEOF
}

gen_gate_escalated_event() {
    local role="$1" gate="$2"
    local mod="${gate}_escalated_v1"
    local rec="${gate}_escalated_v1"
    local dir="${BASE}/run_${role}/escalate_${gate}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when a ${role} session is escalated to ${gate}.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_gate_name/1, get_escalated_at/1,
         get_notation_output/1, get_parsed_terms/1]).

-record(${rec}, {
    session_id      :: binary(),
    agent_role      :: binary(),
    venture_id      :: binary(),
    division_id     :: binary() | undefined,
    gate_name       :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    escalated_at    :: integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"${gate}">>,
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        escalated_at = erlang:system_time(millisecond)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"division_id">> => E#${rec}.division_id,
        <<"gate_name">> => E#${rec}.gate_name,
        <<"notation_output">> => E#${rec}.notation_output,
        <<"parsed_terms">> => E#${rec}.parsed_terms,
        <<"escalated_at">> => E#${rec}.escalated_at
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"${gate}">>,
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                escalated_at = get_value(escalated_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_gate_name(#${rec}{gate_name = V}) -> V.
get_escalated_at(#${rec}{escalated_at = V}) -> V.
get_notation_output(#${rec}{notation_output = V}) -> V.
get_parsed_terms(#${rec}{parsed_terms = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_escalate_gate_handler() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}"
    cat > "${dir}/maybe_escalate_${gate}.erl" <<ERLEOF
%%% @doc maybe_escalate_${gate} handler.
%%% Produces ${gate}_escalated_v1 event from aggregate state.
-module(maybe_escalate_${gate}).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(escalate_${gate}_v1:escalate_${gate}_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [${gate}_escalated_v1:${gate}_escalated_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case escalate_${gate}_v1:validate(Cmd) of
        ok ->
            Event = ${gate}_escalated_v1:new(#{
                session_id => escalate_${gate}_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                notation_output => State#agent_session_state.notation_output,
                parsed_terms => State#agent_session_state.parsed_terms
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLEOF
}

gen_gate_escalated_emitter() {
    local role="$1" gate="$2"
    local mod="${gate}_escalated_v1_to_pg"
    local dir="${BASE}/run_${role}/escalate_${gate}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${gate}_escalated_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${gate}_escalated_v1">>).
-define(PG_GROUP, ${gate}_escalated_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_escalate_gate_sup() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}"
    cat > "${dir}/escalate_${gate}_sup.erl" <<ERLEOF
%%% @doc Supervisor for escalate_${gate} desk (includes pass/reject sub-desks).
-module(escalate_${gate}_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${gate}_escalated_v1_to_pg,
          start => {${gate}_escalated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => pass_${gate}_sup,
          start => {pass_${gate}_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => reject_${gate}_sup,
          start => {reject_${gate}_sup, start_link, []},
          restart => permanent, type => supervisor}

        %% PM added here:
        %% on_${role}_completed_escalate_${gate} (auto-escalate PM)
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

# --- Pass gate ---

gen_pass_gate_command() {
    local role="$1" gate="$2"
    local mod="pass_${gate}_v1"
    local rec="pass_${gate}_v1"
    local dir="${BASE}/run_${role}/escalate_${gate}/pass_${gate}"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Passes the ${gate} for a ${role} session.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_passed_by/1]).

-record(${rec}, {
    session_id :: binary(),
    passed_by  :: binary() | undefined
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #${rec}{
        session_id = SessionId,
        passed_by = maps:get(passed_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"pass_gate">>,
        <<"agent_role">> => <<"${role}">>,
        <<"gate_name">> => <<"${gate}">>,
        <<"session_id">> => Cmd#${rec}.session_id,
        <<"passed_by">> => Cmd#${rec}.passed_by
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                passed_by = get_value(passed_by, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_passed_by(#${rec}{passed_by = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_gate_passed_event() {
    local role="$1" gate="$2"
    local mod="${gate}_passed_v1"
    local rec="${gate}_passed_v1"
    local dir="${BASE}/run_${role}/escalate_${gate}/pass_${gate}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when the ${gate} is passed for a ${role} session.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_gate_name/1, get_passed_by/1, get_passed_at/1,
         get_notation_output/1, get_parsed_terms/1]).

-record(${rec}, {
    session_id      :: binary(),
    agent_role      :: binary(),
    venture_id      :: binary(),
    division_id     :: binary() | undefined,
    gate_name       :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    passed_by       :: binary() | undefined,
    passed_at       :: integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"${gate}">>,
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        passed_by = maps:get(passed_by, Params, undefined),
        passed_at = erlang:system_time(millisecond)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"division_id">> => E#${rec}.division_id,
        <<"gate_name">> => E#${rec}.gate_name,
        <<"notation_output">> => E#${rec}.notation_output,
        <<"parsed_terms">> => E#${rec}.parsed_terms,
        <<"passed_by">> => E#${rec}.passed_by,
        <<"passed_at">> => E#${rec}.passed_at
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"${gate}">>,
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                passed_by = get_value(passed_by, Map, undefined),
                passed_at = get_value(passed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_gate_name(#${rec}{gate_name = V}) -> V.
get_passed_by(#${rec}{passed_by = V}) -> V.
get_passed_at(#${rec}{passed_at = V}) -> V.
get_notation_output(#${rec}{notation_output = V}) -> V.
get_parsed_terms(#${rec}{parsed_terms = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_pass_gate_handler() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}/pass_${gate}"
    cat > "${dir}/maybe_pass_${gate}.erl" <<ERLEOF
%%% @doc maybe_pass_${gate} handler.
%%% Produces ${gate}_passed_v1 event from aggregate state.
-module(maybe_pass_${gate}).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(pass_${gate}_v1:pass_${gate}_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [${gate}_passed_v1:${gate}_passed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case pass_${gate}_v1:validate(Cmd) of
        ok ->
            Event = ${gate}_passed_v1:new(#{
                session_id => pass_${gate}_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                notation_output => State#agent_session_state.notation_output,
                parsed_terms => State#agent_session_state.parsed_terms,
                passed_by => pass_${gate}_v1:get_passed_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLEOF
}

gen_pass_gate_api() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}/pass_${gate}"
    # Convert gate underscores to hyphens for URL
    local url_gate
    url_gate=$(echo "$gate" | tr '_' '-')
    cat > "${dir}/pass_${gate}_api.erl" <<ERLEOF
%%% @doc HTTP handler for passing the ${gate}.
-module(pass_${gate}_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/${role}/gates/${url_gate}/pass", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} -> do_pass(Params, Req1);
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_pass(Params, Req) ->
    SessionId = hecate_plugin_api:get_field(session_id, Params),
    case SessionId of
        undefined ->
            hecate_plugin_api:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                passed_by => hecate_plugin_api:get_field(passed_by, Params)
            },
            case pass_${gate}_v1:new(CmdParams) of
                {ok, _Cmd} ->
                    hecate_plugin_api:json_ok(200, #{status => <<"passed">>}, Req);
                {error, Reason} ->
                    hecate_plugin_api:bad_request(Reason, Req)
            end
    end.
ERLEOF
}

gen_gate_passed_emitter() {
    local role="$1" gate="$2"
    local mod="${gate}_passed_v1_to_pg"
    local dir="${BASE}/run_${role}/escalate_${gate}/pass_${gate}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${gate}_passed_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${gate}_passed_v1">>).
-define(PG_GROUP, ${gate}_passed_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_pass_gate_sup() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}/pass_${gate}"
    cat > "${dir}/pass_${gate}_sup.erl" <<ERLEOF
%%% @doc Supervisor for pass_${gate} desk.
-module(pass_${gate}_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${gate}_passed_v1_to_pg,
          start => {${gate}_passed_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

# --- Reject gate ---

gen_reject_gate_command() {
    local role="$1" gate="$2"
    local mod="reject_${gate}_v1"
    local rec="reject_${gate}_v1"
    local dir="${BASE}/run_${role}/escalate_${gate}/reject_${gate}"
    mkdir -p "$dir"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} command.
%%% Rejects the ${gate} for a ${role} session.
-module(${mod}).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_rejected_by/1, get_rejection_reason/1]).

-record(${rec}, {
    session_id       :: binary(),
    rejected_by      :: binary() | undefined,
    rejection_reason :: binary() | undefined
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, ${rec}()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #${rec}{
        session_id = SessionId,
        rejected_by = maps:get(rejected_by, Params, undefined),
        rejection_reason = maps:get(rejection_reason, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(${rec}()) -> ok | {error, term()}.
validate(#${rec}{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#${rec}{}) ->
    ok.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = Cmd) ->
    #{
        <<"command_type">> => <<"reject_gate">>,
        <<"agent_role">> => <<"${role}">>,
        <<"gate_name">> => <<"${gate}">>,
        <<"session_id">> => Cmd#${rec}.session_id,
        <<"rejected_by">> => Cmd#${rec}.rejected_by,
        <<"rejection_reason">> => Cmd#${rec}.rejection_reason
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                rejected_by = get_value(rejected_by, Map, undefined),
                rejection_reason = get_value(rejection_reason, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_rejected_by(#${rec}{rejected_by = V}) -> V.
get_rejection_reason(#${rec}{rejection_reason = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_gate_rejected_event() {
    local role="$1" gate="$2"
    local mod="${gate}_rejected_v1"
    local rec="${gate}_rejected_v1"
    local dir="${BASE}/run_${role}/escalate_${gate}/reject_${gate}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc ${mod} event.
%%% Emitted when the ${gate} is rejected for a ${role} session.
-module(${mod}).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_gate_name/1, get_rejected_by/1,
         get_rejected_at/1, get_rejection_reason/1]).

-record(${rec}, {
    session_id       :: binary(),
    agent_role       :: binary(),
    venture_id       :: binary(),
    division_id      :: binary() | undefined,
    gate_name        :: binary(),
    rejected_by      :: binary() | undefined,
    rejection_reason :: binary() | undefined,
    rejected_at      :: integer()
}).

-export_type([${rec}/0]).
-opaque ${rec}() :: #${rec}{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> ${rec}().
new(#{session_id := SessionId} = Params) ->
    #${rec}{
        session_id = SessionId,
        agent_role = <<"${role}">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"${gate}">>,
        rejected_by = maps:get(rejected_by, Params, undefined),
        rejection_reason = maps:get(rejection_reason, Params, undefined),
        rejected_at = erlang:system_time(millisecond)
    }.

-spec to_map(${rec}()) -> map().
to_map(#${rec}{} = E) ->
    #{
        <<"event_type">> => <<"${mod}">>,
        <<"session_id">> => E#${rec}.session_id,
        <<"agent_role">> => E#${rec}.agent_role,
        <<"venture_id">> => E#${rec}.venture_id,
        <<"division_id">> => E#${rec}.division_id,
        <<"gate_name">> => E#${rec}.gate_name,
        <<"rejected_by">> => E#${rec}.rejected_by,
        <<"rejection_reason">> => E#${rec}.rejection_reason,
        <<"rejected_at">> => E#${rec}.rejected_at
    }.

-spec from_map(map()) -> {ok, ${rec}()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #${rec}{
                session_id = SessionId,
                agent_role = <<"${role}">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"${gate}">>,
                rejected_by = get_value(rejected_by, Map, undefined),
                rejection_reason = get_value(rejection_reason, Map, undefined),
                rejected_at = get_value(rejected_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#${rec}{session_id = V}) -> V.
get_gate_name(#${rec}{gate_name = V}) -> V.
get_rejected_by(#${rec}{rejected_by = V}) -> V.
get_rejected_at(#${rec}{rejected_at = V}) -> V.
get_rejection_reason(#${rec}{rejection_reason = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLEOF
}

gen_reject_gate_handler() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}/reject_${gate}"
    cat > "${dir}/maybe_reject_${gate}.erl" <<ERLEOF
%%% @doc maybe_reject_${gate} handler.
%%% Produces ${gate}_rejected_v1 event from aggregate state.
-module(maybe_reject_${gate}).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(reject_${gate}_v1:reject_${gate}_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [${gate}_rejected_v1:${gate}_rejected_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case reject_${gate}_v1:validate(Cmd) of
        ok ->
            Event = ${gate}_rejected_v1:new(#{
                session_id => reject_${gate}_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                rejected_by => reject_${gate}_v1:get_rejected_by(Cmd),
                rejection_reason => reject_${gate}_v1:get_rejection_reason(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLEOF
}

gen_reject_gate_api() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}/reject_${gate}"
    local url_gate
    url_gate=$(echo "$gate" | tr '_' '-')
    cat > "${dir}/reject_${gate}_api.erl" <<ERLEOF
%%% @doc HTTP handler for rejecting the ${gate}.
-module(reject_${gate}_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/${role}/gates/${url_gate}/reject", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} -> do_reject(Params, Req1);
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_reject(Params, Req) ->
    SessionId = hecate_plugin_api:get_field(session_id, Params),
    case SessionId of
        undefined ->
            hecate_plugin_api:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                rejected_by => hecate_plugin_api:get_field(rejected_by, Params),
                rejection_reason => hecate_plugin_api:get_field(rejection_reason, Params)
            },
            case reject_${gate}_v1:new(CmdParams) of
                {ok, _Cmd} ->
                    hecate_plugin_api:json_ok(200, #{status => <<"rejected">>}, Req);
                {error, Reason} ->
                    hecate_plugin_api:bad_request(Reason, Req)
            end
    end.
ERLEOF
}

gen_gate_rejected_emitter() {
    local role="$1" gate="$2"
    local mod="${gate}_rejected_v1_to_pg"
    local dir="${BASE}/run_${role}/escalate_${gate}/reject_${gate}"
    cat > "${dir}/${mod}.erl" <<ERLEOF
%%% @doc Emitter: ${gate}_rejected_v1 -> pg (internal pub/sub)
-module(${mod}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${gate}_rejected_v1">>).
-define(PG_GROUP, ${gate}_rejected_v1).
-define(SUB_NAME, <<"${mod}">>).
-define(STORE_ID, orchestration_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    Members = pg:get_members(pg, ?PG_GROUP),
    lists:foreach(fun(E) ->
        Msg = {?PG_GROUP, E},
        lists:foreach(fun(Pid) -> Pid ! Msg end, Members)
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLEOF
}

gen_reject_gate_sup() {
    local role="$1" gate="$2"
    local dir="${BASE}/run_${role}/escalate_${gate}/reject_${gate}"
    cat > "${dir}/reject_${gate}_sup.erl" <<ERLEOF
%%% @doc Supervisor for reject_${gate} desk.
-module(reject_${gate}_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => ${gate}_rejected_v1_to_pg,
          start => {${gate}_rejected_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLEOF
}

# --- Composite generators ---

gen_standard_role() {
    local role="$1" prefix="$2"
    echo "  Generating standard role: ${role} (prefix: ${prefix})"
    gen_initiate_command "$role" "$prefix"
    gen_initiated_event "$role"
    gen_initiate_handler "$role"
    gen_initiated_emitter "$role"
    gen_initiate_api "$role"
    gen_initiate_sup "$role"
    gen_complete_command "$role"
    gen_completed_event "$role"
    gen_complete_handler "$role"
    gen_completed_emitter "$role"
    gen_complete_sup "$role"
    gen_fail_command "$role"
    gen_failed_event "$role"
    gen_fail_handler "$role"
    gen_failed_emitter "$role"
    gen_fail_sup "$role"
    gen_run_sup "$role"
}

gen_gated_role() {
    local role="$1" prefix="$2" gate="$3"
    echo "  Generating gated role: ${role} (prefix: ${prefix}, gate: ${gate})"
    gen_initiate_command "$role" "$prefix"
    gen_initiated_event "$role"
    gen_initiate_handler "$role"
    gen_initiated_emitter "$role"
    gen_initiate_api "$role"
    gen_initiate_sup "$role"
    gen_complete_command "$role"
    gen_completed_event "$role"
    gen_complete_handler "$role"
    gen_completed_emitter "$role"
    gen_complete_sup "$role"
    gen_fail_command "$role"
    gen_failed_event "$role"
    gen_fail_handler "$role"
    gen_failed_emitter "$role"
    gen_fail_sup "$role"
    # Gate desks
    gen_escalate_gate_command "$role" "$gate"
    gen_gate_escalated_event "$role" "$gate"
    gen_escalate_gate_handler "$role" "$gate"
    gen_gate_escalated_emitter "$role" "$gate"
    gen_escalate_gate_sup "$role" "$gate"
    gen_pass_gate_command "$role" "$gate"
    gen_gate_passed_event "$role" "$gate"
    gen_pass_gate_handler "$role" "$gate"
    gen_pass_gate_api "$role" "$gate"
    gen_gate_passed_emitter "$role" "$gate"
    gen_pass_gate_sup "$role" "$gate"
    gen_reject_gate_command "$role" "$gate"
    gen_gate_rejected_event "$role" "$gate"
    gen_reject_gate_handler "$role" "$gate"
    gen_reject_gate_api "$role" "$gate"
    gen_gate_rejected_emitter "$role" "$gate"
    gen_reject_gate_sup "$role" "$gate"
    # Run sup with gate child
    local extra=",
        #{id => escalate_${gate}_sup,
          start => {escalate_${gate}_sup, start_link, []},
          restart => permanent, type => supervisor}"
    gen_run_sup "$role" "$extra"
}

gen_conversational_role() {
    local role="$1" prefix="$2"
    echo "  Generating conversational role: ${role} (prefix: ${prefix})"
    gen_initiate_command "$role" "$prefix"
    gen_initiated_event "$role"
    gen_initiate_handler "$role"
    gen_initiated_emitter "$role"
    gen_initiate_api "$role"
    gen_initiate_sup "$role"
    gen_complete_command "$role"
    gen_completed_event "$role"
    gen_complete_handler "$role"
    gen_completed_emitter "$role"
    gen_complete_sup "$role"
    gen_fail_command "$role"
    gen_failed_event "$role"
    gen_fail_handler "$role"
    gen_failed_emitter "$role"
    gen_fail_sup "$role"
    # Conversational desks
    gen_complete_turn_command "$role"
    gen_turn_completed_event "$role"
    gen_complete_turn_handler "$role"
    gen_turn_completed_emitter "$role"
    gen_complete_turn_sup "$role"
    gen_receive_input_command "$role"
    gen_input_received_event "$role"
    gen_receive_input_handler "$role"
    gen_input_received_emitter "$role"
    gen_receive_input_sup "$role"
    # Run sup with turn + input children
    local extra=",
        #{id => complete_${role}_turn_sup,
          start => {complete_${role}_turn_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => receive_${role}_input_sup,
          start => {receive_${role}_input_sup, start_link, []},
          restart => permanent, type => supervisor}"
    gen_run_sup "$role" "$extra"
}

# === MAIN ===

echo "Generating per-role slices for orchestrate_agents..."
echo ""

# Standard agents (no gate, no conversation)
gen_standard_role "architect" "arc"
gen_standard_role "erlang_coder" "erc"
gen_standard_role "svelte_coder" "svc"
gen_standard_role "sql_coder" "sqc"
gen_standard_role "tester" "tst"
gen_standard_role "delivery_manager" "dlm"

# Gated agents (visionary already done manually — skip)
gen_gated_role "explorer" "exp" "boundary_gate"
gen_gated_role "stormer" "stm" "design_gate"
gen_gated_role "reviewer" "rev" "review_gate"

# Conversational agents
gen_conversational_role "coordinator" "crd"
gen_conversational_role "mentor" "mnt"

echo ""
echo "Done. Generated files for 11 roles (visionary already existed)."
echo ""

# Count generated files
TOTAL=$(find "${BASE}/run_"* -name '*.erl' -type f | wc -l)
echo "Total .erl files in run_* directories: ${TOTAL}"
