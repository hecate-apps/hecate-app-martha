%%% @doc initiate_mentor_v1 command.
%%% Initiates a mentor agent session.
-module(initiate_mentor_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_venture_id/1, get_tier/1,
         get_initiated_by/1, get_input_context/1]).

-record(initiate_mentor_v1, {
    session_id    :: binary(),
    venture_id    :: binary(),
    tier          :: binary() | undefined,
    initiated_by  :: binary() | undefined,
    input_context :: binary() | undefined
}).

-export_type([initiate_mentor_v1/0]).
-opaque initiate_mentor_v1() :: #initiate_mentor_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, initiate_mentor_v1()} | {error, term()}.
new(#{venture_id := VentureId} = Params) when is_binary(VentureId), byte_size(VentureId) > 0 ->
    SessionId = case maps:get(session_id, Params, undefined) of
        undefined -> generate_session_id();
        Sid -> Sid
    end,
    {ok, #initiate_mentor_v1{
        session_id = SessionId,
        venture_id = VentureId,
        tier = maps:get(tier, Params, <<"T1">>),
        initiated_by = maps:get(initiated_by, Params, undefined),
        input_context = maps:get(input_context, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(initiate_mentor_v1()) -> ok | {error, term()}.
validate(#initiate_mentor_v1{venture_id = V}) when not is_binary(V); byte_size(V) =:= 0 ->
    {error, invalid_venture_id};
validate(#initiate_mentor_v1{}) ->
    ok.

-spec to_map(initiate_mentor_v1()) -> map().
to_map(#initiate_mentor_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"initiate_agent">>,
        <<"agent_role">> => <<"mentor">>,
        <<"session_id">> => Cmd#initiate_mentor_v1.session_id,
        <<"venture_id">> => Cmd#initiate_mentor_v1.venture_id,
        <<"tier">> => Cmd#initiate_mentor_v1.tier,
        <<"initiated_by">> => Cmd#initiate_mentor_v1.initiated_by,
        <<"input_context">> => Cmd#initiate_mentor_v1.input_context
    }.

-spec from_map(map()) -> {ok, initiate_mentor_v1()} | {error, term()}.
from_map(Map) ->
    VentureId = get_value(venture_id, Map),
    case VentureId of
        undefined -> {error, missing_required_fields};
        _ ->
            SessionId = case get_value(session_id, Map) of
                undefined -> generate_session_id();
                Sid -> Sid
            end,
            {ok, #initiate_mentor_v1{
                session_id = SessionId,
                venture_id = VentureId,
                tier = get_value(tier, Map, <<"T1">>),
                initiated_by = get_value(initiated_by, Map, undefined),
                input_context = get_value(input_context, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#initiate_mentor_v1{session_id = V}) -> V.
get_venture_id(#initiate_mentor_v1{venture_id = V}) -> V.
get_tier(#initiate_mentor_v1{tier = V}) -> V.
get_initiated_by(#initiate_mentor_v1{initiated_by = V}) -> V.
get_input_context(#initiate_mentor_v1{input_context = V}) -> V.

%% Internal
generate_session_id() ->
    Rand = integer_to_binary(erlang:unique_integer([positive, monotonic])),
    <<"mnt-", Rand/binary>>.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
