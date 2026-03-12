%%% @doc pass_design_gate_v1 command.
%%% Passes the design_gate for a stormer session.
-module(pass_design_gate_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_passed_by/1]).

-record(pass_design_gate_v1, {
    session_id :: binary(),
    passed_by  :: binary() | undefined
}).

-export_type([pass_design_gate_v1/0]).
-opaque pass_design_gate_v1() :: #pass_design_gate_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, pass_design_gate_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) when is_binary(SessionId), byte_size(SessionId) > 0 ->
    {ok, #pass_design_gate_v1{
        session_id = SessionId,
        passed_by = maps:get(passed_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(pass_design_gate_v1()) -> ok | {error, term()}.
validate(#pass_design_gate_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#pass_design_gate_v1{}) ->
    ok.

-spec to_map(pass_design_gate_v1()) -> map().
to_map(#pass_design_gate_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"pass_gate">>,
        <<"agent_role">> => <<"stormer">>,
        <<"gate_name">> => <<"design_gate">>,
        <<"session_id">> => Cmd#pass_design_gate_v1.session_id,
        <<"passed_by">> => Cmd#pass_design_gate_v1.passed_by
    }.

-spec from_map(map()) -> {ok, pass_design_gate_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #pass_design_gate_v1{
                session_id = SessionId,
                passed_by = get_value(passed_by, Map, undefined)
            }}
    end.

%% Accessors
get_session_id(#pass_design_gate_v1{session_id = V}) -> V.
get_passed_by(#pass_design_gate_v1{passed_by = V}) -> V.

%% Internal
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key, utf8), Map, Default)
    end.
