%%% @doc activate_team_v1 command.
%%% Activates a formed division team.
-module(activate_team_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_activated_by/1]).

-record(activate_team_v1, {
    division_id  :: binary(),
    activated_by :: binary() | undefined
}).

-export_type([activate_team_v1/0]).
-opaque activate_team_v1() :: #activate_team_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, activate_team_v1()} | {error, term()}.
new(#{division_id := DivId} = Params) ->
    {ok, #activate_team_v1{
        division_id = DivId,
        activated_by = maps:get(activated_by, Params, undefined)
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(activate_team_v1()) -> {ok, activate_team_v1()} | {error, term()}.
validate(#activate_team_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#activate_team_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(activate_team_v1()) -> map().
to_map(#activate_team_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"activate_team">>,
        <<"division_id">> => Cmd#activate_team_v1.division_id,
        <<"activated_by">> => Cmd#activate_team_v1.activated_by
    }.

-spec from_map(map()) -> {ok, activate_team_v1()} | {error, term()}.
from_map(Map) ->
    DivId = get_value(division_id, Map),
    case DivId of
        undefined -> {error, missing_required_fields};
        _ ->
            {ok, #activate_team_v1{
                division_id = DivId,
                activated_by = get_value(activated_by, Map, undefined)
            }}
    end.

%% Accessors
-spec get_division_id(activate_team_v1()) -> binary().
get_division_id(#activate_team_v1{division_id = V}) -> V.

-spec get_activated_by(activate_team_v1()) -> binary() | undefined.
get_activated_by(#activate_team_v1{activated_by = V}) -> V.

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
