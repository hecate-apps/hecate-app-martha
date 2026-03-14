%%% @doc API handler: POST /api/craftings/:division_id/generate-module
-module(generate_module_api).

-export([init/2, routes/0]).

routes() -> [{"/api/craftings/:division_id/generate-module", ?MODULE, []}].

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
                    do_generate(DivisionId, Params, Req1);
                {error, invalid_json, Req1} ->
                    hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_generate(DivisionId, Params, Req) ->
    ModuleName = hecate_plugin_api:get_field(module_name, Params),
    ModuleType = hecate_plugin_api:get_field(module_type, Params),
    Path = hecate_plugin_api:get_field(path, Params),
    CmdParams = #{
        division_id => DivisionId,
        module_name => ModuleName,
        module_type => ModuleType,
        path => Path
    },
    case generate_module_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_generate_module:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(201, #{
                division_id => generate_module_v1:get_division_id(Cmd),
                module_name => generate_module_v1:get_module_name(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
