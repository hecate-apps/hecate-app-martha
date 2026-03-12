%%% @doc Division kanban aggregate — coordination buffer between agents.
%%%
%%% Stream: division-kanban-{division_id}
%%% Store: martha_store
%%%
%%% Each division has its own kanban board. Planning agents post cards,
%%% crafting agents pick them. The board is the visible handoff point.
%%%
%%% Board lifecycle:
%%%   1. initiate_kanban_board (birth event, auto-activates)
%%%   2. Card operations: post / pick / finish / unpick / park / unpark / block / unblock
%%%   3. archive_kanban_board (walking skeleton — only exit state)
%%%
%%% Card state machine (bit flags):
%%%   POSTED -> PICKED -> FINISHED
%%%   POSTED -> PARKED -> (unpark) -> POSTED
%%%   POSTED -> BLOCKED -> (unblock) -> POSTED
%%%   PICKED -> PARKED -> (unpark) -> POSTED
%%%   PICKED -> BLOCKED -> (unblock) -> POSTED
%%%   PICKED -> (unpick) -> POSTED
%%% @end
-module(division_kanban_aggregate).

-behaviour(evoq_aggregate).

-include("kanban_board_status.hrl").
-include("kanban_card_status.hrl").

-export([init/1, execute/2, apply/2]).
-export([initial_state/0, apply_event/2]).
-export([board_flag_map/0, card_flag_map/0]).

-record(division_kanban_state, {
    division_id    :: binary() | undefined,
    venture_id     :: binary() | undefined,
    context_name   :: binary() | undefined,
    board_status = 0 :: non_neg_integer(),
    initiated_at   :: non_neg_integer() | undefined,
    initiated_by   :: binary() | undefined,
    cards = #{}    :: map()  %% card_id => #{status => integer(), ...}
}).

-type state() :: #division_kanban_state{}.
-export_type([state/0]).

-spec board_flag_map() -> evoq_bit_flags:flag_map().
board_flag_map() -> ?BOARD_FLAG_MAP.

-spec card_flag_map() -> evoq_bit_flags:flag_map().
card_flag_map() -> ?CARD_FLAG_MAP.

%% --- Callbacks ---

-spec init(binary()) -> {ok, state()}.
init(_AggregateId) ->
    {ok, initial_state()}.

-spec initial_state() -> state().
initial_state() ->
    #division_kanban_state{}.

%% --- Execute ---
%% NOTE: evoq calls execute(State, Payload) - State FIRST!

-spec execute(state(), map()) -> {ok, [map()]} | {error, term()}.

%% Fresh aggregate — only initiate allowed
execute(#division_kanban_state{board_status = 0}, Payload) ->
    case get_command_type(Payload) of
        <<"initiate_kanban_board">> -> execute_initiate_board(Payload);
        _ -> {error, board_not_initiated}
    end;

%% Archived — nothing allowed
execute(#division_kanban_state{board_status = S}, _Payload) when S band ?BOARD_ARCHIVED =/= 0 ->
    {error, board_archived};

%% Initiated and not archived — route by command type
execute(#division_kanban_state{board_status = S} = State, Payload) when S band ?BOARD_INITIATED =/= 0 ->
    case get_command_type(Payload) of
        <<"archive_kanban_board">>  -> execute_archive_board(Payload);
        <<"post_kanban_card">>      -> require_active(S, fun() -> execute_post_card(Payload, State) end);
        <<"pick_kanban_card">>      -> require_active(S, fun() -> execute_pick_card(Payload, State) end);
        <<"finish_kanban_card">>    -> require_active(S, fun() -> execute_finish_card(Payload, State) end);
        <<"unpick_kanban_card">>    -> require_active(S, fun() -> execute_unpick_card(Payload, State) end);
        <<"park_kanban_card">>      -> require_active(S, fun() -> execute_park_card(Payload, State) end);
        <<"unpark_kanban_card">>    -> require_active(S, fun() -> execute_unpark_card(Payload, State) end);
        <<"block_kanban_card">>     -> require_active(S, fun() -> execute_block_card(Payload, State) end);
        <<"unblock_kanban_card">>   -> require_active(S, fun() -> execute_unblock_card(Payload, State) end);
        _ -> {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Command handlers ---

execute_initiate_board(Payload) ->
    {ok, Cmd} = initiate_kanban_board_v1:from_map(Payload),
    convert_events(maybe_initiate_kanban_board:handle(Cmd), fun kanban_board_initiated_v1:to_map/1).

execute_archive_board(Payload) ->
    {ok, Cmd} = archive_kanban_board_v1:from_map(Payload),
    convert_events(maybe_archive_kanban_board:handle(Cmd), fun kanban_board_archived_v1:to_map/1).

execute_post_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = post_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_post_kanban_card:handle(Cmd, Context), fun kanban_card_posted_v1:to_map/1).

execute_pick_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = pick_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_pick_kanban_card:handle(Cmd, Context), fun kanban_card_picked_v1:to_map/1).

execute_finish_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = finish_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_finish_kanban_card:handle(Cmd, Context), fun kanban_card_finished_v1:to_map/1).

execute_unpick_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = unpick_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_unpick_kanban_card:handle(Cmd, Context), fun kanban_card_unpicked_v1:to_map/1).

