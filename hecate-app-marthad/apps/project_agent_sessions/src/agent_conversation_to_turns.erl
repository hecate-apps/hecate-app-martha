%%% @doc Merged projection: agent conversation events -> turns ETS table.
%%%
%%% Captures every turn in an agent conversation as a separate record.
%%% Both agent output (turn_completed) and human input (input_received)
%%% become rows, enabling conversation replay, per-turn token analysis,
%%% and response latency measurement.
%%%
%%% Key: {session_id, turn_number, direction}
%%% Direction: <<"agent">> | <<"human">>
-module(agent_conversation_to_turns).
-behaviour(evoq_projection).

-export([interested_in/0, init/1, project/4]).

-define(TABLE, project_agent_sessions_turns).

interested_in() ->
    [<<"agent_turn_completed_v1">>,
     <<"agent_input_received_v1">>].

init(_Config) ->
    {ok, RM} = evoq_read_model:new(evoq_read_model_ets, #{name => ?TABLE}),
    {ok, #{}, RM}.

project(#{data := Data} = Event, _Metadata, State, RM) ->
    EventType = get_event_type(Event),
    do_project(EventType, Data, State, RM).

%% --- agent_turn_completed_v1: agent spoke ---

do_project(<<"agent_turn_completed_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    TurnNumber = gf(turn_number, Data, 1),
    Key = {SessionId, TurnNumber, <<"agent">>},
    Turn = #{
        session_id  => SessionId,
        agent_role  => gf(agent_role, Data),
        venture_id  => gf(venture_id, Data),
        turn_number => TurnNumber,
        direction   => <<"agent">>,
        content     => gf(agent_output, Data, <<>>),
        tokens_in   => gf(tokens_in, Data, 0),
        tokens_out  => gf(tokens_out, Data, 0),
        timestamp   => gf(completed_at, Data, 0)
    },
    {ok, RM2} = evoq_read_model:put(Key, Turn, RM),
    {ok, State, RM2};

%% --- agent_input_received_v1: human spoke ---

do_project(<<"agent_input_received_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    TurnNumber = gf(turn_number, Data, 1),
    Key = {SessionId, TurnNumber, <<"human">>},
    Turn = #{
        session_id    => SessionId,
        agent_role    => gf(agent_role, Data),
        venture_id    => gf(venture_id, Data),
        turn_number   => TurnNumber,
        direction     => <<"human">>,
        content       => gf(input_content, Data, <<>>),
        input_by      => gf(input_by, Data),
        tokens_in     => 0,
        tokens_out    => 0,
        timestamp     => gf(received_at, Data, 0)
    },
    {ok, RM2} = evoq_read_model:put(Key, Turn, RM),
    {ok, State, RM2};

%% --- Unknown ---

do_project(_Unknown, _Data, State, RM) ->
    {skip, State, RM}.

%%====================================================================
%% Internal
%%====================================================================

get_event_type(#{event_type := T}) when is_binary(T) -> T;
get_event_type(#{<<"event_type">> := T}) when is_binary(T) -> T;
get_event_type(_) -> undefined.

gf(Key, Data) when is_atom(Key) ->
    case maps:find(Key, Data) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Data, undefined)
    end.

gf(Key, Data, Default) when is_atom(Key) ->
    case maps:find(Key, Data) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Data, Default)
    end.
