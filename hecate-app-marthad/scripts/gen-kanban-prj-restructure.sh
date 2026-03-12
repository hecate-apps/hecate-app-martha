#!/usr/bin/env bash
set -euo pipefail

# Restructure project_division_kanbans PRJ app:
# - Rename tables: kanban_items -> kanban_cards
# - Rename event references: old -> new event names
# - Add projection desks for new card operations (park/unpark/block/unblock)

BASE="apps/project_division_kanbans/src"

echo "=== PRJ Restructure: project_division_kanbans ==="

##############################################################################
# Step 1: Delete old projection desks
##############################################################################

echo ""
echo "--- Deleting old projection desks ---"
rm -rf "${BASE}/kanban_initiated"
rm -rf "${BASE}/kanban_archived"
rm -rf "${BASE}/kanban_item_submitted"
rm -rf "${BASE}/kanban_item_picked"
rm -rf "${BASE}/kanban_item_completed"
rm -rf "${BASE}/kanban_item_returned"
echo "  Deleted 6 old desks"

##############################################################################
# Step 2: Helper
##############################################################################

gen_get_value() {
    cat <<'ERLANG'

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG
}

##############################################################################
# Step 3: Board projection desks
##############################################################################

# --- kanban_board_initiated ---
DIR="${BASE}/kanban_board_initiated"
mkdir -p "$DIR"
echo "  GEN  kanban_board_initiated desk"

cat > "${DIR}/kanban_board_initiated_v1_to_sqlite_division_kanbans.erl" <<'ERLANG'
%%% @doc Projection: kanban_board_initiated_v1 -> division_kanbans table
-module(kanban_board_initiated_v1_to_sqlite_division_kanbans).

