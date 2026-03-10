-module(app_marthad_api_utils_tests).
-include_lib("eunit/include/eunit.hrl").

format_error_binary_test() ->
    ?assertEqual(<<"bad request">>, app_marthad_api_utils:format_error(<<"bad request">>)).

format_error_atom_test() ->
    ?assertEqual(<<"not_found">>, app_marthad_api_utils:format_error(not_found)).

format_error_tuple_test() ->
    Result = app_marthad_api_utils:format_error({validation, missing_field}),
    ?assert(is_binary(Result)),
    ?assertNotEqual(<<>>, Result).

format_error_other_test() ->
    Result = app_marthad_api_utils:format_error(42),
    ?assert(is_binary(Result)).

get_field_atom_key_test() ->
    Map = #{name => <<"test">>},
    ?assertEqual(<<"test">>, app_marthad_api_utils:get_field(name, Map)).

get_field_binary_key_test() ->
    Map = #{<<"name">> => <<"test">>},
    ?assertEqual(<<"test">>, app_marthad_api_utils:get_field(name, Map)).

get_field_default_test() ->
    Map = #{},
    ?assertEqual(undefined, app_marthad_api_utils:get_field(name, Map)),
    ?assertEqual(<<"fallback">>, app_marthad_api_utils:get_field(name, Map, <<"fallback">>)).

get_field_atom_priority_test() ->
    %% When both atom and binary keys exist, atom wins
    Map = #{name => <<"atom_val">>, <<"name">> => <<"bin_val">>},
    ?assertEqual(<<"atom_val">>, app_marthad_api_utils:get_field(name, Map)).
