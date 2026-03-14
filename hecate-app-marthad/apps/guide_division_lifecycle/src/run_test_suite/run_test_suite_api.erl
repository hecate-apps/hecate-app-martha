%%% @doc API handler: POST /api/craftings/:division_id/run-test-suite
-module(run_test_suite_api).

-export([init/2, routes/0]).

routes() -> [{"/api/craftings/:division_id/run-test-suite", ?MODULE, []}].

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
                {ok, Params, Req1} -> do_run(DivisionId, Params, Req1);
                {error, invalid_json, Req1} -> hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_run(DivisionId, Params, Req) ->
    SuiteName = hecate_plugin_api:get_field(suite_name, Params),
    SuiteId = hecate_plugin_api:get_field(suite_id, Params),
    CmdParams = case SuiteId of
        undefined -> #{division_id => DivisionId, suite_name => SuiteName};
        _ -> #{division_id => DivisionId, suite_id => SuiteId, suite_name => SuiteName}
    end,
    case run_test_suite_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_run_test_suite:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(201, #{
                division_id => run_test_suite_v1:get_division_id(Cmd),
                suite_id => run_test_suite_v1:get_suite_id(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
