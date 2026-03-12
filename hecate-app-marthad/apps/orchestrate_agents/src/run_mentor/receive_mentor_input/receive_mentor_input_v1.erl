%%% @doc receive_mentor_input_v1 command.
%%% Receives new input for a conversational mentor agent.
-module(receive_mentor_input_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_input_content/1, get_input_by/1]).

-record(receive_mentor_input_v1, {
    session_id    :: binary(),
    input_content :: binary() | undefined,
    input_by      :: binary() | undefined
}).

-export_type([receive_mentor_input_v1/0]).
-opaque receive_mentor_input_v1() :: #receive_mentor_input_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, receive_mentor_input_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #receive_mentor_input_v1{
        session_id = SessionId,
        input_content = maps:get(input_content, Params, undefined),
        input_by = maps:get(input_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(receive_mentor_input_v1()) -> ok | {error, term()}.
validate(#receive_mentor_input_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#receive_mentor_input_v1{}) ->
    ok.

-spec to_map(receive_mentor_input_v1()) -> map().
to_map(#receive_mentor_input_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"receive_agent_input">>,
        <<"agent_role">> => <<"mentor">>,
        <<"session_id">> => Cmd#receive_mentor_input_v1.session_id,
        <<"input_content">> => Cmd#receive_mentor_input_v1.input_content,
        <<"input_by">> => Cmd#receive_mentor_input_v1.input_by
    }.

-spec from_map(map()) -> {ok, receive_mentor_input_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #receive_mentor_input_v1{
                session_id = SessionId,
                input_content = get_value(input_content, Map, undefined),
                input_by = get_value(input_by, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#receive_mentor_input_v1{session_id = V}) -> V.
get_input_content(#receive_mentor_input_v1{input_content = V}) -> V.
get_input_by(#receive_mentor_input_v1{input_by = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
