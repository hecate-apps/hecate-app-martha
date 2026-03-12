%%% @doc agent_session_archived_v1 event.
%%% Emitted when an agent session is archived.
-module(agent_session_archived_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_session_id/1, get_agent_role/1, get_venture_id/1,
         get_division_id/1, get_archived_by/1, get_archived_at/1]).

-record(agent_session_archived_v1, {
    session_id  :: binary(),
    agent_role  :: binary(),
    venture_id  :: binary(),
    division_id :: binary() | undefined,
    archived_by :: binary() | undefined,
    archived_at :: integer()
}).

-export_type([agent_session_archived_v1/0]).
-opaque agent_session_archived_v1() :: #agent_session_archived_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> agent_session_archived_v1().
new(#{session_id := SessionId} = Params) ->
    #agent_session_archived_v1{
        session_id = SessionId,
        agent_role = maps:get(agent_role, Params, <<"unknown">>),
        venture_id = maps:get(venture_id, Params, <<>>),
        division_id = maps:get(division_id, Params, undefined),
        archived_by = maps:get(archived_by, Params, undefined),
        archived_at = erlang:system_time(millisecond)
    }.

-spec to_map(agent_session_archived_v1()) -> map().
to_map(#agent_session_archived_v1{} = E) ->
    #{
        <<"event_type">> => <<"agent_session_archived_v1">>,
        <<"session_id">> => E#agent_session_archived_v1.session_id,
        <<"agent_role">> => E#agent_session_archived_v1.agent_role,
        <<"venture_id">> => E#agent_session_archived_v1.venture_id,
        <<"division_id">> => E#agent_session_archived_v1.division_id,
        <<"archived_by">> => E#agent_session_archived_v1.archived_by,
        <<"archived_at">> => E#agent_session_archived_v1.archived_at
    }.

-spec from_map(map()) -> {ok, agent_session_archived_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #agent_session_archived_v1{
                session_id = SessionId,
                agent_role = get_value(agent_role, Map, <<"unknown">>),
                venture_id = get_value(venture_id, Map, <<>>),
                division_id = get_value(division_id, Map, undefined),
                archived_by = get_value(archived_by, Map, undefined),
                archived_at = get_value(archived_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_session_id(agent_session_archived_v1()) -> binary().
get_session_id(#agent_session_archived_v1{session_id = V}) -> V.

-spec get_agent_role(agent_session_archived_v1()) -> binary().
get_agent_role(#agent_session_archived_v1{agent_role = V}) -> V.

-spec get_venture_id(agent_session_archived_v1()) -> binary().
get_venture_id(#agent_session_archived_v1{venture_id = V}) -> V.

-spec get_division_id(agent_session_archived_v1()) -> binary() | undefined.
get_division_id(#agent_session_archived_v1{division_id = V}) -> V.

-spec get_archived_by(agent_session_archived_v1()) -> binary() | undefined.
get_archived_by(#agent_session_archived_v1{archived_by = V}) -> V.

-spec get_archived_at(agent_session_archived_v1()) -> integer().
get_archived_at(#agent_session_archived_v1{archived_at = V}) -> V.

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
