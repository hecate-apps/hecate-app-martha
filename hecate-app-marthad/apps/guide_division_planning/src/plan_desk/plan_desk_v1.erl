%%% @doc plan_desk_v1 command
%%% Plans a desk within a division planning dossier.
-module(plan_desk_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_desk_name/1, get_department/1,
         get_description/1, get_commands/1]).

-record(plan_desk_v1, {
    division_id :: binary(),
    desk_name   :: binary(),
    department  :: binary() | undefined,
    description :: binary() | undefined,
    commands    :: list()
}).

-export_type([plan_desk_v1/0]).
-opaque plan_desk_v1() :: #plan_desk_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, plan_desk_v1()} | {error, term()}.
new(#{division_id := DivisionId, desk_name := DeskName} = Params) ->
    {ok, #plan_desk_v1{
        division_id = DivisionId,
        desk_name = DeskName,
        department = maps:get(department, Params, undefined),
        description = maps:get(description, Params, undefined),
        commands = maps:get(commands, Params, [])
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(plan_desk_v1()) -> {ok, plan_desk_v1()} | {error, term()}.
validate(#plan_desk_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#plan_desk_v1{desk_name = N}) when not is_binary(N); byte_size(N) =:= 0 ->
    {error, invalid_desk_name};
validate(#plan_desk_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(plan_desk_v1()) -> map().
to_map(#plan_desk_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"plan_desk">>,
        <<"division_id">> => Cmd#plan_desk_v1.division_id,
        <<"desk_name">> => Cmd#plan_desk_v1.desk_name,
        <<"department">> => Cmd#plan_desk_v1.department,
        <<"description">> => Cmd#plan_desk_v1.description,
        <<"commands">> => Cmd#plan_desk_v1.commands
    }.

-spec from_map(map()) -> {ok, plan_desk_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    DeskName = get_value(desk_name, Map),
    case {DivisionId, DeskName} of
        {undefined, _} -> {error, missing_required_fields};
        {_, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #plan_desk_v1{
                division_id = DivisionId,
                desk_name = DeskName,
                department = get_value(department, Map, undefined),
                description = get_value(description, Map, undefined),
                commands = get_value(commands, Map, [])
            }}
    end.

%% Accessors
-spec get_division_id(plan_desk_v1()) -> binary().
get_division_id(#plan_desk_v1{division_id = V}) -> V.

-spec get_desk_name(plan_desk_v1()) -> binary().
get_desk_name(#plan_desk_v1{desk_name = V}) -> V.

-spec get_department(plan_desk_v1()) -> binary() | undefined.
get_department(#plan_desk_v1{department = V}) -> V.

-spec get_description(plan_desk_v1()) -> binary() | undefined.
get_description(#plan_desk_v1{description = V}) -> V.

-spec get_commands(plan_desk_v1()) -> list().
get_commands(#plan_desk_v1{commands = V}) -> V.

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
