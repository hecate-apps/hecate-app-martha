%%% @doc API handler: POST /api/craftings/:division_id/generate-test
-module(generate_test_api).

-export([init/2, routes/0]).

routes() -> [{"/api/craftings/:division_id/generate-test", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case DivisionId of
        undefined ->
            hecate_plugin_api:bad_request(<<"division_id is required">>, Req0);
        _ ->
            case hecate_plugin_api:read_json_body(Req0) of
                {ok, Params, Req1} -> do_generate(DivisionId, Params, Req1);
                {error, invalid_json, Req1} -> hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_generate(DivisionId, Params, Req) ->
    TestName = hecate_plugin_api:get_field(test_name, Params),
    ModuleName = hecate_plugin_api:get_field(module_name, Params),
    Path = hecate_plugin_api:get_field(path, Params),
    CmdParams = #{division_id => DivisionId, test_name => TestName, module_name => ModuleName, path => Path},
    case generate_test_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_generate_test:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(201, #{
                division_id => generate_test_v1:get_division_id(Cmd),
                test_name => generate_test_v1:get_test_name(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
