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
