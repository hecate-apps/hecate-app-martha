%%% @doc test_generated_v1 event
%%% Emitted when a test is generated within a crafting dossier.
-module(test_generated_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_test_name/1, get_module_name/1, get_path/1, get_generated_at/1]).

-record(test_generated_v1, {
    division_id  :: binary(),
    test_name    :: binary(),
    module_name  :: binary(),
    path         :: binary(),
    generated_at :: integer()
}).

-export_type([test_generated_v1/0]).
-opaque test_generated_v1() :: #test_generated_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> test_generated_v1().
new(#{division_id := DivisionId, test_name := TestName, module_name := ModuleName, path := Path}) ->
    #test_generated_v1{
        division_id = DivisionId,
        test_name = TestName,
        module_name = ModuleName,
        path = Path,
        generated_at = erlang:system_time(millisecond)
    }.

-spec to_map(test_generated_v1()) -> map().
to_map(#test_generated_v1{} = E) ->
    #{
        <<"event_type">> => <<"test_generated_v1">>,
        <<"division_id">> => E#test_generated_v1.division_id,
        <<"test_name">> => E#test_generated_v1.test_name,
        <<"module_name">> => E#test_generated_v1.module_name,
        <<"path">> => E#test_generated_v1.path,
        <<"generated_at">> => E#test_generated_v1.generated_at
    }.

-spec from_map(map()) -> {ok, test_generated_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    TestName = get_value(test_name, Map),
    case {DivisionId, TestName} of
        {undefined, _} -> {error, invalid_event};
        {_, undefined} -> {error, invalid_event};
        _ ->
            {ok, #test_generated_v1{
                division_id = DivisionId,
                test_name = TestName,
                module_name = get_value(module_name, Map, <<>>),
                path = get_value(path, Map, <<>>),
                generated_at = get_value(generated_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(test_generated_v1()) -> binary().
get_division_id(#test_generated_v1{division_id = V}) -> V.
-spec get_test_name(test_generated_v1()) -> binary().
get_test_name(#test_generated_v1{test_name = V}) -> V.
-spec get_module_name(test_generated_v1()) -> binary().
get_module_name(#test_generated_v1{module_name = V}) -> V.
-spec get_path(test_generated_v1()) -> binary().
get_path(#test_generated_v1{path = V}) -> V.
-spec get_generated_at(test_generated_v1()) -> integer().
get_generated_at(#test_generated_v1{generated_at = V}) -> V.

%% Internal helper
get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> case maps:find(BinKey, Map) of {ok, V} -> V; error -> Default end
    end.
