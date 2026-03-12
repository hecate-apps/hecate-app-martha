%%% @doc complete_mentor_turn_v1 command.
%%% Completes a turn for a conversational mentor agent.
-module(complete_mentor_turn_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_agent_output/1, get_turn_number/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(complete_mentor_turn_v1, {
    session_id   :: binary(),
    agent_output :: binary() | undefined,
    turn_number  :: non_neg_integer(),
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer()
}).

-export_type([complete_mentor_turn_v1/0]).
-opaque complete_mentor_turn_v1() :: #complete_mentor_turn_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, complete_mentor_turn_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #complete_mentor_turn_v1{
        session_id = SessionId,
        agent_output = maps:get(agent_output, Params, undefined),
        turn_number = maps:get(turn_number, Params, 1),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(complete_mentor_turn_v1()) -> ok | {error, term()}.
validate(#complete_mentor_turn_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#complete_mentor_turn_v1{}) ->
    ok.

-spec to_map(complete_mentor_turn_v1()) -> map().
to_map(#complete_mentor_turn_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"complete_agent_turn">>,
        <<"agent_role">> => <<"mentor">>,
        <<"session_id">> => Cmd#complete_mentor_turn_v1.session_id,
        <<"agent_output">> => Cmd#complete_mentor_turn_v1.agent_output,
        <<"turn_number">> => Cmd#complete_mentor_turn_v1.turn_number,
        <<"tokens_in">> => Cmd#complete_mentor_turn_v1.tokens_in,
        <<"tokens_out">> => Cmd#complete_mentor_turn_v1.tokens_out
    }.

-spec from_map(map()) -> {ok, complete_mentor_turn_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #complete_mentor_turn_v1{
                session_id = SessionId,
                agent_output = get_value(agent_output, Map, undefined),
                turn_number = get_value(turn_number, Map, 1),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#complete_mentor_turn_v1{session_id = V}) -> V.
get_agent_output(#complete_mentor_turn_v1{agent_output = V}) -> V.
get_turn_number(#complete_mentor_turn_v1{turn_number = V}) -> V.
get_tokens_in(#complete_mentor_turn_v1{tokens_in = V}) -> V.
get_tokens_out(#complete_mentor_turn_v1{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
