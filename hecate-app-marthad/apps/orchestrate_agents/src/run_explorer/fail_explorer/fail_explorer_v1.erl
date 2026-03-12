%%% @doc fail_explorer_v1 command.
%%% Fails a explorer agent session with error details.
-module(fail_explorer_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_error_reason/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(fail_explorer_v1, {
    session_id   :: binary(),
    error_reason :: binary() | undefined,
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer()
}).

-export_type([fail_explorer_v1/0]).
-opaque fail_explorer_v1() :: #fail_explorer_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, fail_explorer_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #fail_explorer_v1{
        session_id = SessionId,
        error_reason = maps:get(error_reason, Params, undefined),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(fail_explorer_v1()) -> ok | {error, term()}.
validate(#fail_explorer_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#fail_explorer_v1{}) ->
    ok.

-spec to_map(fail_explorer_v1()) -> map().
to_map(#fail_explorer_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"fail_agent">>,
        <<"agent_role">> => <<"explorer">>,
        <<"session_id">> => Cmd#fail_explorer_v1.session_id,
        <<"error_reason">> => Cmd#fail_explorer_v1.error_reason,
        <<"tokens_in">> => Cmd#fail_explorer_v1.tokens_in,
        <<"tokens_out">> => Cmd#fail_explorer_v1.tokens_out
    }.

-spec from_map(map()) -> {ok, fail_explorer_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #fail_explorer_v1{
                session_id = SessionId,
                error_reason = get_value(error_reason, Map, undefined),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#fail_explorer_v1{session_id = V}) -> V.
get_error_reason(#fail_explorer_v1{error_reason = V}) -> V.
get_tokens_in(#fail_explorer_v1{tokens_in = V}) -> V.
get_tokens_out(#fail_explorer_v1{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
