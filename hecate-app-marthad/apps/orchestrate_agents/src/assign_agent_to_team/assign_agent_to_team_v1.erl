%%% @doc assign_agent_to_team_v1 command.
%%% Assigns an agent session to a division team.
-module(assign_agent_to_team_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_agent_role/1, get_session_id/1]).

-record(assign_agent_to_team_v1, {
    division_id :: binary(),
    agent_role  :: binary(),
    session_id  :: binary()
}).

-export_type([assign_agent_to_team_v1/0]).
-opaque assign_agent_to_team_v1() :: #assign_agent_to_team_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, assign_agent_to_team_v1()} | {error, term()}.
new(#{division_id := DivId, agent_role := Role, session_id := SessId}) ->
    {ok, #assign_agent_to_team_v1{
        division_id = DivId,
        agent_role = Role,
        session_id = SessId
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(assign_agent_to_team_v1()) -> {ok, assign_agent_to_team_v1()} | {error, term()}.
validate(#assign_agent_to_team_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#assign_agent_to_team_v1{agent_role = R}) when not is_binary(R); byte_size(R) =:= 0 ->
    {error, invalid_agent_role};
validate(#assign_agent_to_team_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#assign_agent_to_team_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(assign_agent_to_team_v1()) -> map().
to_map(#assign_agent_to_team_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"assign_agent_to_team">>,
        <<"division_id">> => Cmd#assign_agent_to_team_v1.division_id,
        <<"agent_role">> => Cmd#assign_agent_to_team_v1.agent_role,
        <<"session_id">> => Cmd#assign_agent_to_team_v1.session_id
    }.

-spec from_map(map()) -> {ok, assign_agent_to_team_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    Role = get_value(agent_role, Map),
    SessId = get_value(session_id, Map),
    case {DivId, Role, SessId} of
        {undefined, _, _} -> {error, missing_required_fields};
        {_, undefined, _} -> {error, missing_required_fields};
        {_, _, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #assign_agent_to_team_v1{
                division_id = DivId,
                agent_role = Role,
                session_id = SessId
            }}
    end.

%% Accessors
-spec get_division_id(assign_agent_to_team_v1()) -> binary().
get_division_id(#assign_agent_to_team_v1{division_id = V}) -> V.

-spec get_agent_role(assign_agent_to_team_v1()) -> binary().
get_agent_role(#assign_agent_to_team_v1{agent_role = V}) -> V.

-spec get_session_id(assign_agent_to_team_v1()) -> binary().
get_session_id(#assign_agent_to_team_v1{session_id = V}) -> V.

%% Internal
get_value(Key, Map) ->
    get_value(Key, Map, undefined).

get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error ->
            case maps:find(BinKey, Map) of
                {ok, V} -> V;
                error -> Default
            end
    end.
