%%% @doc team_formed_v1 event.
%%% Emitted when a division team is formed.
-module(team_formed_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_venture_id/1, get_planned_roles/1,
         get_formed_by/1, get_formed_at/1]).

-record(team_formed_v1, {
    division_id   :: binary(),
    venture_id    :: binary(),
    planned_roles :: [binary()],
    formed_by     :: binary() | undefined,
    formed_at     :: integer()
}).

-export_type([team_formed_v1/0]).
-opaque team_formed_v1() :: #team_formed_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> team_formed_v1().
new(#{division_id := DivId, venture_id := VentureId} = Params) ->
    #team_formed_v1{
        division_id = DivId,
        venture_id = VentureId,
        planned_roles = maps:get(planned_roles, Params, []),
        formed_by = maps:get(formed_by, Params, undefined),
        formed_at = erlang:system_time(millisecond)
    }.

-spec to_map(team_formed_v1()) -> map().
to_map(#team_formed_v1{} = E) ->
    #{
        <<"event_type">> => <<"team_formed_v1">>,
        <<"division_id">> => E#team_formed_v1.division_id,
        <<"venture_id">> => E#team_formed_v1.venture_id,
        <<"planned_roles">> => E#team_formed_v1.planned_roles,
        <<"formed_by">> => E#team_formed_v1.formed_by,
        <<"formed_at">> => E#team_formed_v1.formed_at
    }.

-spec from_map(map()) -> {ok, team_formed_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    VentureId = get_value(venture_id, Map),
    case {DivId, VentureId} of
        {undefined, _} -> {error, invalid_event};
        {_, undefined} -> {error, invalid_event};
        _ ->
            {ok, #team_formed_v1{
                division_id = DivId,
                venture_id = VentureId,
                planned_roles = get_value(planned_roles, Map, []),
                formed_by = get_value(formed_by, Map, undefined),
                formed_at = get_value(formed_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(team_formed_v1()) -> binary().
get_division_id(#team_formed_v1{division_id = V}) -> V.

-spec get_venture_id(team_formed_v1()) -> binary().
get_venture_id(#team_formed_v1{venture_id = V}) -> V.

-spec get_planned_roles(team_formed_v1()) -> [binary()].
get_planned_roles(#team_formed_v1{planned_roles = V}) -> V.

-spec get_formed_by(team_formed_v1()) -> binary() | undefined.
get_formed_by(#team_formed_v1{formed_by = V}) -> V.

-spec get_formed_at(team_formed_v1()) -> integer().
get_formed_at(#team_formed_v1{formed_at = V}) -> V.

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
