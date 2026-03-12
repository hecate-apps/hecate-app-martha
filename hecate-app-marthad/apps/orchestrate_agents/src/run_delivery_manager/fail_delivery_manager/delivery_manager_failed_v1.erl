%%% @doc delivery_manager_failed_v1 event.
%%% Emitted when a delivery_manager agent session fails.
-module(delivery_manager_failed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1, get_model/1,
         get_failed_at/1, get_error_reason/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(delivery_manager_failed_v1, {
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

-export_type([delivery_manager_failed_v1/0]).
-opaque delivery_manager_failed_v1() :: #delivery_manager_failed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> delivery_manager_failed_v1().
new(#{session_id := SessionId} = Params) ->
    #delivery_manager_failed_v1{
        session_id = SessionId,
        agent_role = <<"delivery_manager">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        tier = maps:get(tier, Params, <<>>),
        model = maps:get(model, Params, <<>>),
        error_reason = maps:get(error_reason, Params, undefined),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0),
        failed_at = erlang:system_time(millisecond)
    }.

-spec to_map(delivery_manager_failed_v1()) -> map().
to_map(#delivery_manager_failed_v1{} = E) ->
    #{
        <<"event_type">> => <<"delivery_manager_failed_v1">>,
        <<"session_id">> => E#delivery_manager_failed_v1.session_id,
        <<"agent_role">> => E#delivery_manager_failed_v1.agent_role,
        <<"venture_id">> => E#delivery_manager_failed_v1.venture_id,
        <<"division_id">> => E#delivery_manager_failed_v1.division_id,
        <<"tier">> => E#delivery_manager_failed_v1.tier,
        <<"model">> => E#delivery_manager_failed_v1.model,
        <<"error_reason">> => E#delivery_manager_failed_v1.error_reason,
        <<"tokens_in">> => E#delivery_manager_failed_v1.tokens_in,
        <<"tokens_out">> => E#delivery_manager_failed_v1.tokens_out,
        <<"failed_at">> => E#delivery_manager_failed_v1.failed_at
    }.

-spec from_map(map()) -> {ok, delivery_manager_failed_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #delivery_manager_failed_v1{
                session_id = SessionId,
                agent_role = <<"delivery_manager">>,
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
get_session_id(#delivery_manager_failed_v1{session_id = V}) -> V.
get_venture_id(#delivery_manager_failed_v1{venture_id = V}) -> V.
get_tier(#delivery_manager_failed_v1{tier = V}) -> V.
get_model(#delivery_manager_failed_v1{model = V}) -> V.
get_failed_at(#delivery_manager_failed_v1{failed_at = V}) -> V.
get_error_reason(#delivery_manager_failed_v1{error_reason = V}) -> V.
get_tokens_in(#delivery_manager_failed_v1{tokens_in = V}) -> V.
get_tokens_out(#delivery_manager_failed_v1{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
