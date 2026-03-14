%%% @doc API handler: POST /api/craftings/:division_id/record-test-result
-module(record_test_result_api).

-export([init/2, routes/0]).

routes() -> [{"/api/craftings/:division_id/record-test-result", ?MODULE, []}].

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
                {ok, Params, Req1} -> do_record(DivisionId, Params, Req1);
                {error, invalid_json, Req1} -> hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_record(DivisionId, Params, Req) ->
    SuiteId = hecate_plugin_api:get_field(suite_id, Params),
    Passed = hecate_plugin_api:get_field(passed, Params),
    Failed = hecate_plugin_api:get_field(failed, Params),
    ResultId = hecate_plugin_api:get_field(result_id, Params),
    CmdParams0 = #{division_id => DivisionId, suite_id => SuiteId, passed => Passed, failed => Failed},
    CmdParams = case ResultId of
        undefined -> CmdParams0;
        _ -> CmdParams0#{result_id => ResultId}
    end,
    case record_test_result_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_record_test_result:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(201, #{
                division_id => record_test_result_v1:get_division_id(Cmd),
                result_id => record_test_result_v1:get_result_id(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
