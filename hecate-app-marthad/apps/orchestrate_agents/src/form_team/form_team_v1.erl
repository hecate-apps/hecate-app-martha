%%% @doc form_team_v1 command.
%%% Forms a division team with planned agent roles.
-module(form_team_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_venture_id/1, get_planned_roles/1, get_formed_by/1]).

-record(form_team_v1, {
    division_id   :: binary(),
    venture_id    :: binary(),
    planned_roles :: [binary()],
    formed_by     :: binary() | undefined
}).

-export_type([form_team_v1/0]).
-opaque form_team_v1() :: #form_team_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, form_team_v1()} | {error, term()}.
new(#{division_id := DivId, venture_id := VentureId} = Params) ->
    {ok, #form_team_v1{
        division_id = DivId,
        venture_id = VentureId,
        planned_roles = maps:get(planned_roles, Params, []),
        formed_by = maps:get(formed_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(form_team_v1()) -> {ok, form_team_v1()} | {error, term()}.
validate(#form_team_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#form_team_v1{venture_id = V}) when not is_binary(V); byte_size(V) =:= 0 ->
    {error, invalid_venture_id};
validate(#form_team_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(form_team_v1()) -> map().
to_map(#form_team_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"form_team">>,
        <<"division_id">> => Cmd#form_team_v1.division_id,
        <<"venture_id">> => Cmd#form_team_v1.venture_id,
        <<"planned_roles">> => Cmd#form_team_v1.planned_roles,
        <<"formed_by">> => Cmd#form_team_v1.formed_by
    }.

-spec from_map(map()) -> {ok, form_team_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    VentureId = get_value(venture_id, Map),
    case {DivId, VentureId} of
        {undefined, _} -> {error, missing_required_fields};
        {_, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #form_team_v1{
                division_id = DivId,
                venture_id = VentureId,
                planned_roles = get_value(planned_roles, Map, []),
                formed_by = get_value(formed_by, Map, undefined)
            }}
    end.

%% Accessors
-spec get_division_id(form_team_v1()) -> binary().
get_division_id(#form_team_v1{division_id = V}) -> V.

-spec get_venture_id(form_team_v1()) -> binary().
get_venture_id(#form_team_v1{venture_id = V}) -> V.

-spec get_planned_roles(form_team_v1()) -> [binary()].
get_planned_roles(#form_team_v1{planned_roles = V}) -> V.

-spec get_formed_by(form_team_v1()) -> binary() | undefined.
get_formed_by(#form_team_v1{formed_by = V}) -> V.

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
