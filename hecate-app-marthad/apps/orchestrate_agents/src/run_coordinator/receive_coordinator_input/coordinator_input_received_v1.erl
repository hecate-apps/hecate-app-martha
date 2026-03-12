%%% @doc coordinator_input_received_v1 event.
%%% Emitted when a coordinator agent receives new input.
-module(coordinator_input_received_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_input_content/1, get_input_by/1, get_received_at/1]).

-record(coordinator_input_received_v1, {
    session_id    :: binary(),
    agent_role    :: binary(),
    venture_id    :: binary(),
    input_content :: binary() | undefined,
    input_by      :: binary() | undefined,
    received_at   :: integer()
}).

-export_type([coordinator_input_received_v1/0]).
-opaque coordinator_input_received_v1() :: #coordinator_input_received_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> coordinator_input_received_v1().
new(#{session_id := SessionId} = Params) ->
    #coordinator_input_received_v1{
        session_id = SessionId,
        agent_role = <<"coordinator">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        input_content = maps:get(input_content, Params, undefined),
        input_by = maps:get(input_by, Params, undefined),
        received_at = erlang:system_time(millisecond)
    }.

-spec to_map(coordinator_input_received_v1()) -> map().
to_map(#coordinator_input_received_v1{} = E) ->
    #{
        <<"event_type">> => <<"coordinator_input_received_v1">>,
        <<"session_id">> => E#coordinator_input_received_v1.session_id,
        <<"agent_role">> => E#coordinator_input_received_v1.agent_role,
        <<"venture_id">> => E#coordinator_input_received_v1.venture_id,
        <<"input_content">> => E#coordinator_input_received_v1.input_content,
        <<"input_by">> => E#coordinator_input_received_v1.input_by,
        <<"received_at">> => E#coordinator_input_received_v1.received_at
    }.

-spec from_map(map()) -> {ok, coordinator_input_received_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #coordinator_input_received_v1{
                session_id = SessionId,
                agent_role = <<"coordinator">>,
                venture_id = get_value(venture_id, Map, <<>>),
                input_content = get_value(input_content, Map, undefined),
                input_by = get_value(input_by, Map, undefined),
                received_at = get_value(received_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#coordinator_input_received_v1{session_id = V}) -> V.
get_input_content(#coordinator_input_received_v1{input_content = V}) -> V.
get_input_by(#coordinator_input_received_v1{input_by = V}) -> V.
get_received_at(#coordinator_input_received_v1{received_at = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
