%%% @doc vision_gate_rejected_v1 event.
%%% Emitted when the vision_gate is rejected for a visionary session.
-module(vision_gate_rejected_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_rejected_by/1, get_rejected_at/1]).

-record(vision_gate_rejected_v1, {
    session_id       :: binary(),
    agent_role       :: binary(),
    venture_id       :: binary(),
    division_id      :: binary() | undefined,
    gate_name        :: binary(),
    rejected_by      :: binary() | undefined,
    rejection_reason :: binary() | undefined,
    rejected_at      :: integer()
}).

-export_type([vision_gate_rejected_v1/0]).
-opaque vision_gate_rejected_v1() :: #vision_gate_rejected_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> vision_gate_rejected_v1().
new(#{session_id := SessionId} = Params) ->
    #vision_gate_rejected_v1{
        session_id = SessionId,
        agent_role = <<"visionary">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"vision_gate">>,
        rejected_by = maps:get(rejected_by, Params, undefined),
        rejection_reason = maps:get(rejection_reason, Params, undefined),
        rejected_at = erlang:system_time(millisecond)
    }.

-spec to_map(vision_gate_rejected_v1()) -> map().
to_map(#vision_gate_rejected_v1{} = E) ->
    #{
        <<"event_type">> => <<"vision_gate_rejected_v1">>,
        <<"session_id">> => E#vision_gate_rejected_v1.session_id,
        <<"agent_role">> => E#vision_gate_rejected_v1.agent_role,
        <<"venture_id">> => E#vision_gate_rejected_v1.venture_id,
        <<"division_id">> => E#vision_gate_rejected_v1.division_id,
        <<"gate_name">> => E#vision_gate_rejected_v1.gate_name,
        <<"rejected_by">> => E#vision_gate_rejected_v1.rejected_by,
        <<"rejection_reason">> => E#vision_gate_rejected_v1.rejection_reason,
        <<"rejected_at">> => E#vision_gate_rejected_v1.rejected_at
    }.

-spec from_map(map()) -> {ok, vision_gate_rejected_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #vision_gate_rejected_v1{
                session_id = SessionId,
                agent_role = <<"visionary">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"vision_gate">>,
                rejected_by = get_value(rejected_by, Map, undefined),
                rejection_reason = get_value(rejection_reason, Map, undefined),
                rejected_at = get_value(rejected_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#vision_gate_rejected_v1{session_id = V}) -> V.
get_rejected_by(#vision_gate_rejected_v1{rejected_by = V}) -> V.
get_rejected_at(#vision_gate_rejected_v1{rejected_at = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
