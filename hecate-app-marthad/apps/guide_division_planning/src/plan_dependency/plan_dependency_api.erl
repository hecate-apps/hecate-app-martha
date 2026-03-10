%%% @doc API handler: POST /api/plannings/:division_id/plan-dependency
-module(plan_dependency_api).

-export([init/2, routes/0]).

routes() -> [{"/api/plannings/:division_id/plan-dependency", ?MODULE, []}].

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
                {ok, Params, Req1} ->
                    do_plan(DivisionId, Params, Req1);
                {error, invalid_json, Req1} ->
                    app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_plan(DivisionId, Params, Req) ->
    FromDesk = app_marthad_api_utils:get_field(from_desk, Params),
    ToDesk = app_marthad_api_utils:get_field(to_desk, Params),
    DepType = app_marthad_api_utils:get_field(dep_type, Params),
    DepId = app_marthad_api_utils:get_field(dependency_id, Params),

    CmdParams = #{
        division_id => DivisionId,
        from_desk => FromDesk,
        to_desk => ToDesk,
        dep_type => DepType
    },
    CmdParams1 = case DepId of
        undefined -> CmdParams;
        _ -> CmdParams#{dependency_id => DepId}
    end,
    case plan_dependency_v1:new(CmdParams1) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_plan_dependency:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            app_marthad_api_utils:json_ok(201, #{
                division_id => plan_dependency_v1:get_division_id(Cmd),
                dependency_id => plan_dependency_v1:get_dependency_id(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
