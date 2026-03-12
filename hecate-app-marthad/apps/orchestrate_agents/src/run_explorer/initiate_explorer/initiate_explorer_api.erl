%%% @doc HTTP handler for initiating a explorer agent session.
-module(initiate_explorer_api).

-export([init/2, routes/0]).

routes() -> [{"/api/agents/explorer/initiate", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} -> do_initiate(Params, Req1);
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_initiate(Params, Req) ->
    VentureId = app_marthad_api_utils:get_field(venture_id, Params),
    case VentureId of
        undefined ->
            app_marthad_api_utils:bad_request(<<"venture_id required">>, Req);
        _ ->
            CmdParams = #{
                venture_id => VentureId,
                tier => app_marthad_api_utils:get_field(tier, Params, <<"T1">>),
                initiated_by => app_marthad_api_utils:get_field(initiated_by, Params),
                input_context => app_marthad_api_utils:get_field(input_context, Params)
            },
            case initiate_explorer_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req);
                {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
            end
    end.

dispatch(Cmd, Req) ->
    case maybe_initiate_explorer:dispatch(Cmd) of
        {ok, Version, EventMaps} ->
            SessionId = initiate_explorer_v1:get_session_id(Cmd),
            app_marthad_api_utils:json_ok(201, #{
                session_id => SessionId,
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