execute_park_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = park_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_park_kanban_card:handle(Cmd, Context), fun kanban_card_parked_v1:to_map/1).

execute_unpark_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = unpark_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_unpark_kanban_card:handle(Cmd, Context), fun kanban_card_unparked_v1:to_map/1).

execute_block_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = block_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_block_kanban_card:handle(Cmd, Context), fun kanban_card_blocked_v1:to_map/1).

execute_unblock_card(Payload, #division_kanban_state{cards = Cards}) ->
    {ok, Cmd} = unblock_kanban_card_v1:from_map(Payload),
    Context = #{cards => Cards},
    convert_events(maybe_unblock_kanban_card:handle(Cmd, Context), fun kanban_card_unblocked_v1:to_map/1).

require_active(S, Fun) ->
    case S band ?BOARD_ACTIVE of
        0 -> {error, board_not_active};
        _ -> Fun()
    end.

%% --- Apply ---
%% NOTE: evoq calls apply(State, Event) - State FIRST!

-spec apply(state(), map()) -> state().
apply(State, Event) ->
    apply_event(Event, State).

-spec apply_event(map(), state()) -> state().

%% Board lifecycle events
apply_event(#{<<"event_type">> := <<"kanban_board_initiated_v1">>} = E, S) -> apply_board_initiated(E, S);
apply_event(#{event_type := <<"kanban_board_initiated_v1">>} = E, S)      -> apply_board_initiated(E, S);
apply_event(#{<<"event_type">> := <<"kanban_board_archived_v1">>}, S)      -> apply_board_archived(S);
apply_event(#{event_type := <<"kanban_board_archived_v1">>}, S)            -> apply_board_archived(S);

%% Card events
apply_event(#{<<"event_type">> := <<"kanban_card_posted_v1">>} = E, S)     -> apply_card_posted(E, S);
apply_event(#{event_type := <<"kanban_card_posted_v1">>} = E, S)           -> apply_card_posted(E, S);
apply_event(#{<<"event_type">> := <<"kanban_card_picked_v1">>} = E, S)     -> apply_card_picked(E, S);
apply_event(#{event_type := <<"kanban_card_picked_v1">>} = E, S)           -> apply_card_picked(E, S);
apply_event(#{<<"event_type">> := <<"kanban_card_finished_v1">>} = E, S)   -> apply_card_finished(E, S);
apply_event(#{event_type := <<"kanban_card_finished_v1">>} = E, S)         -> apply_card_finished(E, S);
apply_event(#{<<"event_type">> := <<"kanban_card_unpicked_v1">>} = E, S)   -> apply_card_unpicked(E, S);
apply_event(#{event_type := <<"kanban_card_unpicked_v1">>} = E, S)         -> apply_card_unpicked(E, S);
apply_event(#{<<"event_type">> := <<"kanban_card_parked_v1">>} = E, S)     -> apply_card_parked(E, S);
apply_event(#{event_type := <<"kanban_card_parked_v1">>} = E, S)           -> apply_card_parked(E, S);
apply_event(#{<<"event_type">> := <<"kanban_card_unparked_v1">>} = E, S)   -> apply_card_unparked(E, S);
apply_event(#{event_type := <<"kanban_card_unparked_v1">>} = E, S)         -> apply_card_unparked(E, S);
apply_event(#{<<"event_type">> := <<"kanban_card_blocked_v1">>} = E, S)    -> apply_card_blocked(E, S);
apply_event(#{event_type := <<"kanban_card_blocked_v1">>} = E, S)          -> apply_card_blocked(E, S);
apply_event(#{<<"event_type">> := <<"kanban_card_unblocked_v1">>} = E, S)  -> apply_card_unblocked(E, S);
apply_event(#{event_type := <<"kanban_card_unblocked_v1">>} = E, S)        -> apply_card_unblocked(E, S);

%% Unknown — ignore
apply_event(_E, S) -> S.

%% --- Apply helpers ---

apply_board_initiated(E, State) ->
    State#division_kanban_state{
        division_id = get_value(division_id, E),
        venture_id = get_value(venture_id, E),
        context_name = get_value(context_name, E),
        board_status = evoq_bit_flags:set(
            evoq_bit_flags:set(0, ?BOARD_INITIATED),
            ?BOARD_ACTIVE),
        initiated_at = get_value(initiated_at, E),
        initiated_by = get_value(initiated_by, E)
    }.

apply_board_archived(#division_kanban_state{board_status = Status} = State) ->
    State#division_kanban_state{board_status = evoq_bit_flags:set(Status, ?BOARD_ARCHIVED)}.

apply_card_posted(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    Entry = #{
        status => ?CARD_POSTED,
        title => get_value(title, E),
        description => get_value(description, E),
        card_type => get_value(card_type, E),
        posted_by => get_value(posted_by, E),
        posted_at => get_value(posted_at, E)
    },
    State#division_kanban_state{cards = Cards#{CardId => Entry}}.

apply_card_picked(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    case maps:find(CardId, Cards) of
        {ok, Card} ->
            Updated = Card#{
                status => ?CARD_PICKED,
                picked_by => get_value(picked_by, E),
                picked_at => get_value(picked_at, E)
            },
            State#division_kanban_state{cards = Cards#{CardId => Updated}};
        error ->
            State
    end.

apply_card_finished(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    case maps:find(CardId, Cards) of
        {ok, Card} ->
            Updated = Card#{
                status => ?CARD_FINISHED,
                finished_at => get_value(finished_at, E)
            },
            State#division_kanban_state{cards = Cards#{CardId => Updated}};
        error ->
            State
    end.

apply_card_unpicked(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    case maps:find(CardId, Cards) of
        {ok, Card} ->
            Updated = Card#{
                status => ?CARD_POSTED,
                picked_by => undefined,
                picked_at => undefined
            },
            State#division_kanban_state{cards = Cards#{CardId => Updated}};
        error ->
            State
    end.

apply_card_parked(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    case maps:find(CardId, Cards) of
        {ok, Card} ->
            Updated = Card#{
                status => ?CARD_PARKED,
                parked_by => get_value(parked_by, E),
                parked_at => get_value(parked_at, E),
                park_reason => get_value(park_reason, E)
            },
            State#division_kanban_state{cards = Cards#{CardId => Updated}};
        error ->
            State
    end.

apply_card_unparked(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    case maps:find(CardId, Cards) of
        {ok, Card} ->
            Updated = Card#{
                status => ?CARD_POSTED,
                parked_by => undefined,
                parked_at => undefined,
                park_reason => undefined
            },
            State#division_kanban_state{cards = Cards#{CardId => Updated}};
        error ->
            State
    end.

apply_card_blocked(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    case maps:find(CardId, Cards) of
        {ok, Card} ->
            Updated = Card#{
                status => ?CARD_BLOCKED,
                blocked_by => get_value(blocked_by, E),
                blocked_at => get_value(blocked_at, E),
                block_reason => get_value(block_reason, E)
            },
            State#division_kanban_state{cards = Cards#{CardId => Updated}};
        error ->
            State
    end.

apply_card_unblocked(E, #division_kanban_state{cards = Cards} = State) ->
    CardId = get_value(card_id, E),
    case maps:find(CardId, Cards) of
        {ok, Card} ->
            Updated = Card#{
                status => ?CARD_POSTED,
                blocked_by => undefined,
                blocked_at => undefined,
                block_reason => undefined
            },
            State#division_kanban_state{cards = Cards#{CardId => Updated}};
        error ->
            State
    end.

%% --- Internal ---

get_command_type(#{<<"command_type">> := T}) -> T;
get_command_type(#{command_type := T}) when is_binary(T) -> T;
get_command_type(#{command_type := T}) when is_atom(T) -> atom_to_binary(T);
get_command_type(_) -> undefined.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.

convert_events({ok, Events}, ToMapFn) ->
    {ok, [ToMapFn(E) || E <- Events]};
convert_events({error, _} = Err, _) ->
    Err.
