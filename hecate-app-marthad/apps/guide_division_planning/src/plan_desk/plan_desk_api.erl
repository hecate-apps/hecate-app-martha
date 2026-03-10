%%% @doc API handler: POST /api/plannings/:division_id/plan-desk
-module(plan_desk_api).

-export([init/2, routes/0]).

routes() -> [{"/api/plannings/:division_id/plan-desk", ?MODULE, []}].

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
    DeskName = app_marthad_api_utils:get_field(desk_name, Params),
    Department = app_marthad_api_utils:get_field(department, Params),
    Description = app_marthad_api_utils:get_field(description, Params),
    Commands = app_marthad_api_utils:get_field(commands, Params),

    CmdParams = #{
        division_id => DivisionId,
        desk_name => DeskName,
        department => Department,
        description => Description,
        commands => case Commands of undefined -> []; _ -> Commands end
    },
    case plan_desk_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_plan_desk:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            app_marthad_api_utils:json_ok(201, #{
                division_id => plan_desk_v1:get_division_id(Cmd),
                desk_name => plan_desk_v1:get_desk_name(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
