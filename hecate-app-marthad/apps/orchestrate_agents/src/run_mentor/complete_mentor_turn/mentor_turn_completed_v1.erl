%%% @doc mentor_turn_completed_v1 event.
%%% Emitted when a mentor agent completes a conversational turn.
-module(mentor_turn_completed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_agent_output/1, get_turn_number/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(mentor_turn_completed_v1, {
    session_id   :: binary(),
    agent_role   :: binary(),
    venture_id   :: binary(),
    agent_output :: binary() | undefined,
    turn_number  :: non_neg_integer(),
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer(),
    completed_at :: integer()
}).

-export_type([mentor_turn_completed_v1/0]).
-opaque mentor_turn_completed_v1() :: #mentor_turn_completed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> mentor_turn_completed_v1().
new(#{session_id := SessionId} = Params) ->
    #mentor_turn_completed_v1{
        session_id = SessionId,
        agent_role = <<"mentor">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        agent_output = maps:get(agent_output, Params, undefined),
        turn_number = maps:get(turn_number, Params, 1),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0),
        completed_at = erlang:system_time(millisecond)
    }.

-spec to_map(mentor_turn_completed_v1()) -> map().
to_map(#mentor_turn_completed_v1{} = E) ->
    #{
        <<"event_type">> => <<"mentor_turn_completed_v1">>,
        <<"session_id">> => E#mentor_turn_completed_v1.session_id,
        <<"agent_role">> => E#mentor_turn_completed_v1.agent_role,
        <<"venture_id">> => E#mentor_turn_completed_v1.venture_id,
        <<"agent_output">> => E#mentor_turn_completed_v1.agent_output,
        <<"turn_number">> => E#mentor_turn_completed_v1.turn_number,
        <<"tokens_in">> => E#mentor_turn_completed_v1.tokens_in,
        <<"tokens_out">> => E#mentor_turn_completed_v1.tokens_out,
        <<"completed_at">> => E#mentor_turn_completed_v1.completed_at
    }.

-spec from_map(map()) -> {ok, mentor_turn_completed_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #mentor_turn_completed_v1{
                session_id = SessionId,
                agent_role = <<"mentor">>,
                venture_id = get_value(venture_id, Map, <<>>),
                agent_output = get_value(agent_output, Map, undefined),
                turn_number = get_value(turn_number, Map, 1),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0),
                completed_at = get_value(completed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#mentor_turn_completed_v1{session_id = V}) -> V.
get_agent_output(#mentor_turn_completed_v1{agent_output = V}) -> V.
get_turn_number(#mentor_turn_completed_v1{turn_number = V}) -> V.
get_tokens_in(#mentor_turn_completed_v1{tokens_in = V}) -> V.
get_tokens_out(#mentor_turn_completed_v1{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
