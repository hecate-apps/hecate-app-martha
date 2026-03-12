%%% @doc escalate_review_gate_v1 command.
%%% Escalates a completed reviewer session to the review_gate for HITL review.
-module(escalate_review_gate_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1]).

-record(escalate_review_gate_v1, {
    session_id :: binary()
}).

-export_type([escalate_review_gate_v1/0]).
-opaque escalate_review_gate_v1() :: #escalate_review_gate_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, escalate_review_gate_v1()} | {error, term()}.
new(#{session_id := SessionId}) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #escalate_review_gate_v1{session_id = SessionId}};
new(_) ->
    {error, missing_required_fields}.

-spec validate(escalate_review_gate_v1()) -> ok | {error, term()}.
validate(#escalate_review_gate_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#escalate_review_gate_v1{}) ->
    ok.

-spec to_map(escalate_review_gate_v1()) -> map().
to_map(#escalate_review_gate_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"escalate_to_gate">>,
        <<"agent_role">> => <<"reviewer">>,
        <<"gate_name">> => <<"review_gate">>,
        <<"session_id">> => Cmd#escalate_review_gate_v1.session_id
    }.

-spec from_map(map()) -> {ok, escalate_review_gate_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ -> {ok, #escalate_review_gate_v1{session_id = SessionId}}
    end.

%% Accessors
get_session_id(#escalate_review_gate_v1{session_id = V}) -> V.

%% Internal
get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, undefined)
    end.