-include_lib("guide_kanban_lifecycle/include/kanban_board_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    VentureId = get(venture_id, Event),
    ContextName = get(context_name, Event),
    InitiatedAt = get(initiated_at, Event),
    InitiatedBy = get(initiated_by, Event),
    Status = ?BOARD_INITIATED bor ?BOARD_ACTIVE,
    StatusLabel = evoq_bit_flags:to_string(Status, ?BOARD_FLAG_MAP),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    Sql = "INSERT OR REPLACE INTO division_kanbans "
          "(division_id, venture_id, context_name, status, status_label, "
          "initiated_at, initiated_by) "
          "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
    project_division_kanbans_store:execute(Sql, [
        DivisionId, VentureId, ContextName, Status, StatusLabel,
        InitiatedAt, InitiatedBy
    ]).

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG

cat > "${DIR}/on_kanban_board_initiated_v1_from_pg_project_to_sqlite_division_kanbans.erl" <<'ERLANG'
%%% @doc Projection subscriber: kanban_board_initiated_v1 -> sqlite division_kanbans
-module(on_kanban_board_initiated_v1_from_pg_project_to_sqlite_division_kanbans).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"kanban_board_initiated_v1">>).
-define(SUB_NAME, <<"kanban_board_initiated_v1_to_division_kanbans">>).
-define(STORE_ID, martha_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        case kanban_board_initiated_v1_to_sqlite_division_kanbans:project(app_marthad_projection_event:to_map(E)) of
            ok -> ok;
            {error, Reason} ->
                logger:warning("[~s] projection failed: ~p", [?EVENT_TYPE, Reason])
        end
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLANG

cat > "${DIR}/kanban_board_initiated_v1_to_division_kanbans_sup.erl" <<'ERLANG'
%%% @doc Supervisor for kanban_board_initiated_v1 projection desk.
-module(kanban_board_initiated_v1_to_division_kanbans_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{
            id => pg_listener,
            start => {on_kanban_board_initiated_v1_from_pg_project_to_sqlite_division_kanbans, start_link, []},
            restart => permanent,
            type => worker
        }
    ],
    {ok, {#{strategy => one_for_one, intensity => 10, period => 10}, Children}}.
ERLANG

# --- kanban_board_archived ---
DIR="${BASE}/kanban_board_archived"
mkdir -p "$DIR"
echo "  GEN  kanban_board_archived desk"

cat > "${DIR}/kanban_board_archived_v1_to_sqlite_division_kanbans.erl" <<'ERLANG'
%%% @doc Projection: kanban_board_archived_v1 -> division_kanbans table (update)
-module(kanban_board_archived_v1_to_sqlite_division_kanbans).

-include_lib("guide_kanban_lifecycle/include/kanban_board_status.hrl").

-export([project/1]).

project(Event) ->
    DivisionId = get(division_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, DivisionId]),
    case project_division_kanbans_store:query(
        "SELECT status FROM division_kanbans WHERE division_id = ?1", [DivisionId]) of
        {ok, [[CurrentStatus]]} ->
            NewStatus = CurrentStatus bor ?BOARD_ARCHIVED,
            StatusLabel = evoq_bit_flags:to_string(NewStatus, ?BOARD_FLAG_MAP),
            Sql = "UPDATE division_kanbans SET status = ?1, status_label = ?2 WHERE division_id = ?3",
            project_division_kanbans_store:execute(Sql, [NewStatus, StatusLabel, DivisionId]);
        {ok, []} ->
            logger:warning("[~s] kanban ~s not found for archive", [?MODULE, DivisionId]),
            ok;
        {error, Reason} ->
            {error, Reason}
    end.

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG

cat > "${DIR}/on_kanban_board_archived_v1_from_pg_project_to_sqlite_division_kanbans.erl" <<'ERLANG'
%%% @doc Projection subscriber: kanban_board_archived_v1 -> sqlite division_kanbans
-module(on_kanban_board_archived_v1_from_pg_project_to_sqlite_division_kanbans).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"kanban_board_archived_v1">>).
-define(SUB_NAME, <<"kanban_board_archived_v1_to_division_kanbans">>).
-define(STORE_ID, martha_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        case kanban_board_archived_v1_to_sqlite_division_kanbans:project(app_marthad_projection_event:to_map(E)) of
            ok -> ok;
            {error, Reason} ->
                logger:warning("[~s] projection failed: ~p", [?EVENT_TYPE, Reason])
        end
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLANG

cat > "${DIR}/kanban_board_archived_v1_to_division_kanbans_sup.erl" <<'ERLANG'
%%% @doc Supervisor for kanban_board_archived_v1 projection desk.
-module(kanban_board_archived_v1_to_division_kanbans_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{
            id => pg_listener,
            start => {on_kanban_board_archived_v1_from_pg_project_to_sqlite_division_kanbans, start_link, []},
            restart => permanent,
            type => worker
        }
    ],
    {ok, {#{strategy => one_for_one, intensity => 10, period => 10}, Children}}.
ERLANG

##############################################################################
# Step 4: Card projection desks — generic generator
##############################################################################

gen_card_projection() {
    local EVENT_TYPE="$1"    # e.g., kanban_card_posted_v1
    local PROJ_BODY="$2"     # erlang function body for project/1
    local DESK_DIR="${BASE}/${EVENT_TYPE%_v1}"  # strip _v1 for dir name

    local PROJ_MOD="${EVENT_TYPE}_to_sqlite_kanban_cards"
    local LISTENER_MOD="on_${EVENT_TYPE}_from_pg_project_to_sqlite_kanban_cards"
    local SUP_MOD="${EVENT_TYPE}_to_kanban_cards_sup"

    mkdir -p "$DESK_DIR"
    echo "  GEN  ${EVENT_TYPE%_v1} desk"

    # Projection
    cat > "${DESK_DIR}/${PROJ_MOD}.erl" <<ERLANG
%%% @doc Projection: ${EVENT_TYPE} -> kanban_cards table
-module(${PROJ_MOD}).

-export([project/1]).

${PROJ_BODY}

get(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
ERLANG

    # Listener
    cat > "${DESK_DIR}/${LISTENER_MOD}.erl" <<ERLANG
%%% @doc Projection subscriber: ${EVENT_TYPE} -> sqlite kanban_cards
-module(${LISTENER_MOD}).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"${EVENT_TYPE}">>).
-define(SUB_NAME, <<"${EVENT_TYPE}_to_kanban_cards">>).
-define(STORE_ID, martha_store).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun(E) ->
        case ${PROJ_MOD}:project(app_marthad_projection_event:to_map(E)) of
            ok -> ok;
            {error, Reason} ->
                logger:warning("[~s] projection failed: ~p", [?EVENT_TYPE, Reason])
        end
    end, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.
ERLANG

    # Supervisor
    cat > "${DESK_DIR}/${SUP_MOD}.erl" <<ERLANG
%%% @doc Supervisor for ${EVENT_TYPE} projection desk.
-module(${SUP_MOD}).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        #{
            id => pg_listener,
            start => {${LISTENER_MOD}, start_link, []},
            restart => permanent,
            type => worker
        }
    ],
    {ok, {#{strategy => one_for_one, intensity => 10, period => 10}, Children}}.
ERLANG
}

# posted — INSERT
gen_card_projection "kanban_card_posted_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    DivisionId = get(division_id, Event),
    Title = get(title, Event),
    Description = get(description, Event),
    CardType = get(card_type, Event),
    PostedBy = get(posted_by, Event),
    PostedAt = get(posted_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "INSERT OR REPLACE INTO kanban_cards "
          "(card_id, division_id, title, description, card_type, status, status_text, "
          "posted_by, posted_at) "
          "VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)",
    project_division_kanbans_store:execute(Sql, [
        CardId, DivisionId, Title, Description, CardType,
        1, <<"posted">>, PostedBy, PostedAt
    ]).'

# picked — UPDATE
gen_card_projection "kanban_card_picked_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    PickedBy = get(picked_by, Event),
    PickedAt = get(picked_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 2, status_text = ?1, picked_by = ?2, picked_at = ?3 "
          "WHERE card_id = ?4",
    project_division_kanbans_store:execute(Sql, [
        <<"picked">>, PickedBy, PickedAt, CardId
    ]).'

# finished — UPDATE
gen_card_projection "kanban_card_finished_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    FinishedAt = get(finished_at, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 4, status_text = ?1, finished_at = ?2 "
          "WHERE card_id = ?3",
    project_division_kanbans_store:execute(Sql, [
        <<"finished">>, FinishedAt, CardId
    ]).'

# unpicked — UPDATE (back to posted)
gen_card_projection "kanban_card_unpicked_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 1, status_text = ?1, picked_by = NULL, picked_at = NULL "
          "WHERE card_id = ?2",
    project_division_kanbans_store:execute(Sql, [
        <<"posted">>, CardId
    ]).'

# parked — UPDATE
gen_card_projection "kanban_card_parked_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    ParkedBy = get(parked_by, Event),
    ParkedAt = get(parked_at, Event),
    ParkReason = get(park_reason, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 8, status_text = ?1, parked_by = ?2, parked_at = ?3, park_reason = ?4 "
          "WHERE card_id = ?5",
    project_division_kanbans_store:execute(Sql, [
        <<"parked">>, ParkedBy, ParkedAt, ParkReason, CardId
    ]).'

# unparked — UPDATE (back to posted)
gen_card_projection "kanban_card_unparked_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 1, status_text = ?1, parked_by = NULL, parked_at = NULL, park_reason = NULL "
          "WHERE card_id = ?2",
    project_division_kanbans_store:execute(Sql, [
        <<"posted">>, CardId
    ]).'

# blocked — UPDATE
gen_card_projection "kanban_card_blocked_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    BlockedBy = get(blocked_by, Event),
    BlockedAt = get(blocked_at, Event),
    BlockReason = get(block_reason, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 16, status_text = ?1, blocked_by = ?2, blocked_at = ?3, block_reason = ?4 "
          "WHERE card_id = ?5",
    project_division_kanbans_store:execute(Sql, [
        <<"blocked">>, BlockedBy, BlockedAt, BlockReason, CardId
    ]).'

# unblocked — UPDATE (back to posted)
gen_card_projection "kanban_card_unblocked_v1" 'project(Event) ->
    CardId = get(card_id, Event),
    logger:info("[PROJECTION] ~s: projecting ~s", [?MODULE, CardId]),
    Sql = "UPDATE kanban_cards SET status = 1, status_text = ?1, blocked_by = NULL, blocked_at = NULL, block_reason = NULL "
          "WHERE card_id = ?2",
    project_division_kanbans_store:execute(Sql, [
        <<"posted">>, CardId
    ]).'

echo ""
echo "=== Done: PRJ projection desks generated ==="
echo "Next: update store schema, supervisor, app.src"
