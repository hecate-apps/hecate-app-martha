#!/usr/bin/env bash
set -euo pipefail

# Generate the missing vision gate desk files for visionary.
# The gen-role-slices.sh skipped visionary (done manually), but gate desks
# were never created. This generates them by adapting the boundary_gate pattern.

BASE="apps/orchestrate_agents/src/run_visionary/escalate_vision_gate"
ROLE="visionary"
GATE="vision_gate"

mkdir -p "${BASE}/pass_vision_gate" "${BASE}/reject_vision_gate"

get_value_fn() {
cat <<'ERLANG'

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLANG
}

echo "=== Generating vision gate desk files ==="

# --- escalate_vision_gate_v1.erl (command) ---
echo "  GEN escalate_vision_gate_v1.erl"
cat > "${BASE}/escalate_vision_gate_v1.erl" <<'ERLANG'
%%% @doc escalate_vision_gate_v1 command.
%%% Escalates a completed visionary session to the vision_gate for HITL review.
-module(escalate_vision_gate_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1]).

-record(escalate_vision_gate_v1, {
    session_id :: binary()
}).

-export_type([escalate_vision_gate_v1/0]).
-opaque escalate_vision_gate_v1() :: #escalate_vision_gate_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, escalate_vision_gate_v1()} | {error, term()}.
new(#{session_id := SessionId}) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #escalate_vision_gate_v1{session_id = SessionId}};
new(_) ->
    {error, missing_required_fields}.

-spec validate(escalate_vision_gate_v1()) -> ok | {error, term()}.
validate(#escalate_vision_gate_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#escalate_vision_gate_v1{}) ->
    ok.

-spec to_map(escalate_vision_gate_v1()) -> map().
to_map(#escalate_vision_gate_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"escalate_to_gate">>,
        <<"agent_role">> => <<"visionary">>,
        <<"gate_name">> => <<"vision_gate">>,
        <<"session_id">> => Cmd#escalate_vision_gate_v1.session_id
    }.

-spec from_map(map()) -> {ok, escalate_vision_gate_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ -> {ok, #escalate_vision_gate_v1{session_id = SessionId}}
    end.

%% Accessors
get_session_id(#escalate_vision_gate_v1{session_id = V}) -> V.

%% Internal
get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, undefined)
    end.
ERLANG

# --- vision_gate_escalated_v1.erl (event) ---
echo "  GEN vision_gate_escalated_v1.erl"
cat > "${BASE}/vision_gate_escalated_v1.erl" <<'ERLANG'
%%% @doc vision_gate_escalated_v1 event.
%%% Emitted when a visionary session is escalated to vision_gate.
-module(vision_gate_escalated_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_gate_name/1, get_escalated_at/1,
         get_notation_output/1, get_parsed_terms/1]).

-record(vision_gate_escalated_v1, {
    session_id      :: binary(),
    agent_role      :: binary(),
    venture_id      :: binary(),
    division_id     :: binary() | undefined,
    gate_name       :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    escalated_at    :: integer()
}).

-export_type([vision_gate_escalated_v1/0]).
-opaque vision_gate_escalated_v1() :: #vision_gate_escalated_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> vision_gate_escalated_v1().
new(#{session_id := SessionId} = Params) ->
    #vision_gate_escalated_v1{
        session_id = SessionId,
        agent_role = <<"visionary">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"vision_gate">>,
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        escalated_at = erlang:system_time(millisecond)
    }.

-spec to_map(vision_gate_escalated_v1()) -> map().
to_map(#vision_gate_escalated_v1{} = E) ->
    #{
        <<"event_type">> => <<"vision_gate_escalated_v1">>,
        <<"session_id">> => E#vision_gate_escalated_v1.session_id,
        <<"agent_role">> => E#vision_gate_escalated_v1.agent_role,
        <<"venture_id">> => E#vision_gate_escalated_v1.venture_id,
        <<"division_id">> => E#vision_gate_escalated_v1.division_id,
        <<"gate_name">> => E#vision_gate_escalated_v1.gate_name,
        <<"notation_output">> => E#vision_gate_escalated_v1.notation_output,
        <<"parsed_terms">> => E#vision_gate_escalated_v1.parsed_terms,
        <<"escalated_at">> => E#vision_gate_escalated_v1.escalated_at
    }.

-spec from_map(map()) -> {ok, vision_gate_escalated_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #vision_gate_escalated_v1{
                session_id = SessionId,
                agent_role = <<"visionary">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"vision_gate">>,
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                escalated_at = get_value(escalated_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#vision_gate_escalated_v1{session_id = V}) -> V.
get_gate_name(#vision_gate_escalated_v1{gate_name = V}) -> V.
get_escalated_at(#vision_gate_escalated_v1{escalated_at = V}) -> V.
get_notation_output(#vision_gate_escalated_v1{notation_output = V}) -> V.
get_parsed_terms(#vision_gate_escalated_v1{parsed_terms = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLANG

# --- maybe_escalate_vision_gate.erl (handler) ---
echo "  GEN maybe_escalate_vision_gate.erl"
cat > "${BASE}/maybe_escalate_vision_gate.erl" <<'ERLANG'
%%% @doc maybe_escalate_vision_gate handler.
%%% Produces vision_gate_escalated_v1 event from aggregate state.
-module(maybe_escalate_vision_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(escalate_vision_gate_v1:escalate_vision_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [vision_gate_escalated_v1:vision_gate_escalated_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case escalate_vision_gate_v1:validate(Cmd) of
        ok ->
            Event = vision_gate_escalated_v1:new(#{
                session_id => escalate_vision_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                notation_output => State#agent_session_state.notation_output,
                parsed_terms => State#agent_session_state.parsed_terms
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLANG

# --- vision_gate_escalated_v1_to_pg.erl (emitter) ---
echo "  GEN vision_gate_escalated_v1_to_pg.erl"
cat > "${BASE}/vision_gate_escalated_v1_to_pg.erl" <<'ERLANG'
%%% @doc Emitter: publishes vision_gate_escalated_v1 events to pg group.
-module(vision_gate_escalated_v1_to_pg).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"vision_gate_escalated_v1">>).
-define(PG_GROUP, vision_gate_escalated_v1).
-define(SUB_NAME, <<"vision_gate_escalated_v1_to_pg">>).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    pg:join(?PG_GROUP, self()),
    {ok, _} = reckon_evoq_adapter:subscribe(
        orchestration_store, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        Map = app_marthad_projection_event:to_map(E),
        pg:get_members(?PG_GROUP) -- [self()],
        [Pid ! {?PG_GROUP, Map} || Pid <- pg:get_members(?PG_GROUP), Pid =/= self()]
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLANG

# --- escalate_vision_gate_sup.erl (supervisor) ---
echo "  GEN escalate_vision_gate_sup.erl"
cat > "${BASE}/escalate_vision_gate_sup.erl" <<'ERLANG'
%%% @doc Supervisor for escalate_vision_gate desk (includes pass/reject sub-desks).
-module(escalate_vision_gate_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => vision_gate_escalated_v1_to_pg,
          start => {vision_gate_escalated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => pass_vision_gate_sup,
          start => {pass_vision_gate_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => reject_vision_gate_sup,
          start => {reject_vision_gate_sup, start_link, []},
          restart => permanent, type => supervisor}

        %% PM added here:
        %% on_visionary_completed_escalate_vision_gate (auto-escalate PM)
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLANG

# --- pass_vision_gate_v1.erl (command) ---
echo "  GEN pass_vision_gate_v1.erl"
cat > "${BASE}/pass_vision_gate/pass_vision_gate_v1.erl" <<'ERLANG'
%%% @doc pass_vision_gate_v1 command.
%%% Passes the vision_gate for a visionary session.
-module(pass_vision_gate_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_passed_by/1]).

-record(pass_vision_gate_v1, {
    session_id :: binary(),
    passed_by  :: binary() | undefined
}).

-export_type([pass_vision_gate_v1/0]).
-opaque pass_vision_gate_v1() :: #pass_vision_gate_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, pass_vision_gate_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #pass_vision_gate_v1{
        session_id = SessionId,
        passed_by = maps:get(passed_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(pass_vision_gate_v1()) -> ok | {error, term()}.
validate(#pass_vision_gate_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#pass_vision_gate_v1{}) ->
    ok.

-spec to_map(pass_vision_gate_v1()) -> map().
to_map(#pass_vision_gate_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"pass_gate">>,
        <<"agent_role">> => <<"visionary">>,
        <<"gate_name">> => <<"vision_gate">>,
        <<"session_id">> => Cmd#pass_vision_gate_v1.session_id,
        <<"passed_by">> => Cmd#pass_vision_gate_v1.passed_by
    }.

-spec from_map(map()) -> {ok, pass_vision_gate_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #pass_vision_gate_v1{
                session_id = SessionId,
                passed_by = get_value(passed_by, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#pass_vision_gate_v1{session_id = V}) -> V.
get_passed_by(#pass_vision_gate_v1{passed_by = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLANG

# --- vision_gate_passed_v1.erl (event) ---
echo "  GEN vision_gate_passed_v1.erl"
cat > "${BASE}/pass_vision_gate/vision_gate_passed_v1.erl" <<'ERLANG'
%%% @doc vision_gate_passed_v1 event.
%%% Emitted when the vision_gate is passed for a visionary session.
-module(vision_gate_passed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_passed_by/1, get_passed_at/1]).

-record(vision_gate_passed_v1, {
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

-export_type([vision_gate_passed_v1/0]).
-opaque vision_gate_passed_v1() :: #vision_gate_passed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> vision_gate_passed_v1().
new(#{session_id := SessionId} = Params) ->
    #vision_gate_passed_v1{
        session_id = SessionId,
        agent_role = <<"visionary">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"vision_gate">>,
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        passed_by = maps:get(passed_by, Params, undefined),
        passed_at = erlang:system_time(millisecond)
    }.

-spec to_map(vision_gate_passed_v1()) -> map().
to_map(#vision_gate_passed_v1{} = E) ->
    #{
        <<"event_type">> => <<"vision_gate_passed_v1">>,
        <<"session_id">> => E#vision_gate_passed_v1.session_id,
        <<"agent_role">> => E#vision_gate_passed_v1.agent_role,
        <<"venture_id">> => E#vision_gate_passed_v1.venture_id,
        <<"division_id">> => E#vision_gate_passed_v1.division_id,
        <<"gate_name">> => E#vision_gate_passed_v1.gate_name,
        <<"notation_output">> => E#vision_gate_passed_v1.notation_output,
        <<"parsed_terms">> => E#vision_gate_passed_v1.parsed_terms,
        <<"passed_by">> => E#vision_gate_passed_v1.passed_by,
        <<"passed_at">> => E#vision_gate_passed_v1.passed_at
    }.

-spec from_map(map()) -> {ok, vision_gate_passed_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #vision_gate_passed_v1{
                session_id = SessionId,
                agent_role = <<"visionary">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"vision_gate">>,
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                passed_by = get_value(passed_by, Map, undefined),
                passed_at = get_value(passed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#vision_gate_passed_v1{session_id = V}) -> V.
get_passed_by(#vision_gate_passed_v1{passed_by = V}) -> V.
get_passed_at(#vision_gate_passed_v1{passed_at = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLANG

# --- maybe_pass_vision_gate.erl (handler) ---
echo "  GEN maybe_pass_vision_gate.erl"
cat > "${BASE}/pass_vision_gate/maybe_pass_vision_gate.erl" <<'ERLANG'
%%% @doc maybe_pass_vision_gate handler.
%%% Produces vision_gate_passed_v1 event from aggregate state.
-module(maybe_pass_vision_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(pass_vision_gate_v1:pass_vision_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [vision_gate_passed_v1:vision_gate_passed_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case pass_vision_gate_v1:validate(Cmd) of
        ok ->
            Event = vision_gate_passed_v1:new(#{
                session_id => pass_vision_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                notation_output => State#agent_session_state.notation_output,
                parsed_terms => State#agent_session_state.parsed_terms,
                passed_by => pass_vision_gate_v1:get_passed_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLANG

# --- pass_vision_gate_api.erl ---
echo "  GEN pass_vision_gate_api.erl"
cat > "${BASE}/pass_vision_gate/pass_vision_gate_api.erl" <<'ERLANG'
%%% @doc HTTP handler for passing the vision gate.
-module(pass_vision_gate_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/visionary/gate/pass", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} -> do_pass(Params, Req1);
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_pass(Params, Req) ->
    SessionId = app_marthad_api_utils:get_field(session_id, Params),
    case SessionId of
        undefined ->
            app_marthad_api_utils:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                passed_by => app_marthad_api_utils:get_field(passed_by, Params)
            },
            case pass_vision_gate_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req);
                {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
            end
    end.

dispatch(Cmd, Req) ->
    SessionId = pass_vision_gate_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = pass_gate,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = pass_vision_gate_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => agent_orchestration_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    case evoq_dispatcher:dispatch(EvoqCmd, Opts) of
        {ok, Version, EventMaps} ->
            app_marthad_api_utils:json_ok(200, #{
                session_id => SessionId,
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
ERLANG

# --- vision_gate_passed_v1_to_pg.erl (emitter) ---
echo "  GEN vision_gate_passed_v1_to_pg.erl"
cat > "${BASE}/pass_vision_gate/vision_gate_passed_v1_to_pg.erl" <<'ERLANG'
%%% @doc Emitter: publishes vision_gate_passed_v1 events to pg group.
-module(vision_gate_passed_v1_to_pg).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"vision_gate_passed_v1">>).
-define(PG_GROUP, vision_gate_passed_v1).
-define(SUB_NAME, <<"vision_gate_passed_v1_to_pg">>).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    pg:join(?PG_GROUP, self()),
    {ok, _} = reckon_evoq_adapter:subscribe(
        orchestration_store, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        Map = app_marthad_projection_event:to_map(E),
        [Pid ! {?PG_GROUP, Map} || Pid <- pg:get_members(?PG_GROUP), Pid =/= self()]
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLANG

# --- pass_vision_gate_sup.erl ---
echo "  GEN pass_vision_gate_sup.erl"
cat > "${BASE}/pass_vision_gate/pass_vision_gate_sup.erl" <<'ERLANG'
%%% @doc Supervisor for pass_vision_gate desk.
-module(pass_vision_gate_sup).
-behaviour(supervisor).

-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{id => vision_gate_passed_v1_to_pg,
          start => {vision_gate_passed_v1_to_pg, start_link, []},
          restart => permanent, type => worker}
    ],
    {ok, {#{strategy => one_for_one, intensity => 5, period => 10}, Children}}.
ERLANG

# --- reject_vision_gate_v1.erl (command) ---
echo "  GEN reject_vision_gate_v1.erl"
cat > "${BASE}/reject_vision_gate/reject_vision_gate_v1.erl" <<'ERLANG'
%%% @doc reject_vision_gate_v1 command.
%%% Rejects the vision_gate for a visionary session.
-module(reject_vision_gate_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_rejected_by/1, get_rejection_reason/1]).

-record(reject_vision_gate_v1, {
    session_id       :: binary(),
    rejected_by      :: binary() | undefined,
    rejection_reason :: binary() | undefined
}).

-export_type([reject_vision_gate_v1/0]).
-opaque reject_vision_gate_v1() :: #reject_vision_gate_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, reject_vision_gate_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #reject_vision_gate_v1{
        session_id = SessionId,
        rejected_by = maps:get(rejected_by, Params, undefined),
        rejection_reason = maps:get(rejection_reason, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(reject_vision_gate_v1()) -> ok | {error, term()}.
validate(#reject_vision_gate_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#reject_vision_gate_v1{}) ->
    ok.

-spec to_map(reject_vision_gate_v1()) -> map().
to_map(#reject_vision_gate_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"reject_gate">>,
        <<"agent_role">> => <<"visionary">>,
        <<"gate_name">> => <<"vision_gate">>,
        <<"session_id">> => Cmd#reject_vision_gate_v1.session_id,
        <<"rejected_by">> => Cmd#reject_vision_gate_v1.rejected_by,
        <<"rejection_reason">> => Cmd#reject_vision_gate_v1.rejection_reason
    }.

-spec from_map(map()) -> {ok, reject_vision_gate_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #reject_vision_gate_v1{
                session_id = SessionId,
                rejected_by = get_value(rejected_by, Map, undefined),
                rejection_reason = get_value(rejection_reason, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#reject_vision_gate_v1{session_id = V}) -> V.
get_rejected_by(#reject_vision_gate_v1{rejected_by = V}) -> V.
get_rejection_reason(#reject_vision_gate_v1{rejection_reason = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLANG

# --- vision_gate_rejected_v1.erl (event) ---
echo "  GEN vision_gate_rejected_v1.erl"
cat > "${BASE}/reject_vision_gate/vision_gate_rejected_v1.erl" <<'ERLANG'
%%% @doc vision_gate_rejected_v1 event.
%%% Emitted when the vision_gate is rejected for a visionary session.
-module(vision_gate_rejected_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_rejected_by/1, get_rejected_at/1]).

-record(vision_gate_rejected_v1, {
    session_id       :: binary(),
    agent_role       :: binary(),
    venture_id       :: binary(),
    division_id      :: binary() | undefined,
    gate_name        :: binary(),
    rejected_by      :: binary() | undefined,
    rejection_reason :: binary() | undefined,
    rejected_at      :: integer()
}).

-export_type([vision_gate_rejected_v1/0]).
-opaque vision_gate_rejected_v1() :: #vision_gate_rejected_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> vision_gate_rejected_v1().
new(#{session_id := SessionId} = Params) ->
    #vision_gate_rejected_v1{
        session_id = SessionId,
        agent_role = <<"visionary">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"vision_gate">>,
        rejected_by = maps:get(rejected_by, Params, undefined),
        rejection_reason = maps:get(rejection_reason, Params, undefined),
        rejected_at = erlang:system_time(millisecond)
    }.

-spec to_map(vision_gate_rejected_v1()) -> map().
to_map(#vision_gate_rejected_v1{} = E) ->
    #{
        <<"event_type">> => <<"vision_gate_rejected_v1">>,
        <<"session_id">> => E#vision_gate_rejected_v1.session_id,
        <<"agent_role">> => E#vision_gate_rejected_v1.agent_role,
        <<"venture_id">> => E#vision_gate_rejected_v1.venture_id,
        <<"division_id">> => E#vision_gate_rejected_v1.division_id,
        <<"gate_name">> => E#vision_gate_rejected_v1.gate_name,
        <<"rejected_by">> => E#vision_gate_rejected_v1.rejected_by,
        <<"rejection_reason">> => E#vision_gate_rejected_v1.rejection_reason,
        <<"rejected_at">> => E#vision_gate_rejected_v1.rejected_at
    }.

-spec from_map(map()) -> {ok, vision_gate_rejected_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #vision_gate_rejected_v1{
                session_id = SessionId,
                agent_role = <<"visionary">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"vision_gate">>,
                rejected_by = get_value(rejected_by, Map, undefined),
                rejection_reason = get_value(rejection_reason, Map, undefined),
                rejected_at = get_value(rejected_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#vision_gate_rejected_v1{session_id = V}) -> V.
get_rejected_by(#vision_gate_rejected_v1{rejected_by = V}) -> V.
get_rejected_at(#vision_gate_rejected_v1{rejected_at = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
ERLANG

# --- maybe_reject_vision_gate.erl (handler) ---
echo "  GEN maybe_reject_vision_gate.erl"
cat > "${BASE}/reject_vision_gate/maybe_reject_vision_gate.erl" <<'ERLANG'
%%% @doc maybe_reject_vision_gate handler.
%%% Produces vision_gate_rejected_v1 event from aggregate state.
-module(maybe_reject_vision_gate).

-include("agent_session_state.hrl").

-export([handle/2]).

-spec handle(reject_vision_gate_v1:reject_vision_gate_v1(),
             agent_orchestration_aggregate:state()) ->
    {ok, [vision_gate_rejected_v1:vision_gate_rejected_v1()]} | {error, term()}.
handle(Cmd, State) ->
    case reject_vision_gate_v1:validate(Cmd) of
        ok ->
            Event = vision_gate_rejected_v1:new(#{
                session_id => reject_vision_gate_v1:get_session_id(Cmd),
                venture_id => State#agent_session_state.venture_id,
                division_id => State#agent_session_state.division_id,
                rejected_by => reject_vision_gate_v1:get_rejected_by(Cmd),
                rejection_reason => reject_vision_gate_v1:get_rejection_reason(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
ERLANG

# --- reject_vision_gate_api.erl ---
echo "  GEN reject_vision_gate_api.erl"
cat > "${BASE}/reject_vision_gate/reject_vision_gate_api.erl" <<'ERLANG'
%%% @doc HTTP handler for rejecting the vision gate.
-module(reject_vision_gate_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/visionary/gate/reject", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} -> do_reject(Params, Req1);
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_reject(Params, Req) ->
    SessionId = app_marthad_api_utils:get_field(session_id, Params),
    case SessionId of
        undefined ->
            app_marthad_api_utils:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                rejected_by => app_marthad_api_utils:get_field(rejected_by, Params),
                rejection_reason => app_marthad_api_utils:get_field(rejection_reason, Params)
            },
            case reject_vision_gate_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req);
                {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
            end
    end.

dispatch(Cmd, Req) ->
    SessionId = reject_vision_gate_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = reject_gate,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = reject_vision_gate_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => agent_orchestration_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    case evoq_dispatcher:dispatch(EvoqCmd, Opts) of
        {ok, Version, EventMaps} ->
            app_marthad_api_utils:json_ok(200, #{
                session_id => SessionId,
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
ERLANG

# --- vision_gate_rejected_v1_to_pg.erl (emitter) ---
echo "  GEN vision_gate_rejected_v1_to_pg.erl"
cat > "${BASE}/reject_vision_gate/vision_gate_rejected_v1_to_pg.erl" <<'ERLANG'
%%% @doc Emitter: publishes vision_gate_rejected_v1 events to pg group.
-module(vision_gate_rejected_v1_to_pg).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"vision_gate_rejected_v1">>).
-define(PG_GROUP, vision_gate_rejected_v1).
-define(SUB_NAME, <<"vision_gate_rejected_v1_to_pg">>).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    pg:join(?PG_GROUP, self()),
    {ok, _} = reckon_evoq_adapter:subscribe(
        orchestration_store, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        Map = app_marthad_projection_event:to_map(E),
        [Pid ! {?PG_GROUP, Map} || Pid <- pg:get_members(?PG_GROUP), Pid =/= self()]
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLANG

echo ""
echo "=== Done: vision gate desk files generated ==="
