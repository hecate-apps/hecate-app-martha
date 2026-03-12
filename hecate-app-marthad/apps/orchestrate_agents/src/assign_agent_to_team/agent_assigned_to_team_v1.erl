%%% @doc agent_assigned_to_team_v1 event.
%%% Emitted when an agent is assigned to a division team.
-module(agent_assigned_to_team_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_agent_role/1, get_session_id/1, get_assigned_at/1]).

-record(agent_assigned_to_team_v1, {
    division_id :: binary(),
    agent_role  :: binary(),
    session_id  :: binary(),
    assigned_at :: integer()
}).

-export_type([agent_assigned_to_team_v1/0]).
-opaque agent_assigned_to_team_v1() :: #agent_assigned_to_team_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> agent_assigned_to_team_v1().
new(#{division_id := DivId, agent_role := Role, session_id := SessId}) ->
    #agent_assigned_to_team_v1{
        division_id = DivId,
        agent_role = Role,
        session_id = SessId,
        assigned_at = erlang:system_time(millisecond)
    }.

-spec to_map(agent_assigned_to_team_v1()) -> map().
to_map(#agent_assigned_to_team_v1{} = E) ->
    #{
        <<"event_type">> => <<"agent_assigned_to_team_v1">>,
        <<"division_id">> => E#agent_assigned_to_team_v1.division_id,
        <<"agent_role">> => E#agent_assigned_to_team_v1.agent_role,
        <<"session_id">> => E#agent_assigned_to_team_v1.session_id,
        <<"assigned_at">> => E#agent_assigned_to_team_v1.assigned_at
    }.

-spec from_map(map()) -> {ok, agent_assigned_to_team_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    Role = get_value(agent_role, Map),
    SessId = get_value(session_id, Map),
    case {DivId, Role, SessId} of
        {undefined, _, _} -> {error, invalid_event};
        {_, undefined, _} -> {error, invalid_event};
        {_, _, undefined} -> {error, invalid_event};
        _ ->
            {ok, #agent_assigned_to_team_v1{
                division_id = DivId,
                agent_role = Role,
                session_id = SessId,
                assigned_at = get_value(assigned_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(agent_assigned_to_team_v1()) -> binary().
get_division_id(#agent_assigned_to_team_v1{division_id = V}) -> V.

-spec get_agent_role(agent_assigned_to_team_v1()) -> binary().
get_agent_role(#agent_assigned_to_team_v1{agent_role = V}) -> V.

-spec get_session_id(agent_assigned_to_team_v1()) -> binary().
get_session_id(#agent_assigned_to_team_v1{session_id = V}) -> V.

-spec get_assigned_at(agent_assigned_to_team_v1()) -> integer().
get_assigned_at(#agent_assigned_to_team_v1{assigned_at = V}) -> V.

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
