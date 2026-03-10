%%% @doc generate_module_v1 command
%%% Generates a module within a crafting dossier.
-module(generate_module_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_module_name/1, get_module_type/1, get_path/1]).

-record(generate_module_v1, {
    division_id :: binary(),
    module_name :: binary(),
    module_type :: binary(),
    path        :: binary()
}).

-export_type([generate_module_v1/0]).
-opaque generate_module_v1() :: #generate_module_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, generate_module_v1()} | {error, term()}.
new(#{division_id := DivisionId, module_name := ModuleName, module_type := ModuleType, path := Path}) ->
    {ok, #generate_module_v1{
        division_id = DivisionId,
        module_name = ModuleName,
        module_type = ModuleType,
        path = Path
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(generate_module_v1()) -> {ok, generate_module_v1()} | {error, term()}.
validate(#generate_module_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#generate_module_v1{module_name = N}) when not is_binary(N); byte_size(N) =:= 0 ->
    {error, invalid_module_name};
validate(#generate_module_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(generate_module_v1()) -> map().
to_map(#generate_module_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"generate_module">>,
        <<"division_id">> => Cmd#generate_module_v1.division_id,
        <<"module_name">> => Cmd#generate_module_v1.module_name,
        <<"module_type">> => Cmd#generate_module_v1.module_type,
        <<"path">> => Cmd#generate_module_v1.path
    }.

-spec from_map(map()) -> {ok, generate_module_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    ModuleName = get_value(module_name, Map),
    ModuleType = get_value(module_type, Map),
    Path = get_value(path, Map),
    case {DivisionId, ModuleName, ModuleType, Path} of
        {undefined, _, _, _} -> {error, missing_required_fields};
        {_, undefined, _, _} -> {error, missing_required_fields};
        {_, _, undefined, _} -> {error, missing_required_fields};
        {_, _, _, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #generate_module_v1{
                division_id = DivisionId,
                module_name = ModuleName,
                module_type = ModuleType,
                path = Path
            }}
    end.

%% Accessors
-spec get_division_id(generate_module_v1()) -> binary().
get_division_id(#generate_module_v1{division_id = V}) -> V.

-spec get_module_name(generate_module_v1()) -> binary().
get_module_name(#generate_module_v1{module_name = V}) -> V.

-spec get_module_type(generate_module_v1()) -> binary().
get_module_type(#generate_module_v1{module_type = V}) -> V.

-spec get_path(generate_module_v1()) -> binary().
get_path(#generate_module_v1{path = V}) -> V.

%% Internal helper
get_value(Key, Map) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> undefined end
    end.
