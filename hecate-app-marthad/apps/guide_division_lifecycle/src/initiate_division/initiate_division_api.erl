-module(initiate_division_api).
-export([init/2, routes/0]).

routes() -> [{"/api/divisions/:division_id/initiate", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    {ok, Body, Req1} = cowboy_req:read_body(Req0),
    Params = json:decode(Body),
    VentureId = maps:get(<<"venture_id">>, Params, undefined),
    ContextName = maps:get(<<"context_name">>, Params, undefined),
    InitiatedBy = maps:get(<<"initiated_by">>, Params, undefined),
    CmdParams = #{
        division_id => DivisionId,
        venture_id => VentureId,
        context_name => ContextName,
        initiated_by => InitiatedBy
    },
    case initiate_division_v1:new(CmdParams) of
        {ok, Cmd} ->
            case maybe_initiate_division:dispatch(Cmd) of
                {ok, Version, Events} ->
                    hecate_plugin_api:json_ok(201, #{
                        division_id => DivisionId,
                        venture_id => VentureId,
                        context_name => ContextName,
                        initiated_by => InitiatedBy,
                        version => Version,
                        events => Events
                    }, Req1);
                {error, Reason} ->
                    hecate_plugin_api:json_error(400, Reason, Req1)
            end;
        {error, Reason} ->
            hecate_plugin_api:json_error(400, Reason, Req1)
    end.
