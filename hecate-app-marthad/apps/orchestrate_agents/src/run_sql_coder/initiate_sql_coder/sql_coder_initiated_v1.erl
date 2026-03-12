%%% @doc sql_coder_initiated_v1 event.
%%% Emitted when a sql_coder agent session is initiated.
-module(sql_coder_initiated_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1, get_model/1,
         get_initiated_at/1, get_initiated_by/1, get_input_context/1]).

-record(sql_coder_initiated_v1, {
    session_id    :: binary(),
    agent_role    :: binary(),
    venture_id    :: binary(),
    division_id   :: binary() | undefined,
    tier          :: binary(),
    model         :: binary(),
    input_context :: binary() | undefined,
    initiated_at  :: integer(),
    initiated_by  :: binary() | undefined
}).

-export_type([sql_coder_initiated_v1/0]).
-opaque sql_coder_initiated_v1() :: #sql_coder_initiated_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> sql_coder_initiated_v1().
new(#{session_id := SessionId} = Params) ->
    #sql_coder_initiated_v1{
        session_id = SessionId,
        agent_role = <<"sql_coder">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        tier = maps:get(tier, Params, <<"T1">>),
        model = maps:get(model, Params, <<>>),
        input_context = maps:get(input_context, Params, undefined),
        initiated_at = erlang:system_time(millisecond),
        initiated_by = maps:get(initiated_by, Params, undefined)
    }.

-spec to_map(sql_coder_initiated_v1()) -> map().
to_map(#sql_coder_initiated_v1{} = E) ->
    #{
        <<"event_type">> => <<"sql_coder_initiated_v1">>,
        <<"session_id">> => E#sql_coder_initiated_v1.session_id,
        <<"agent_role">> => E#sql_coder_initiated_v1.agent_role,
        <<"venture_id">> => E#sql_coder_initiated_v1.venture_id,
        <<"division_id">> => E#sql_coder_initiated_v1.division_id,
        <<"tier">> => E#sql_coder_initiated_v1.tier,
        <<"model">> => E#sql_coder_initiated_v1.model,
        <<"input_context">> => E#sql_coder_initiated_v1.input_context,
        <<"initiated_at">> => E#sql_coder_initiated_v1.initiated_at,
        <<"initiated_by">> => E#sql_coder_initiated_v1.initiated_by
    }.

-spec from_map(map()) -> {ok, sql_coder_initiated_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #sql_coder_initiated_v1{
                session_id = SessionId,
                agent_role = <<"sql_coder">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                tier = get_value(tier, Map, <<"T1">>),
                model = get_value(model, Map, <<>>),
                input_context = get_value(input_context, Map, undefined),
                initiated_at = get_value(initiated_at, Map, 0),
                initiated_by = get_value(initiated_by, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#sql_coder_initiated_v1{session_id = V}) -> V.
get_venture_id(#sql_coder_initiated_v1{venture_id = V}) -> V.
get_tier(#sql_coder_initiated_v1{tier = V}) -> V.
get_model(#sql_coder_initiated_v1{model = V}) -> V.
get_initiated_at(#sql_coder_initiated_v1{initiated_at = V}) -> V.
get_initiated_by(#sql_coder_initiated_v1{initiated_by = V}) -> V.
get_input_context(#sql_coder_initiated_v1{input_context = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
