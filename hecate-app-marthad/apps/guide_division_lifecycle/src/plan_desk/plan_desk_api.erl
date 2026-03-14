%%% @doc API handler: POST /api/stormings/:division_id/plan-desk
-module(plan_desk_api).

-export([init/2, routes/0]).

routes() -> [{"/api/stormings/:division_id/plan-desk", ?MODULE, []}].

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
                {ok, Params, Req1} ->
                    do_plan(DivisionId, Params, Req1);
                {error, invalid_json, Req1} ->
                    hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_plan(DivisionId, Params, Req) ->
    DeskName = hecate_plugin_api:get_field(desk_name, Params),
    Department = hecate_plugin_api:get_field(department, Params),
    Description = hecate_plugin_api:get_field(description, Params),
    Commands = hecate_plugin_api:get_field(commands, Params),

    CmdParams = #{
        division_id => DivisionId,
        desk_name => DeskName,
        department => Department,
        description => Description,
        commands => case Commands of undefined -> []; _ -> Commands end
    },
    case plan_desk_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_plan_desk:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(201, #{
                division_id => plan_desk_v1:get_division_id(Cmd),
                desk_name => plan_desk_v1:get_desk_name(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
