%%% @doc vision_gate_passed_v1 event.
%%% Emitted when the vision_gate is passed for a visionary session.
-module(vision_gate_passed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_passed_by/1, get_passed_at/1]).

-record(vision_gate_passed_v1, {
    session_id      :: binary(),
    agent_role      :: binary(),
    venture_id      :: binary(),
    division_id     :: binary() | undefined,
    gate_name       :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    passed_by       :: binary() | undefined,
    passed_at       :: integer()
}).

-export_type([vision_gate_passed_v1/0]).
-opaque vision_gate_passed_v1() :: #vision_gate_passed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> vision_gate_passed_v1().
new(#{session_id := SessionId} = Params) ->
    #vision_gate_passed_v1{
        session_id = SessionId,
        agent_role = <<"visionary">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        gate_name = <<"vision_gate">>,
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        passed_by = maps:get(passed_by, Params, undefined),
        passed_at = erlang:system_time(millisecond)
    }.

-spec to_map(vision_gate_passed_v1()) -> map().
to_map(#vision_gate_passed_v1{} = E) ->
    #{
        <<"event_type">> => <<"vision_gate_passed_v1">>,
        <<"session_id">> => E#vision_gate_passed_v1.session_id,
        <<"agent_role">> => E#vision_gate_passed_v1.agent_role,
        <<"venture_id">> => E#vision_gate_passed_v1.venture_id,
        <<"division_id">> => E#vision_gate_passed_v1.division_id,
        <<"gate_name">> => E#vision_gate_passed_v1.gate_name,
        <<"notation_output">> => E#vision_gate_passed_v1.notation_output,
        <<"parsed_terms">> => E#vision_gate_passed_v1.parsed_terms,
        <<"passed_by">> => E#vision_gate_passed_v1.passed_by,
        <<"passed_at">> => E#vision_gate_passed_v1.passed_at
    }.

-spec from_map(map()) -> {ok, vision_gate_passed_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #vision_gate_passed_v1{
                session_id = SessionId,
                agent_role = <<"visionary">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                gate_name = <<"vision_gate">>,
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                passed_by = get_value(passed_by, Map, undefined),
                passed_at = get_value(passed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#vision_gate_passed_v1{session_id = V}) -> V.
get_passed_by(#vision_gate_passed_v1{passed_by = V}) -> V.
get_passed_at(#vision_gate_passed_v1{passed_at = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
