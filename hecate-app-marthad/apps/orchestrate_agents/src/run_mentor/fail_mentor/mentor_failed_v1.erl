%%% @doc mentor_failed_v1 event.
%%% Emitted when a mentor agent session fails.
-module(mentor_failed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1, get_model/1,
         get_failed_at/1, get_error_reason/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(mentor_failed_v1, {
    session_id   :: binary(),
    agent_role   :: binary(),
    venture_id   :: binary(),
    division_id  :: binary() | undefined,
    tier         :: binary(),
    model        :: binary(),
    error_reason :: binary() | undefined,
    tokens_in    :: non_neg_integer(),
    tokens_out   :: non_neg_integer(),
    failed_at    :: integer()
}).

-export_type([mentor_failed_v1/0]).
-opaque mentor_failed_v1() :: #mentor_failed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> mentor_failed_v1().
new(#{session_id := SessionId} = Params) ->
    #mentor_failed_v1{
        session_id = SessionId,
        agent_role = <<"mentor">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        tier = maps:get(tier, Params, <<>>),
        model = maps:get(model, Params, <<>>),
        error_reason = maps:get(error_reason, Params, undefined),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0),
        failed_at = erlang:system_time(millisecond)
    }.

-spec to_map(mentor_failed_v1()) -> map().
to_map(#mentor_failed_v1{} = E) ->
    #{
        <<"event_type">> => <<"mentor_failed_v1">>,
        <<"session_id">> => E#mentor_failed_v1.session_id,
        <<"agent_role">> => E#mentor_failed_v1.agent_role,
        <<"venture_id">> => E#mentor_failed_v1.venture_id,
        <<"division_id">> => E#mentor_failed_v1.division_id,
        <<"tier">> => E#mentor_failed_v1.tier,
        <<"model">> => E#mentor_failed_v1.model,
        <<"error_reason">> => E#mentor_failed_v1.error_reason,
        <<"tokens_in">> => E#mentor_failed_v1.tokens_in,
        <<"tokens_out">> => E#mentor_failed_v1.tokens_out,
        <<"failed_at">> => E#mentor_failed_v1.failed_at
    }.

-spec from_map(map()) -> {ok, mentor_failed_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #mentor_failed_v1{
                session_id = SessionId,
                agent_role = <<"mentor">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                tier = get_value(tier, Map, <<>>),
                model = get_value(model, Map, <<>>),
                error_reason = get_value(error_reason, Map, undefined),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0),
                failed_at = get_value(failed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#mentor_failed_v1{session_id = V}) -> V.
get_venture_id(#mentor_failed_v1{venture_id = V}) -> V.
get_tier(#mentor_failed_v1{tier = V}) -> V.
get_model(#mentor_failed_v1{model = V}) -> V.
get_failed_at(#mentor_failed_v1{failed_at = V}) -> V.
get_error_reason(#mentor_failed_v1{error_reason = V}) -> V.
get_tokens_in(#mentor_failed_v1{tokens_in = V}) -> V.
get_tokens_out(#mentor_failed_v1{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
