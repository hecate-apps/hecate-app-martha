%%% @doc complete_architect_v1 command.
%%% Completes a architect agent session with LLM output.
-module(complete_architect_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_notation_output/1, get_parsed_terms/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(complete_architect_v1, {
    session_id      :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    tokens_in       :: non_neg_integer(),
    tokens_out      :: non_neg_integer()
}).

-export_type([complete_architect_v1/0]).
-opaque complete_architect_v1() :: #complete_architect_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, complete_architect_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #complete_architect_v1{
        session_id = SessionId,
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(complete_architect_v1()) -> ok | {error, term()}.
validate(#complete_architect_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#complete_architect_v1{}) ->
    ok.

-spec to_map(complete_architect_v1()) -> map().
to_map(#complete_architect_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"complete_agent">>,
        <<"agent_role">> => <<"architect">>,
        <<"session_id">> => Cmd#complete_architect_v1.session_id,
        <<"notation_output">> => Cmd#complete_architect_v1.notation_output,
        <<"parsed_terms">> => Cmd#complete_architect_v1.parsed_terms,
        <<"tokens_in">> => Cmd#complete_architect_v1.tokens_in,
        <<"tokens_out">> => Cmd#complete_architect_v1.tokens_out
    }.

-spec from_map(map()) -> {ok, complete_architect_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #complete_architect_v1{
                session_id = SessionId,
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#complete_architect_v1{session_id = V}) -> V.
get_notation_output(#complete_architect_v1{notation_output = V}) -> V.
get_parsed_terms(#complete_architect_v1{parsed_terms = V}) -> V.
get_tokens_in(#complete_architect_v1{tokens_in = V}) -> V.
get_tokens_out(#complete_architect_v1{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
