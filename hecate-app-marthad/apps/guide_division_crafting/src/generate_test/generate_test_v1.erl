%%% @doc generate_test_v1 command
%%% Generates a test within a crafting dossier.
-module(generate_test_v1).

-export([new/1, from_map/1, validate/1, to_map/1]).
-export([get_division_id/1, get_test_name/1, get_module_name/1, get_path/1]).

-record(generate_test_v1, {
    division_id :: binary(),
    test_name   :: binary(),
    module_name :: binary(),
    path        :: binary()
}).

-export_type([generate_test_v1/0]).
-opaque generate_test_v1() :: #generate_test_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> {ok, generate_test_v1()} | {error, term()}.
new(#{division_id := DivisionId, test_name := TestName, module_name := ModuleName, path := Path}) ->
    {ok, #generate_test_v1{
        division_id = DivisionId,
        test_name = TestName,
        module_name = ModuleName,
        path = Path
    }};
new(_) ->
    {error, missing_required_fields}.

-spec validate(generate_test_v1()) -> {ok, generate_test_v1()} | {error, term()}.
validate(#generate_test_v1{division_id = D}) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, invalid_division_id};
validate(#generate_test_v1{test_name = N}) when not is_binary(N); byte_size(N) =:= 0 ->
    {error, invalid_test_name};
validate(#generate_test_v1{} = Cmd) ->
    {ok, Cmd}.

-spec to_map(generate_test_v1()) -> map().
to_map(#generate_test_v1{} = Cmd) ->
    #{
        <<"command_type">> => <<"generate_test">>,
        <<"division_id">> => Cmd#generate_test_v1.division_id,
        <<"test_name">> => Cmd#generate_test_v1.test_name,
        <<"module_name">> => Cmd#generate_test_v1.module_name,
        <<"path">> => Cmd#generate_test_v1.path
    }.

-spec from_map(map()) -> {ok, generate_test_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    TestName = get_value(test_name, Map),
    ModuleName = get_value(module_name, Map),
    Path = get_value(path, Map),
    case {DivisionId, TestName, ModuleName, Path} of
        {undefined, _, _, _} -> {error, missing_required_fields};
        {_, undefined, _, _} -> {error, missing_required_fields};
        {_, _, undefined, _} -> {error, missing_required_fields};
        {_, _, _, undefined} -> {error, missing_required_fields};
        _ ->
            {ok, #generate_test_v1{
                division_id = DivisionId,
                test_name = TestName,
                module_name = ModuleName,
                path = Path
            }}
    end.

%% Accessors
-spec get_division_id(generate_test_v1()) -> binary().
get_division_id(#generate_test_v1{division_id = V}) -> V.
-spec get_test_name(generate_test_v1()) -> binary().
get_test_name(#generate_test_v1{test_name = V}) -> V.
-spec get_module_name(generate_test_v1()) -> binary().
get_module_name(#generate_test_v1{module_name = V}) -> V.
-spec get_path(generate_test_v1()) -> binary().
get_path(#generate_test_v1{path = V}) -> V.

%% Internal helper
get_value(Key, Map) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> undefined end
    end.
