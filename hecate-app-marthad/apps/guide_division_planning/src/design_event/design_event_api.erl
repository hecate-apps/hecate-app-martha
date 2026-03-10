%%% @doc API handler: POST /api/plannings/:division_id/design-event
-module(design_event_api).

-export([init/2, routes/0]).

routes() -> [{"/api/plannings/:division_id/design-event", ?MODULE, []}].

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
                    do_design(DivisionId, Params, Req1);
                {error, invalid_json, Req1} ->
                    app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_design(DivisionId, Params, Req) ->
    EvtName = app_marthad_api_utils:get_field(event_name, Params),
    Description = app_marthad_api_utils:get_field(description, Params),
    AggName = app_marthad_api_utils:get_field(aggregate_name, Params),
    Fields = app_marthad_api_utils:get_field(fields, Params),

    CmdParams = #{
        division_id => DivisionId,
        event_name => EvtName,
        description => Description,
        aggregate_name => AggName,
        fields => case Fields of undefined -> []; _ -> Fields end
    },
    case design_event_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_design_event:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            app_marthad_api_utils:json_ok(201, #{
                division_id => design_event_v1:get_division_id(Cmd),
                event_name => design_event_v1:get_event_name(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
