%%% @doc HTTP handler for initiating a sql_coder agent session.
-module(initiate_sql_coder_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/sql_coder/initiate", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} -> do_initiate(Params, Req1);
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_initiate(Params, Req) ->
    VentureId = hecate_plugin_api:get_field(venture_id, Params),
    case VentureId of
        undefined ->
            hecate_plugin_api:bad_request(<<"venture_id required">>, Req);
        _ ->
            CmdParams = #{
                venture_id => VentureId,
                tier => hecate_plugin_api:get_field(tier, Params, <<"T1">>),
                initiated_by => hecate_plugin_api:get_field(initiated_by, Params),
                input_context => hecate_plugin_api:get_field(input_context, Params)
            },
            case initiate_sql_coder_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req);
                {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
            end
    end.

dispatch(Cmd, Req) ->
    case maybe_initiate_sql_coder:dispatch(Cmd) of
        {ok, Version, EventMaps} ->
            SessionId = initiate_sql_coder_v1:get_session_id(Cmd),
            hecate_plugin_api:json_ok(201, #{
                session_id => SessionId,
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
