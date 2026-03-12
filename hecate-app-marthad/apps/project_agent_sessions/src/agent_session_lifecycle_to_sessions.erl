%%% @doc Merged projection: agent session lifecycle events -> sessions ETS table.
%%%
%%% Tracks each agent session's current status, role, token usage, and
%%% timestamps. Upserts on every lifecycle event so the read model always
%%% reflects the latest state.
%%%
%%% Key: session_id
-module(agent_session_lifecycle_to_sessions).
-behaviour(evoq_projection).

-export([interested_in/0, init/1, project/4]).

-define(TABLE, project_agent_sessions_sessions).

interested_in() ->
    [<<"agent_initiated_v1">>,
     <<"agent_completed_v1">>,
     <<"agent_failed_v1">>,
     <<"agent_turn_completed_v1">>,
     <<"agent_input_received_v1">>,
     <<"gate_escalated_v1">>,
     <<"gate_passed_v1">>,
     <<"gate_rejected_v1">>,
     <<"agent_session_archived_v1">>].

init(_Config) ->
    {ok, RM} = evoq_read_model:new(evoq_read_model_ets, #{name => ?TABLE}),
    {ok, #{}, RM}.

project(#{data := Data} = Event, _Metadata, State, RM) ->
    EventType = get_event_type(Event),
    do_project(EventType, Data, State, RM).

%% --- agent_initiated_v1: session born ---

do_project(<<"agent_initiated_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    Session = #{
        session_id   => SessionId,
        agent_role   => gf(agent_role, Data),
        venture_id   => gf(venture_id, Data),
        division_id  => gf(division_id, Data),
        tier         => gf(tier, Data),
        model        => gf(model, Data),
        status       => <<"initiated">>,
        initiated_at => gf(initiated_at, Data),
        initiated_by => gf(initiated_by, Data),
        completed_at => undefined,
        failed_at    => undefined,
        archived_at  => undefined,
        tokens_in    => 0,
        tokens_out   => 0,
        turn_count   => 0,
        gate_name    => undefined,
        gate_verdict => undefined,
        error_reason => undefined
    },
    {ok, RM2} = evoq_read_model:put(SessionId, Session, RM),
    {ok, State, RM2};

%% --- agent_completed_v1: session finished successfully ---

do_project(<<"agent_completed_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{
            status       => <<"completed">>,
            completed_at => gf(completed_at, Data, 0),
            tokens_in    => maps:get(tokens_in, S, 0) + gf(tokens_in, Data, 0),
            tokens_out   => maps:get(tokens_out, S, 0) + gf(tokens_out, Data, 0)
        }
    end, State, RM);

%% --- agent_failed_v1: session failed ---

do_project(<<"agent_failed_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{
            status       => <<"failed">>,
            failed_at    => gf(failed_at, Data, 0),
            error_reason => gf(error_reason, Data)
        }
    end, State, RM);

%% --- agent_turn_completed_v1: LLM turn done, awaiting input ---

do_project(<<"agent_turn_completed_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{
            status     => <<"awaiting_input">>,
            turn_count => gf(turn_number, Data, maps:get(turn_count, S, 0) + 1),
            tokens_in  => maps:get(tokens_in, S, 0) + gf(tokens_in, Data, 0),
            tokens_out => maps:get(tokens_out, S, 0) + gf(tokens_out, Data, 0)
        }
    end, State, RM);

%% --- agent_input_received_v1: human responded, back to initiated ---

do_project(<<"agent_input_received_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{status => <<"initiated">>}
    end, State, RM);

%% --- gate_escalated_v1: awaiting human gate decision ---

do_project(<<"gate_escalated_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{
            status    => <<"gate_pending">>,
            gate_name => gf(gate_name, Data)
        }
    end, State, RM);

%% --- gate_passed_v1: gate approved ---

do_project(<<"gate_passed_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{
            status       => <<"gate_passed">>,
            gate_verdict => <<"passed">>
        }
    end, State, RM);

%% --- gate_rejected_v1: gate rejected ---

do_project(<<"gate_rejected_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{
            status       => <<"gate_rejected">>,
            gate_verdict => <<"rejected">>
        }
    end, State, RM);

%% --- agent_session_archived_v1: session archived ---

do_project(<<"agent_session_archived_v1">>, Data, State, RM) ->
    SessionId = gf(session_id, Data),
    update_session(SessionId, fun(S) ->
        S#{
            status      => <<"archived">>,
            archived_at => gf(archived_at, Data, 0)
        }
    end, State, RM);

%% --- Unknown ---

do_project(_Unknown, _Data, State, RM) ->
    {skip, State, RM}.

%%====================================================================
%% Internal
%%====================================================================

update_session(SessionId, UpdateFn, State, RM) ->
    case evoq_read_model:get(SessionId, RM) of
        {ok, Existing} ->
            Updated = UpdateFn(Existing),
            {ok, RM2} = evoq_read_model:put(SessionId, Updated, RM),
            {ok, State, RM2};
        {error, not_found} ->
            %% Event arrived before initiated — create minimal record
            Minimal = #{
                session_id   => SessionId,
                agent_role   => undefined,
                venture_id   => undefined,
                division_id  => undefined,
                tier         => undefined,
                model        => undefined,
                status       => <<"unknown">>,
                initiated_at => undefined,
                initiated_by => undefined,
                completed_at => undefined,
                failed_at    => undefined,
                archived_at  => undefined,
                tokens_in    => 0,
                tokens_out   => 0,
                turn_count   => 0,
                gate_name    => undefined,
                gate_verdict => undefined,
                error_reason => undefined
            },
            Updated = UpdateFn(Minimal),
            {ok, RM2} = evoq_read_model:put(SessionId, Updated, RM),
            {ok, State, RM2}
    end.

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
