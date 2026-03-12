%%% @doc stormer_completed_v1 event.
%%% Emitted when a stormer agent session completes successfully.
-module(stormer_completed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1, get_model/1,
         get_completed_at/1, get_notation_output/1, get_parsed_terms/1,
         get_tokens_in/1, get_tokens_out/1]).

-record(stormer_completed_v1, {
    session_id      :: binary(),
    agent_role      :: binary(),
    venture_id      :: binary(),
    division_id     :: binary() | undefined,
    tier            :: binary(),
    model           :: binary(),
    notation_output :: binary() | undefined,
    parsed_terms    :: list(),
    tokens_in       :: non_neg_integer(),
    tokens_out      :: non_neg_integer(),
    completed_at    :: integer()
}).

-export_type([stormer_completed_v1/0]).
-opaque stormer_completed_v1() :: #stormer_completed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> stormer_completed_v1().
new(#{session_id := SessionId} = Params) ->
    #stormer_completed_v1{
        session_id = SessionId,
        agent_role = <<"stormer">>,
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        tier = maps:get(tier, Params, <<>>),
        model = maps:get(model, Params, <<>>),
        notation_output = maps:get(notation_output, Params, undefined),
        parsed_terms = maps:get(parsed_terms, Params, []),
        tokens_in = maps:get(tokens_in, Params, 0),
        tokens_out = maps:get(tokens_out, Params, 0),
        completed_at = erlang:system_time(millisecond)
    }.

-spec to_map(stormer_completed_v1()) -> map().
to_map(#stormer_completed_v1{} = E) ->
    #{
        <<"event_type">> => <<"stormer_completed_v1">>,
        <<"session_id">> => E#stormer_completed_v1.session_id,
        <<"agent_role">> => E#stormer_completed_v1.agent_role,
        <<"venture_id">> => E#stormer_completed_v1.venture_id,
        <<"division_id">> => E#stormer_completed_v1.division_id,
        <<"tier">> => E#stormer_completed_v1.tier,
        <<"model">> => E#stormer_completed_v1.model,
        <<"notation_output">> => E#stormer_completed_v1.notation_output,
        <<"parsed_terms">> => E#stormer_completed_v1.parsed_terms,
        <<"tokens_in">> => E#stormer_completed_v1.tokens_in,
        <<"tokens_out">> => E#stormer_completed_v1.tokens_out,
        <<"completed_at">> => E#stormer_completed_v1.completed_at
    }.

-spec from_map(map()) -> {ok, stormer_completed_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #stormer_completed_v1{
                session_id = SessionId,
                agent_role = <<"stormer">>,
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                tier = get_value(tier, Map, <<>>),
                model = get_value(model, Map, <<>>),
                notation_output = get_value(notation_output, Map, undefined),
                parsed_terms = get_value(parsed_terms, Map, []),
                tokens_in = get_value(tokens_in, Map, 0),
                tokens_out = get_value(tokens_out, Map, 0),
                completed_at = get_value(completed_at, Map, 0)
            }}
    end.

%% Accessors
get_session_id(#stormer_completed_v1{session_id = V}) -> V.
get_venture_id(#stormer_completed_v1{venture_id = V}) -> V.
get_tier(#stormer_completed_v1{tier = V}) -> V.
get_model(#stormer_completed_v1{model = V}) -> V.
get_completed_at(#stormer_completed_v1{completed_at = V}) -> V.
get_notation_output(#stormer_completed_v1{notation_output = V}) -> V.
get_parsed_terms(#stormer_completed_v1{parsed_terms = V}) -> V.
get_tokens_in(#stormer_completed_v1{tokens_in = V}) -> V.
get_tokens_out(#stormer_completed_v1{tokens_out = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
