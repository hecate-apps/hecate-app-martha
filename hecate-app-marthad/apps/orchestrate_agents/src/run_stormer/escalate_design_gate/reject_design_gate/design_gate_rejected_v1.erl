%%% @doc design_gate_rejected_v1 event.
%%% Emitted when the design_gate is rejected for a stormer session.
-module(design_gate_rejected_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_gate_name/1, get_rejected_by/1,
         get_rejected_at/1, get_rejection_reason/1]).

-record(design_gate_rejected_v1, {
    session_id       :: binary(),
    agent_role       :: binary(),
    venture_id       :: binary(),
    division_id      :: binary() | undefined,
    gate_name        :: binary(),
    rejected_by      :: binary() | undefined,
    rejection_reason :: binary() | undefined,
    rejected_at      :: integer()
}).

-export_type([design_gate_rejected_v1/0]).
-opaque design_gate_rejected_v1() :: #design_gate_rejected_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> design_gate_rejected_v1().
new(#{session_id := SessionId} = Params) ->
    #design_gate_rejected_v1{
        session_id = SessionId,
        agent_role = <<"stormer">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"design_gate">>,
        rejected_by = maps:get(rejected_by, Params, undefined),
        rejection_reason = maps:get(rejection_reason, Params, undefined),
        rejected_at = erlang:system_time(millisecond)
    }.

-spec to_map(design_gate_rejected_v1()) -> map().
to_map(#design_gate_rejected_v1{} = E) ->
    #{
        <<"event_type">> => <<"design_gate_rejected_v1">>,
        <<"session_id">> => E#design_gate_rejected_v1.session_id,
        <<"agent_role">> => E#design_gate_rejected_v1.agent_role,
        <<"venture_id">> => E#design_gate_rejected_v1.venture_id,
        <<"division_id">> => E#design_gate_rejected_v1.division_id,
        <<"gate_name">> => E#design_gate_rejected_v1.gate_name,
        <<"rejected_by">> => E#design_gate_rejected_v1.rejected_by,
        <<"rejection_reason">> => E#design_gate_rejected_v1.rejection_reason,
        <<"rejected_at">> => E#design_gate_rejected_v1.rejected_at
    }.

-spec from_map(map()) -> {ok, design_gate_rejected_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #design_gate_rejected_v1{
                session_id = SessionId,
                agent_role = <<"stormer">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"design_gate">>,
                rejected_by = get_value(rejected_by, Map, undefined),
                rejection_reason = get_value(rejection_reason, Map, undefined),
                rejected_at = get_value(rejected_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#design_gate_rejected_v1{session_id = V}) -> V.
get_gate_name(#design_gate_rejected_v1{gate_name = V}) -> V.
get_rejected_by(#design_gate_rejected_v1{rejected_by = V}) -> V.
get_rejected_at(#design_gate_rejected_v1{rejected_at = V}) -> V.
get_rejection_reason(#design_gate_rejected_v1{rejection_reason = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
