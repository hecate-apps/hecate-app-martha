%%% @doc archive_agent_session_v1 command.
%%% Archives an agent session (walking skeleton exit).
-module(archive_agent_session_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_session_id/1, get_archived_by/1]).

-record(archive_agent_session_v1, {
    session_id  :: binary(),
    archived_by :: binary() | undefined
}).

-export_type([archive_agent_session_v1/0]).
-opaque archive_agent_session_v1() :: #archive_agent_session_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, archive_agent_session_v1()} | {error, term()}.
new(#{session_id := SessionId} = Params) ->
    {ok, #archive_agent_session_v1{
        session_id = SessionId,
        archived_by = maps:get(archived_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(archive_agent_session_v1()) -> {ok, archive_agent_session_v1()} | {error, term()}.
validate(#archive_agent_session_v1{session_id = S}) when not is_binary(S); byte_size(S) =:= 0 ->
    {error, invalid_session_id};
validate(#archive_agent_session_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(archive_agent_session_v1()) -> map().
to_map(#archive_agent_session_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"archive_agent_session">>,
        <<"session_id">> => Cmd#archive_agent_session_v1.session_id,
        <<"archived_by">> => Cmd#archive_agent_session_v1.archived_by
    }.

-spec from_map(map()) -> {ok, archive_agent_session_v1()} | {error, term()}.
from_map(Map) ->
    SessionId = get_value(session_id, Map),
    case SessionId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #archive_agent_session_v1{
                session_id = SessionId,
                archived_by = get_value(archived_by, Map, undefined)
            }}
    end.

%% Accessors
-spec get_session_id(archive_agent_session_v1()) -> binary().
get_session_id(#archive_agent_session_v1{session_id = V}) -> V.

-spec get_archived_by(archive_agent_session_v1()) -> binary() | undefined.
get_archived_by(#archive_agent_session_v1{archived_by = V}) -> V.

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
