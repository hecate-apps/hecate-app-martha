%%% @doc API handler: POST /api/craftings/:division_id/stage-delivery
-module(stage_delivery_api).

-export([init/2, routes/0]).

routes() -> [{"/api/craftings/:division_id/stage-delivery", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case DivisionId of
        undefined ->
            app_marthad_api_utils:bad_request(<<"division_id is required">>, Req0);
        _ ->
            case app_marthad_api_utils:read_json_body(Req0) of
                {ok, Params, Req1} -> do_stage(DivisionId, Params, Req1);
                {error, invalid_json, Req1} -> app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_stage(DivisionId, Params, Req) ->
    ReleaseId = app_marthad_api_utils:get_field(release_id, Params),
    StageName = app_marthad_api_utils:get_field(stage_name, Params),
    StageId = app_marthad_api_utils:get_field(stage_id, Params),
    CmdParams0 = #{division_id => DivisionId, release_id => ReleaseId, stage_name => StageName},
    CmdParams = case StageId of
        undefined -> CmdParams0;
        _ -> CmdParams0#{stage_id => StageId}
    end,
    case stage_delivery_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_stage_delivery:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            app_marthad_api_utils:json_ok(201, #{
                division_id => stage_delivery_v1:get_division_id(Cmd),
                stage_id => stage_delivery_v1:get_stage_id(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
