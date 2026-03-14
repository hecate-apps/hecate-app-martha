#!/usr/bin/env bash
set -euo pipefail

# Restructure guide_kanban_lifecycle: old item/kanban naming → card/kanban_board naming
# Creates 10 desks × 5 files each = 50 files

BASE="apps/guide_kanban_lifecycle/src"

##############################################################################
# HELPERS
##############################################################################

gen_get_value() {
    cat <<'ERLANG'

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.

get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
ERLANG
}

gen_emitter() {
    local EVENT_TYPE="$1"   # e.g., kanban_board_initiated_v1
    local PG_GROUP="$2"     # e.g., kanban_board_initiated_v1
    local MOD="${EVENT_TYPE}_to_pg"
    local DESK_DIR="$3"
    local FILE="${DESK_DIR}/${MOD}.erl"

    echo "  GEN  ${MOD}"
    cat > "$FILE" <<ERLANG
%%% @doc PG emitter for ${EVENT_TYPE}.
-module(${MOD}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${EVENT_TYPE}">>).
-define(PG_GROUP, ${PG_GROUP}).
-define(SUB_NAME, <<"${MOD}">>).
-define(STORE_ID, martha_store).

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
ERLANG
}

##############################################################################
# BOARD DESKS
##############################################################################

gen_initiate_kanban_board() {
    local DIR="${BASE}/initiate_kanban_board"
    mkdir -p "$DIR"
    echo "=== initiate_kanban_board ==="

    # Command
    echo "  GEN  initiate_kanban_board_v1"
    cat > "${DIR}/initiate_kanban_board_v1.erl" <<'ERLANG'
%%% @doc Command: initiate a kanban board for a division.
-module(initiate_kanban_board_v1).

-record(initiate_kanban_board_v1, {
    division_id  :: binary(),
    venture_id   :: binary(),
    context_name :: binary(),
    initiated_by :: binary() | undefined
}).

-type initiate_kanban_board_v1() :: #initiate_kanban_board_v1{}.
-export_type([initiate_kanban_board_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_venture_id/1, get_context_name/1, get_initiated_by/1]).

-spec new(map()) -> {ok, initiate_kanban_board_v1()} | {error, term()}.
new(Params) ->
    Cmd = #initiate_kanban_board_v1{
        division_id  = maps:get(division_id, Params),
        venture_id   = maps:get(venture_id, Params),
        context_name = maps:get(context_name, Params, <<>>),
        initiated_by = maps:get(initiated_by, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, initiate_kanban_board_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id  => get_value(division_id, Map),
        venture_id   => get_value(venture_id, Map),
        context_name => get_value(context_name, Map, <<>>),
        initiated_by => get_value(initiated_by, Map, undefined)
    }).

-spec validate(initiate_kanban_board_v1()) -> ok | {error, term()}.
validate(#initiate_kanban_board_v1{division_id = D, venture_id = V})
  when is_binary(D), byte_size(D) > 0,
       is_binary(V), byte_size(V) > 0 -> ok;
validate(_) -> {error, invalid_initiate_kanban_board}.

-spec to_map(initiate_kanban_board_v1()) -> map().
to_map(#initiate_kanban_board_v1{} = C) ->
    #{<<"command_type">> => <<"initiate_kanban_board">>,
      <<"division_id">>  => C#initiate_kanban_board_v1.division_id,
      <<"venture_id">>   => C#initiate_kanban_board_v1.venture_id,
      <<"context_name">> => C#initiate_kanban_board_v1.context_name,
      <<"initiated_by">> => C#initiate_kanban_board_v1.initiated_by}.

get_division_id(#initiate_kanban_board_v1{division_id = V}) -> V.
get_venture_id(#initiate_kanban_board_v1{venture_id = V}) -> V.
get_context_name(#initiate_kanban_board_v1{context_name = V}) -> V.
get_initiated_by(#initiate_kanban_board_v1{initiated_by = V}) -> V.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
ERLANG

    # Event
    echo "  GEN  kanban_board_initiated_v1"
    cat > "${DIR}/kanban_board_initiated_v1.erl" <<'ERLANG'
%%% @doc Event: kanban board initiated.
-module(kanban_board_initiated_v1).

-record(kanban_board_initiated_v1, {
    division_id  :: binary(),
    venture_id   :: binary(),
    context_name :: binary(),
    initiated_by :: binary() | undefined,
    initiated_at :: non_neg_integer()
}).

-type kanban_board_initiated_v1() :: #kanban_board_initiated_v1{}.
-export_type([kanban_board_initiated_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_venture_id/1, get_context_name/1,
         get_initiated_by/1, get_initiated_at/1]).

-spec new(map()) -> kanban_board_initiated_v1().
new(Params) ->
    #kanban_board_initiated_v1{
        division_id  = maps:get(division_id, Params),
        venture_id   = maps:get(venture_id, Params),
        context_name = maps:get(context_name, Params, <<>>),
        initiated_by = maps:get(initiated_by, Params, undefined),
        initiated_at = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_board_initiated_v1()) -> map().
to_map(#kanban_board_initiated_v1{} = E) ->
    #{<<"event_type">>   => <<"kanban_board_initiated_v1">>,
      <<"division_id">>  => E#kanban_board_initiated_v1.division_id,
      <<"venture_id">>   => E#kanban_board_initiated_v1.venture_id,
      <<"context_name">> => E#kanban_board_initiated_v1.context_name,
      <<"initiated_by">> => E#kanban_board_initiated_v1.initiated_by,
      <<"initiated_at">> => E#kanban_board_initiated_v1.initiated_at}.

-spec from_map(map()) -> {ok, kanban_board_initiated_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_board_initiated_v1{
        division_id  = get_value(division_id, Map),
        venture_id   = get_value(venture_id, Map),
        context_name = get_value(context_name, Map, <<>>),
        initiated_by = get_value(initiated_by, Map, undefined),
        initiated_at = get_value(initiated_at, Map, erlang:system_time(millisecond))
    }}.

get_division_id(#kanban_board_initiated_v1{division_id = V}) -> V.
get_venture_id(#kanban_board_initiated_v1{venture_id = V}) -> V.
get_context_name(#kanban_board_initiated_v1{context_name = V}) -> V.
get_initiated_by(#kanban_board_initiated_v1{initiated_by = V}) -> V.
get_initiated_at(#kanban_board_initiated_v1{initiated_at = V}) -> V.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
ERLANG

    # Handler
    echo "  GEN  maybe_initiate_kanban_board"
    cat > "${DIR}/maybe_initiate_kanban_board.erl" <<'ERLANG'
%%% @doc Handler: validate and produce kanban_board_initiated_v1.
-module(maybe_initiate_kanban_board).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(initiate_kanban_board_v1:initiate_kanban_board_v1()) ->
    {ok, [kanban_board_initiated_v1:kanban_board_initiated_v1()]} | {error, term()}.
handle(Cmd) ->
    case initiate_kanban_board_v1:validate(Cmd) of
        ok ->
            Event = kanban_board_initiated_v1:new(#{
                division_id  => initiate_kanban_board_v1:get_division_id(Cmd),
                venture_id   => initiate_kanban_board_v1:get_venture_id(Cmd),
                context_name => initiate_kanban_board_v1:get_context_name(Cmd),
                initiated_by => initiate_kanban_board_v1:get_initiated_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(initiate_kanban_board_v1:initiate_kanban_board_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = initiate_kanban_board_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = initiate_kanban_board,
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = initiate_kanban_board_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_kanban_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => martha_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    evoq_dispatcher:dispatch(EvoqCmd, Opts).
ERLANG

    # Emitter
    gen_emitter "kanban_board_initiated_v1" "kanban_board_initiated_v1" "$DIR"

    # API
    echo "  GEN  initiate_kanban_board_api"
    cat > "${DIR}/initiate_kanban_board_api.erl" <<'ERLANG'
%%% @doc API: POST /api/kanbans/:division_id/initiate
-module(initiate_kanban_board_api).

-export([routes/0, init/2]).

routes() ->
    [{"/api/kanbans/:division_id/initiate", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} ->
            CmdParams = #{
                division_id  => DivisionId,
                venture_id   => get_value(<<"venture_id">>, Params),
                context_name => get_value(<<"context_name">>, Params, <<>>),
                initiated_by => get_value(<<"initiated_by">>, Params, undefined)
            },
            case initiate_kanban_board_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req1);
                {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req1)
            end;
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.

dispatch(Cmd, Req) ->
    case maybe_initiate_kanban_board:dispatch(Cmd) of
        {ok, _Version, _Events} ->
            hecate_plugin_api:json_ok(201,
                #{<<"division_id">> => initiate_kanban_board_v1:get_division_id(Cmd),
                  <<"status">> => <<"initiated">>}, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) -> maps:get(Key, Map, Default).
ERLANG
}

gen_archive_kanban_board() {
    local DIR="${BASE}/archive_kanban_board"
    mkdir -p "$DIR"
    echo "=== archive_kanban_board ==="

    # Command
    echo "  GEN  archive_kanban_board_v1"
    cat > "${DIR}/archive_kanban_board_v1.erl" <<'ERLANG'
%%% @doc Command: archive a kanban board.
-module(archive_kanban_board_v1).

-record(archive_kanban_board_v1, {
    division_id :: binary()
}).

-type archive_kanban_board_v1() :: #archive_kanban_board_v1{}.
-export_type([archive_kanban_board_v1/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1]).

-spec new(map()) -> {ok, archive_kanban_board_v1()} | {error, term()}.
new(Params) ->
    Cmd = #archive_kanban_board_v1{
        division_id = maps:get(division_id, Params)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.

-spec from_map(map()) -> {ok, archive_kanban_board_v1()} | {error, term()}.
from_map(Map) ->
    new(#{division_id => get_value(division_id, Map)}).

-spec validate(archive_kanban_board_v1()) -> ok | {error, term()}.
validate(#archive_kanban_board_v1{division_id = D})
  when is_binary(D), byte_size(D) > 0 -> ok;
validate(_) -> {error, invalid_archive_kanban_board}.

-spec to_map(archive_kanban_board_v1()) -> map().
to_map(#archive_kanban_board_v1{} = C) ->
    #{<<"command_type">> => <<"archive_kanban_board">>,
      <<"division_id">>  => C#archive_kanban_board_v1.division_id}.

get_division_id(#archive_kanban_board_v1{division_id = V}) -> V.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG

    # Event
    echo "  GEN  kanban_board_archived_v1"
    cat > "${DIR}/kanban_board_archived_v1.erl" <<'ERLANG'
%%% @doc Event: kanban board archived.
-module(kanban_board_archived_v1).

-record(kanban_board_archived_v1, {
    division_id :: binary(),
    archived_at :: non_neg_integer()
}).

-type kanban_board_archived_v1() :: #kanban_board_archived_v1{}.
-export_type([kanban_board_archived_v1/0]).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_archived_at/1]).

-spec new(map()) -> kanban_board_archived_v1().
new(Params) ->
    #kanban_board_archived_v1{
        division_id = maps:get(division_id, Params),
        archived_at = erlang:system_time(millisecond)
    }.

-spec to_map(kanban_board_archived_v1()) -> map().
to_map(#kanban_board_archived_v1{} = E) ->
    #{<<"event_type">>   => <<"kanban_board_archived_v1">>,
      <<"division_id">>  => E#kanban_board_archived_v1.division_id,
      <<"archived_at">>  => E#kanban_board_archived_v1.archived_at}.

-spec from_map(map()) -> {ok, kanban_board_archived_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_board_archived_v1{
        division_id = get_value(division_id, Map),
        archived_at = get_value(archived_at, Map, erlang:system_time(millisecond))
    }}.

get_division_id(#kanban_board_archived_v1{division_id = V}) -> V.
get_archived_at(#kanban_board_archived_v1{archived_at = V}) -> V.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, Default)
    end.
ERLANG

    # Handler
    echo "  GEN  maybe_archive_kanban_board"
    cat > "${DIR}/maybe_archive_kanban_board.erl" <<'ERLANG'
%%% @doc Handler: validate and produce kanban_board_archived_v1.
-module(maybe_archive_kanban_board).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(archive_kanban_board_v1:archive_kanban_board_v1()) ->
    {ok, [kanban_board_archived_v1:kanban_board_archived_v1()]} | {error, term()}.
handle(Cmd) ->
    case archive_kanban_board_v1:validate(Cmd) of
        ok ->
            Event = kanban_board_archived_v1:new(#{
                division_id => archive_kanban_board_v1:get_division_id(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(archive_kanban_board_v1:archive_kanban_board_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = archive_kanban_board_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = archive_kanban_board,
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = archive_kanban_board_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_kanban_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => martha_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    evoq_dispatcher:dispatch(EvoqCmd, Opts).
ERLANG

    # Emitter
    gen_emitter "kanban_board_archived_v1" "kanban_board_archived_v1" "$DIR"

    # API
    echo "  GEN  archive_kanban_board_api"
    cat > "${DIR}/archive_kanban_board_api.erl" <<'ERLANG'
%%% @doc API: POST /api/kanbans/:division_id/archive
-module(archive_kanban_board_api).

-export([routes/0, init/2]).

routes() ->
    [{"/api/kanbans/:division_id/archive", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    CmdParams = #{division_id => DivisionId},
    case archive_kanban_board_v1:new(CmdParams) of
        {ok, Cmd} ->
            case maybe_archive_kanban_board:dispatch(Cmd) of
                {ok, _Version, _Events} ->
                    hecate_plugin_api:json_ok(200,
                        #{<<"division_id">> => DivisionId,
                          <<"status">> => <<"archived">>}, Req0);
                {error, Reason} ->
                    hecate_plugin_api:bad_request(Reason, Req0)
            end;
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req0)
    end.
ERLANG
}

##############################################################################
# CARD DESKS — Generic generators
##############################################################################

# gen_card_command VERB RECORD_FIELDS VALIDATE_EXTRA CMD_FIELDS_MAP TO_MAP_FIELDS ACCESSORS GET_VALUE_EXTRA
gen_card_desk() {
    local VERB="$1"          # e.g., post_kanban_card
    local PAST="$2"          # e.g., kanban_card_posted
    local CMD_MOD="${VERB}_v1"
    local EVT_MOD="${PAST}_v1"
    local HANDLER="maybe_${VERB}"
    local API_MOD="${VERB}_api"
    local DIR="${BASE}/${VERB}"
    mkdir -p "$DIR"
    echo "=== ${VERB} ==="

    # These are set by the caller as global vars:
    # CMD_RECORD, CMD_NEW, CMD_VALIDATE, CMD_TO_MAP, CMD_FROM_MAP, CMD_ACCESSORS
    # EVT_RECORD, EVT_NEW, EVT_TO_MAP, EVT_FROM_MAP, EVT_ACCESSORS
    # HANDLER_BODY
    # API_ROUTE, API_BODY

    # Command
    echo "  GEN  ${CMD_MOD}"
    cat > "${DIR}/${CMD_MOD}.erl" <<ERLANG
%%% @doc Command: ${VERB}.
-module(${CMD_MOD}).

${CMD_RECORD}

-type ${CMD_MOD}() :: #${CMD_MOD}{}.
-export_type([${CMD_MOD}/0]).

-export([new/1, from_map/1, validate/1, to_map/1]).
${CMD_ACCESSORS}

${CMD_NEW}

${CMD_FROM_MAP}

${CMD_VALIDATE}

${CMD_TO_MAP}
$(gen_get_value)
ERLANG

    # Event
    echo "  GEN  ${EVT_MOD}"
    cat > "${DIR}/${EVT_MOD}.erl" <<ERLANG
%%% @doc Event: ${PAST}.
-module(${EVT_MOD}).

${EVT_RECORD}

-type ${EVT_MOD}() :: #${EVT_MOD}{}.
-export_type([${EVT_MOD}/0]).

-export([new/1, to_map/1, from_map/1]).
${EVT_ACCESSORS}

${EVT_NEW}

${EVT_TO_MAP}

${EVT_FROM_MAP}
$(gen_get_value)
ERLANG

    # Handler
    echo "  GEN  ${HANDLER}"
    cat > "${DIR}/${HANDLER}.erl" <<ERLANG
%%% @doc Handler: validate and produce ${EVT_MOD}.
-module(${HANDLER}).

-include("kanban_card_status.hrl").
-include_lib("evoq/include/evoq.hrl").

-export([handle/2, dispatch/1]).

${HANDLER_BODY}

-spec dispatch(${CMD_MOD}:${CMD_MOD}()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = ${CMD_MOD}:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = ${VERB},
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = ${CMD_MOD}:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_kanban_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => martha_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    evoq_dispatcher:dispatch(EvoqCmd, Opts).
ERLANG

    # Emitter
    gen_emitter "$EVT_MOD" "$EVT_MOD" "$DIR"

    # API
    echo "  GEN  ${API_MOD}"
    cat > "${DIR}/${API_MOD}.erl" <<ERLANG
%%% @doc API: ${VERB}
-module(${API_MOD}).

-export([routes/0, init/2]).

routes() ->
    [${API_ROUTE}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

${API_BODY}
ERLANG
}

##############################################################################
# POST KANBAN CARD
##############################################################################

gen_post_kanban_card() {
    CMD_RECORD=$(cat <<'EOF'
-record(post_kanban_card_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    title       :: binary(),
    description :: binary() | undefined,
    card_type   :: binary() | undefined,
    posted_by   :: binary() | undefined
}).
EOF
)

    CMD_NEW=$(cat <<'EOF'
-spec new(map()) -> {ok, post_kanban_card_v1()} | {error, term()}.
new(Params) ->
    CardId = case maps:get(card_id, Params, undefined) of
        undefined -> iolist_to_binary(io_lib:format("card-~s", [integer_to_binary(erlang:unique_integer([positive]))]));
        Id -> Id
    end,
    Cmd = #post_kanban_card_v1{
        division_id = maps:get(division_id, Params),
        card_id     = CardId,
        title       = maps:get(title, Params),
        description = maps:get(description, Params, undefined),
        card_type   = maps:get(card_type, Params, undefined),
        posted_by   = maps:get(posted_by, Params, undefined)
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end.
EOF
)

    CMD_FROM_MAP=$(cat <<'EOF'
-spec from_map(map()) -> {ok, post_kanban_card_v1()} | {error, term()}.
from_map(Map) ->
    new(#{
        division_id => get_value(division_id, Map),
        card_id     => get_value(card_id, Map, undefined),
        title       => get_value(title, Map),
        description => get_value(description, Map, undefined),
        card_type   => get_value(card_type, Map, undefined),
        posted_by   => get_value(posted_by, Map, undefined)
    }).
EOF
)

    CMD_VALIDATE=$(cat <<'EOF'
-spec validate(post_kanban_card_v1()) -> ok | {error, term()}.
validate(#post_kanban_card_v1{division_id = D, card_id = C, title = T})
  when is_binary(D), byte_size(D) > 0,
       is_binary(C), byte_size(C) > 0,
       is_binary(T), byte_size(T) > 0 -> ok;
validate(_) -> {error, invalid_post_kanban_card}.
EOF
)

    CMD_TO_MAP=$(cat <<'EOF'
-spec to_map(post_kanban_card_v1()) -> map().
to_map(#post_kanban_card_v1{} = C) ->
    #{<<"command_type">> => <<"post_kanban_card">>,
      <<"division_id">>  => C#post_kanban_card_v1.division_id,
      <<"card_id">>      => C#post_kanban_card_v1.card_id,
      <<"title">>        => C#post_kanban_card_v1.title,
      <<"description">>  => C#post_kanban_card_v1.description,
      <<"card_type">>    => C#post_kanban_card_v1.card_type,
      <<"posted_by">>    => C#post_kanban_card_v1.posted_by}.
EOF
)

    CMD_ACCESSORS=$(cat <<'EOF'
-export([get_division_id/1, get_card_id/1, get_title/1, get_description/1,
         get_card_type/1, get_posted_by/1]).

get_division_id(#post_kanban_card_v1{division_id = V}) -> V.
get_card_id(#post_kanban_card_v1{card_id = V}) -> V.
get_title(#post_kanban_card_v1{title = V}) -> V.
get_description(#post_kanban_card_v1{description = V}) -> V.
get_card_type(#post_kanban_card_v1{card_type = V}) -> V.
get_posted_by(#post_kanban_card_v1{posted_by = V}) -> V.
EOF
)

    EVT_RECORD=$(cat <<'EOF'
-record(kanban_card_posted_v1, {
    division_id :: binary(),
    card_id     :: binary(),
    title       :: binary(),
    description :: binary() | undefined,
    card_type   :: binary() | undefined,
    posted_by   :: binary() | undefined,
    posted_at   :: non_neg_integer()
}).
EOF
)

    EVT_NEW=$(cat <<'EOF'
-spec new(map()) -> kanban_card_posted_v1().
new(Params) ->
    #kanban_card_posted_v1{
        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params),
        title       = maps:get(title, Params),
        description = maps:get(description, Params, undefined),
        card_type   = maps:get(card_type, Params, undefined),
        posted_by   = maps:get(posted_by, Params, undefined),
        posted_at   = erlang:system_time(millisecond)
    }.
EOF
)

    EVT_TO_MAP=$(cat <<'EOF'
-spec to_map(kanban_card_posted_v1()) -> map().
to_map(#kanban_card_posted_v1{} = E) ->
    #{<<"event_type">>   => <<"kanban_card_posted_v1">>,
      <<"division_id">>  => E#kanban_card_posted_v1.division_id,
      <<"card_id">>      => E#kanban_card_posted_v1.card_id,
      <<"title">>        => E#kanban_card_posted_v1.title,
      <<"description">>  => E#kanban_card_posted_v1.description,
      <<"card_type">>    => E#kanban_card_posted_v1.card_type,
      <<"posted_by">>    => E#kanban_card_posted_v1.posted_by,
      <<"posted_at">>    => E#kanban_card_posted_v1.posted_at}.
EOF
)

    EVT_FROM_MAP=$(cat <<'EOF'
-spec from_map(map()) -> {ok, kanban_card_posted_v1()} | {error, term()}.
from_map(Map) ->
    {ok, #kanban_card_posted_v1{
        division_id = get_value(division_id, Map),
        card_id     = get_value(card_id, Map),
        title       = get_value(title, Map),
        description = get_value(description, Map, undefined),
        card_type   = get_value(card_type, Map, undefined),
        posted_by   = get_value(posted_by, Map, undefined),
        posted_at   = get_value(posted_at, Map, erlang:system_time(millisecond))
    }}.
EOF
)

    EVT_ACCESSORS=$(cat <<'EOF'
-export([get_division_id/1, get_card_id/1, get_title/1, get_description/1,
         get_card_type/1, get_posted_by/1, get_posted_at/1]).

get_division_id(#kanban_card_posted_v1{division_id = V}) -> V.
get_card_id(#kanban_card_posted_v1{card_id = V}) -> V.
get_title(#kanban_card_posted_v1{title = V}) -> V.
get_description(#kanban_card_posted_v1{description = V}) -> V.
get_card_type(#kanban_card_posted_v1{card_type = V}) -> V.
get_posted_by(#kanban_card_posted_v1{posted_by = V}) -> V.
get_posted_at(#kanban_card_posted_v1{posted_at = V}) -> V.
EOF
)

    HANDLER_BODY=$(cat <<'EOF'
-spec handle(post_kanban_card_v1:post_kanban_card_v1(), map()) ->
    {ok, [kanban_card_posted_v1:kanban_card_posted_v1()]} | {error, term()}.
handle(Cmd, Context) ->
    case post_kanban_card_v1:validate(Cmd) of
        ok ->
            CardId = post_kanban_card_v1:get_card_id(Cmd),
            Cards = maps:get(cards, Context, #{}),
            case maps:is_key(CardId, Cards) of
                true ->
                    {error, card_already_exists};
                false ->
                    Event = kanban_card_posted_v1:new(#{
                        division_id => post_kanban_card_v1:get_division_id(Cmd),
                        card_id     => CardId,
                        title       => post_kanban_card_v1:get_title(Cmd),
                        description => post_kanban_card_v1:get_description(Cmd),
                        card_type   => post_kanban_card_v1:get_card_type(Cmd),
                        posted_by   => post_kanban_card_v1:get_posted_by(Cmd)
                    }),
                    {ok, [Event]}
            end;
        {error, _} = Err ->
            Err
    end.
EOF
)

    API_ROUTE='{"//api/kanbans/:division_id/cards", ?MODULE, []}'
    # Fix the route - remove the double slash
    API_ROUTE='{"/api/kanbans/:division_id/cards", ?MODULE, []}'

    API_BODY=$(cat <<'EOF'
handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} ->
            CmdParams = #{
                division_id => DivisionId,
                card_id     => maps:get(<<"card_id">>, Params, undefined),
                title       => maps:get(<<"title">>, Params),
                description => maps:get(<<"description">>, Params, undefined),
                card_type   => maps:get(<<"card_type">>, Params, undefined),
                posted_by   => maps:get(<<"posted_by">>, Params, undefined)
            },
            case post_kanban_card_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_post_kanban_card:dispatch(Cmd) of
                        {ok, _Version, _Events} ->
                            hecate_plugin_api:json_ok(201,
                                #{<<"card_id">> => post_kanban_card_v1:get_card_id(Cmd),
                                  <<"status">> => <<"posted">>}, Req1);
                        {error, Reason} ->
                            hecate_plugin_api:bad_request(Reason, Req1)
                    end;
                {error, Reason} ->
                    hecate_plugin_api:bad_request(Reason, Req1)
            end;
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.
EOF
)

    gen_card_desk "post_kanban_card" "kanban_card_posted"
}

##############################################################################
# SIMPLE CARD STATE CHANGE — shared template for pick/finish/unpick/park/unpark/block/unblock
##############################################################################

gen_simple_card_op() {
    local VERB="$1"           # e.g., pick_kanban_card
    local PAST="$2"           # e.g., kanban_card_picked
    local EXTRA_CMD_FIELDS="$3"  # e.g., "picked_by" or "" or "reason"
    local EXTRA_EVT_FIELDS="$4"  # e.g., "picked_by, picked_at" or "finished_at"
    local TS_FIELD="$5"       # e.g., picked_at
    local VALID_CHECK="$6"    # erlang expression for status check
    local INVALID_ERR="$7"    # error atom
    local API_PATH="$8"       # e.g., /api/kanbans/:division_id/cards/:card_id/pick

    local CMD_MOD="${VERB}_v1"
    local EVT_MOD="${PAST}_v1"
    local HANDLER="maybe_${VERB}"

    # Build command record fields
    local CMD_REC_FIELDS="    division_id :: binary(),
    card_id     :: binary()"
    local CMD_ACCESSORS_LIST="get_division_id/1, get_card_id/1"
    local CMD_ACCESSOR_FUNS=""
    local CMD_NEW_FIELDS="        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params)"
    local CMD_FROM_FIELDS="        division_id => get_value(division_id, Map),
        card_id     => get_value(card_id, Map)"
    local CMD_TO_FIELDS="      <<\"command_type\">> => <<\"${VERB}\">>,
      <<\"division_id\">>  => C#${CMD_MOD}.division_id,
      <<\"card_id\">>      => C#${CMD_MOD}.card_id"
    local EVT_REC_FIELDS="    division_id :: binary(),
    card_id     :: binary()"
    local EVT_NEW_FIELDS="        division_id = maps:get(division_id, Params),
        card_id     = maps:get(card_id, Params)"
    local EVT_TO_FIELDS="      <<\"event_type\">>   => <<\"${EVT_MOD}\">>,
      <<\"division_id\">>  => E#${EVT_MOD}.division_id,
      <<\"card_id\">>      => E#${EVT_MOD}.card_id"
    local EVT_FROM_FIELDS="        division_id = get_value(division_id, Map),
        card_id     = get_value(card_id, Map)"
    local EVT_ACCESSORS_LIST="get_division_id/1, get_card_id/1"
    local HANDLER_EVT_FIELDS="                        division_id => ${CMD_MOD}:get_division_id(Cmd),
                        card_id     => ${CMD_MOD}:get_card_id(Cmd)"
    local API_CMD_FIELDS="                division_id => DivisionId,
                card_id     => CardId"

    # Add extra fields based on operation
    case "$EXTRA_CMD_FIELDS" in
        "picked_by")
            CMD_REC_FIELDS="${CMD_REC_FIELDS},
    picked_by   :: binary() | undefined"
            CMD_ACCESSORS_LIST="${CMD_ACCESSORS_LIST}, get_picked_by/1"
            CMD_NEW_FIELDS="${CMD_NEW_FIELDS},
        picked_by   = maps:get(picked_by, Params, undefined)"
            CMD_FROM_FIELDS="${CMD_FROM_FIELDS},
        picked_by   => get_value(picked_by, Map, undefined)"
            CMD_TO_FIELDS="${CMD_TO_FIELDS},
      <<\"picked_by\">>    => C#${CMD_MOD}.picked_by"
            CMD_ACCESSOR_FUNS="get_picked_by(#${CMD_MOD}{picked_by = V}) -> V."
            HANDLER_EVT_FIELDS="${HANDLER_EVT_FIELDS},
                        picked_by   => ${CMD_MOD}:get_picked_by(Cmd)"
            API_CMD_FIELDS="${API_CMD_FIELDS},
                picked_by   => maps:get(<<\"picked_by\">>, Params, undefined)"
            ;;
        "park_reason")
            CMD_REC_FIELDS="${CMD_REC_FIELDS},
    park_reason :: binary() | undefined,
    parked_by   :: binary() | undefined"
            CMD_ACCESSORS_LIST="${CMD_ACCESSORS_LIST}, get_park_reason/1, get_parked_by/1"
            CMD_NEW_FIELDS="${CMD_NEW_FIELDS},
        park_reason = maps:get(park_reason, Params, undefined),
        parked_by   = maps:get(parked_by, Params, undefined)"
            CMD_FROM_FIELDS="${CMD_FROM_FIELDS},
        park_reason => get_value(park_reason, Map, undefined),
        parked_by   => get_value(parked_by, Map, undefined)"
            CMD_TO_FIELDS="${CMD_TO_FIELDS},
      <<\"park_reason\">>  => C#${CMD_MOD}.park_reason,
      <<\"parked_by\">>    => C#${CMD_MOD}.parked_by"
            CMD_ACCESSOR_FUNS="get_park_reason(#${CMD_MOD}{park_reason = V}) -> V.
get_parked_by(#${CMD_MOD}{parked_by = V}) -> V."
            HANDLER_EVT_FIELDS="${HANDLER_EVT_FIELDS},
                        park_reason => ${CMD_MOD}:get_park_reason(Cmd),
                        parked_by   => ${CMD_MOD}:get_parked_by(Cmd)"
            API_CMD_FIELDS="${API_CMD_FIELDS},
                park_reason => maps:get(<<\"park_reason\">>, Params, undefined),
                parked_by   => maps:get(<<\"parked_by\">>, Params, undefined)"
            ;;
        "block_reason")
            CMD_REC_FIELDS="${CMD_REC_FIELDS},
    block_reason :: binary() | undefined,
    blocked_by   :: binary() | undefined"
            CMD_ACCESSORS_LIST="${CMD_ACCESSORS_LIST}, get_block_reason/1, get_blocked_by/1"
            CMD_NEW_FIELDS="${CMD_NEW_FIELDS},
        block_reason = maps:get(block_reason, Params, undefined),
        blocked_by   = maps:get(blocked_by, Params, undefined)"
            CMD_FROM_FIELDS="${CMD_FROM_FIELDS},
        block_reason => get_value(block_reason, Map, undefined),
        blocked_by   => get_value(blocked_by, Map, undefined)"
            CMD_TO_FIELDS="${CMD_TO_FIELDS},
      <<\"block_reason\">> => C#${CMD_MOD}.block_reason,
      <<\"blocked_by\">>   => C#${CMD_MOD}.blocked_by"
            CMD_ACCESSOR_FUNS="get_block_reason(#${CMD_MOD}{block_reason = V}) -> V.
get_blocked_by(#${CMD_MOD}{blocked_by = V}) -> V."
            HANDLER_EVT_FIELDS="${HANDLER_EVT_FIELDS},
                        block_reason => ${CMD_MOD}:get_block_reason(Cmd),
                        blocked_by   => ${CMD_MOD}:get_blocked_by(Cmd)"
            API_CMD_FIELDS="${API_CMD_FIELDS},
                block_reason => maps:get(<<\"block_reason\">>, Params, undefined),
                blocked_by   => maps:get(<<\"blocked_by\">>, Params, undefined)"
            ;;
        "reason")
            CMD_REC_FIELDS="${CMD_REC_FIELDS},
    reason :: binary() | undefined"
            CMD_ACCESSORS_LIST="${CMD_ACCESSORS_LIST}, get_reason/1"
            CMD_NEW_FIELDS="${CMD_NEW_FIELDS},
        reason = maps:get(reason, Params, undefined)"
            CMD_FROM_FIELDS="${CMD_FROM_FIELDS},
        reason => get_value(reason, Map, undefined)"
            CMD_TO_FIELDS="${CMD_TO_FIELDS},
      <<\"reason\">>       => C#${CMD_MOD}.reason"
            CMD_ACCESSOR_FUNS="get_reason(#${CMD_MOD}{reason = V}) -> V."
            HANDLER_EVT_FIELDS="${HANDLER_EVT_FIELDS},
                        reason      => ${CMD_MOD}:get_reason(Cmd)"
            API_CMD_FIELDS="${API_CMD_FIELDS},
                reason      => maps:get(<<\"reason\">>, Params, undefined)"
            ;;
    esac

    # Build event extra fields
    case "$EXTRA_EVT_FIELDS" in
        "picked_by")
            EVT_REC_FIELDS="${EVT_REC_FIELDS},
    picked_by   :: binary() | undefined,
    picked_at   :: non_neg_integer()"
            EVT_ACCESSORS_LIST="${EVT_ACCESSORS_LIST}, get_picked_by/1, get_picked_at/1"
            EVT_NEW_FIELDS="${EVT_NEW_FIELDS},
        picked_by   = maps:get(picked_by, Params, undefined),
        picked_at   = erlang:system_time(millisecond)"
            EVT_TO_FIELDS="${EVT_TO_FIELDS},
      <<\"picked_by\">>    => E#${EVT_MOD}.picked_by,
      <<\"picked_at\">>    => E#${EVT_MOD}.picked_at"
            EVT_FROM_FIELDS="${EVT_FROM_FIELDS},
        picked_by   = get_value(picked_by, Map, undefined),
        picked_at   = get_value(picked_at, Map, erlang:system_time(millisecond))"
            ;;
        "park_reason")
            EVT_REC_FIELDS="${EVT_REC_FIELDS},
    park_reason :: binary() | undefined,
    parked_by   :: binary() | undefined,
    parked_at   :: non_neg_integer()"
            EVT_ACCESSORS_LIST="${EVT_ACCESSORS_LIST}, get_park_reason/1, get_parked_by/1, get_parked_at/1"
            EVT_NEW_FIELDS="${EVT_NEW_FIELDS},
        park_reason = maps:get(park_reason, Params, undefined),
        parked_by   = maps:get(parked_by, Params, undefined),
        parked_at   = erlang:system_time(millisecond)"
            EVT_TO_FIELDS="${EVT_TO_FIELDS},
      <<\"park_reason\">>  => E#${EVT_MOD}.park_reason,
      <<\"parked_by\">>    => E#${EVT_MOD}.parked_by,
      <<\"parked_at\">>    => E#${EVT_MOD}.parked_at"
            EVT_FROM_FIELDS="${EVT_FROM_FIELDS},
        park_reason = get_value(park_reason, Map, undefined),
        parked_by   = get_value(parked_by, Map, undefined),
        parked_at   = get_value(parked_at, Map, erlang:system_time(millisecond))"
            ;;
        "block_reason")
            EVT_REC_FIELDS="${EVT_REC_FIELDS},
    block_reason :: binary() | undefined,
    blocked_by   :: binary() | undefined,
    blocked_at   :: non_neg_integer()"
            EVT_ACCESSORS_LIST="${EVT_ACCESSORS_LIST}, get_block_reason/1, get_blocked_by/1, get_blocked_at/1"
            EVT_NEW_FIELDS="${EVT_NEW_FIELDS},
        block_reason = maps:get(block_reason, Params, undefined),
        blocked_by   = maps:get(blocked_by, Params, undefined),
        blocked_at   = erlang:system_time(millisecond)"
            EVT_TO_FIELDS="${EVT_TO_FIELDS},
      <<\"block_reason\">> => E#${EVT_MOD}.block_reason,
      <<\"blocked_by\">>   => E#${EVT_MOD}.blocked_by,
      <<\"blocked_at\">>   => E#${EVT_MOD}.blocked_at"
            EVT_FROM_FIELDS="${EVT_FROM_FIELDS},
        block_reason = get_value(block_reason, Map, undefined),
        blocked_by   = get_value(blocked_by, Map, undefined),
        blocked_at   = get_value(blocked_at, Map, erlang:system_time(millisecond))"
            ;;
        "reason")
            EVT_REC_FIELDS="${EVT_REC_FIELDS},
    reason      :: binary() | undefined,
    ${TS_FIELD}   :: non_neg_integer()"
            EVT_ACCESSORS_LIST="${EVT_ACCESSORS_LIST}, get_reason/1, get_${TS_FIELD}/1"
            EVT_NEW_FIELDS="${EVT_NEW_FIELDS},
        reason      = maps:get(reason, Params, undefined),
        ${TS_FIELD}   = erlang:system_time(millisecond)"
            EVT_TO_FIELDS="${EVT_TO_FIELDS},
      <<\"reason\">>       => E#${EVT_MOD}.reason,
      <<\"${TS_FIELD}\">> => E#${EVT_MOD}.${TS_FIELD}"
            EVT_FROM_FIELDS="${EVT_FROM_FIELDS},
        reason      = get_value(reason, Map, undefined),
        ${TS_FIELD}   = get_value(${TS_FIELD}, Map, erlang:system_time(millisecond))"
            ;;
        "ts_only")
            EVT_REC_FIELDS="${EVT_REC_FIELDS},
    ${TS_FIELD} :: non_neg_integer()"
            EVT_ACCESSORS_LIST="${EVT_ACCESSORS_LIST}, get_${TS_FIELD}/1"
            EVT_NEW_FIELDS="${EVT_NEW_FIELDS},
        ${TS_FIELD} = erlang:system_time(millisecond)"
            EVT_TO_FIELDS="${EVT_TO_FIELDS},
      <<\"${TS_FIELD}\">> => E#${EVT_MOD}.${TS_FIELD}"
            EVT_FROM_FIELDS="${EVT_FROM_FIELDS},
        ${TS_FIELD} = get_value(${TS_FIELD}, Map, erlang:system_time(millisecond))"
            ;;
    esac

    # Assemble into template vars
    CMD_RECORD="-record(${CMD_MOD}, {
${CMD_REC_FIELDS}
})."

    CMD_NEW="-spec new(map()) -> {ok, ${CMD_MOD}()} | {error, term()}.
new(Params) ->
    Cmd = #${CMD_MOD}{
${CMD_NEW_FIELDS}
    },
    case validate(Cmd) of
        ok -> {ok, Cmd};
        Err -> Err
    end."

    CMD_FROM_MAP="-spec from_map(map()) -> {ok, ${CMD_MOD}()} | {error, term()}.
from_map(Map) ->
    new(#{
${CMD_FROM_FIELDS}
    })."

    CMD_VALIDATE="-spec validate(${CMD_MOD}()) -> ok | {error, term()}.
validate(#${CMD_MOD}{division_id = D, card_id = C})
  when is_binary(D), byte_size(D) > 0,
       is_binary(C), byte_size(C) > 0 -> ok;
validate(_) -> {error, invalid_${VERB}}."

    CMD_TO_MAP="-spec to_map(${CMD_MOD}()) -> map().
to_map(#${CMD_MOD}{} = C) ->
    #{${CMD_TO_FIELDS}}."

    CMD_ACCESSORS="-export([${CMD_ACCESSORS_LIST}]).

get_division_id(#${CMD_MOD}{division_id = V}) -> V.
get_card_id(#${CMD_MOD}{card_id = V}) -> V.
${CMD_ACCESSOR_FUNS}"

    EVT_RECORD="-record(${EVT_MOD}, {
${EVT_REC_FIELDS}
})."

    EVT_NEW="-spec new(map()) -> ${EVT_MOD}().
new(Params) ->
    #${EVT_MOD}{
${EVT_NEW_FIELDS}
    }."

    EVT_TO_MAP="-spec to_map(${EVT_MOD}()) -> map().
to_map(#${EVT_MOD}{} = E) ->
    #{${EVT_TO_FIELDS}}."

    EVT_FROM_MAP="-spec from_map(map()) -> {ok, ${EVT_MOD}()} | {error, term()}.
from_map(Map) ->
    {ok, #${EVT_MOD}{
${EVT_FROM_FIELDS}
    }}."

    # Build accessor functions for events
    local EVT_ACC_FUNS="get_division_id(#${EVT_MOD}{division_id = V}) -> V.
get_card_id(#${EVT_MOD}{card_id = V}) -> V."

    case "$EXTRA_EVT_FIELDS" in
        "picked_by")
            EVT_ACC_FUNS="${EVT_ACC_FUNS}
get_picked_by(#${EVT_MOD}{picked_by = V}) -> V.
get_picked_at(#${EVT_MOD}{picked_at = V}) -> V."
            ;;
        "park_reason")
            EVT_ACC_FUNS="${EVT_ACC_FUNS}
get_park_reason(#${EVT_MOD}{park_reason = V}) -> V.
get_parked_by(#${EVT_MOD}{parked_by = V}) -> V.
get_parked_at(#${EVT_MOD}{parked_at = V}) -> V."
            ;;
        "block_reason")
            EVT_ACC_FUNS="${EVT_ACC_FUNS}
get_block_reason(#${EVT_MOD}{block_reason = V}) -> V.
get_blocked_by(#${EVT_MOD}{blocked_by = V}) -> V.
get_blocked_at(#${EVT_MOD}{blocked_at = V}) -> V."
            ;;
        "reason")
            EVT_ACC_FUNS="${EVT_ACC_FUNS}
get_reason(#${EVT_MOD}{reason = V}) -> V.
get_${TS_FIELD}(#${EVT_MOD}{${TS_FIELD} = V}) -> V."
            ;;
        "ts_only")
            EVT_ACC_FUNS="${EVT_ACC_FUNS}
get_${TS_FIELD}(#${EVT_MOD}{${TS_FIELD} = V}) -> V."
            ;;
    esac

    EVT_ACCESSORS="-export([${EVT_ACCESSORS_LIST}]).

${EVT_ACC_FUNS}"

    # Handler body
    HANDLER_BODY="-spec handle(${CMD_MOD}:${CMD_MOD}(), map()) ->
    {ok, [${EVT_MOD}:${EVT_MOD}()]} | {error, term()}.
handle(Cmd, Context) ->
    case ${CMD_MOD}:validate(Cmd) of
        ok ->
            CardId = ${CMD_MOD}:get_card_id(Cmd),
            Cards = maps:get(cards, Context, #{}),
            case maps:find(CardId, Cards) of
                {ok, #{status := S}} when ${VALID_CHECK} ->
                    Event = ${EVT_MOD}:new(#{
${HANDLER_EVT_FIELDS}
                    }),
                    {ok, [Event]};
                {ok, _} ->
                    {error, ${INVALID_ERR}};
                error ->
                    {error, card_not_found}
            end;
        {error, _} = Err ->
            Err
    end."

    API_ROUTE="{\"${API_PATH}\", ?MODULE, []}"

    # Determine if we need to read JSON body (only if extra fields)
    if [ -z "$EXTRA_CMD_FIELDS" ]; then
        API_BODY="handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    CardId = cowboy_req:binding(card_id, Req0),
    CmdParams = #{
                division_id => DivisionId,
                card_id     => CardId
    },
    case ${CMD_MOD}:new(CmdParams) of
        {ok, Cmd} ->
            case ${HANDLER}:dispatch(Cmd) of
                {ok, _Version, _Events} ->
                    hecate_plugin_api:json_ok(200,
                        #{<<\"card_id\">> => CardId, <<\"status\">> => <<\"ok\">>}, Req0);
                {error, Reason} ->
                    hecate_plugin_api:bad_request(Reason, Req0)
            end;
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req0)
    end."
    else
        API_BODY="handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    CardId = cowboy_req:binding(card_id, Req0),
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} ->
            CmdParams = #{
${API_CMD_FIELDS}
            },
            case ${CMD_MOD}:new(CmdParams) of
                {ok, Cmd} ->
                    case ${HANDLER}:dispatch(Cmd) of
                        {ok, _Version, _Events} ->
                            hecate_plugin_api:json_ok(200,
                                #{<<\"card_id\">> => CardId, <<\"status\">> => <<\"ok\">>}, Req1);
                        {error, Reason} ->
                            hecate_plugin_api:bad_request(Reason, Req1)
                    end;
                {error, Reason} ->
                    hecate_plugin_api:bad_request(Reason, Req1)
            end;
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<\"Invalid JSON\">>, Req1)
    end."
    fi

    gen_card_desk "$VERB" "$PAST"
}

##############################################################################
# MAIN
##############################################################################

echo "=== Kanban Restructure: guide_kanban_lifecycle ==="
echo ""

# Board desks
gen_initiate_kanban_board
gen_archive_kanban_board

echo ""

# Card desks
# gen_simple_card_op VERB PAST EXTRA_CMD_FIELDS EXTRA_EVT_FIELDS TS_FIELD VALID_CHECK INVALID_ERR API_PATH

gen_post_kanban_card

gen_simple_card_op \
    "pick_kanban_card" "kanban_card_picked" \
    "picked_by" "picked_by" "picked_at" \
    "S band 1 =/= 0, S band 2 =:= 0, S band 4 =:= 0, S band 8 =:= 0, S band 16 =:= 0" \
    "card_not_pickable" \
    "/api/kanbans/:division_id/cards/:card_id/pick"

gen_simple_card_op \
    "finish_kanban_card" "kanban_card_finished" \
    "" "ts_only" "finished_at" \
    "S band 2 =/= 0" \
    "card_not_finishable" \
    "/api/kanbans/:division_id/cards/:card_id/finish"

gen_simple_card_op \
    "unpick_kanban_card" "kanban_card_unpicked" \
    "reason" "reason" "unpicked_at" \
    "S band 2 =/= 0, S band 4 =:= 0" \
    "card_not_unpickable" \
    "/api/kanbans/:division_id/cards/:card_id/unpick"

gen_simple_card_op \
    "park_kanban_card" "kanban_card_parked" \
    "park_reason" "park_reason" "parked_at" \
    "(S band 1 =/= 0 orelse S band 2 =/= 0), S band 4 =:= 0, S band 8 =:= 0, S band 16 =:= 0" \
    "card_not_parkable" \
    "/api/kanbans/:division_id/cards/:card_id/park"

gen_simple_card_op \
    "unpark_kanban_card" "kanban_card_unparked" \
    "" "ts_only" "unparked_at" \
    "S band 8 =/= 0" \
    "card_not_parked" \
    "/api/kanbans/:division_id/cards/:card_id/unpark"

gen_simple_card_op \
    "block_kanban_card" "kanban_card_blocked" \
    "block_reason" "block_reason" "blocked_at" \
    "(S band 1 =/= 0 orelse S band 2 =/= 0), S band 4 =:= 0, S band 8 =:= 0, S band 16 =:= 0" \
    "card_not_blockable" \
    "/api/kanbans/:division_id/cards/:card_id/block"

gen_simple_card_op \
    "unblock_kanban_card" "kanban_card_unblocked" \
    "" "ts_only" "unblocked_at" \
    "S band 16 =/= 0" \
    "card_not_blocked" \
    "/api/kanbans/:division_id/cards/:card_id/unblock"

echo ""
echo "=== Done: Generated 50 desk files ==="
echo "Next: rewrite aggregate, supervisor, PM, PRJ app"
