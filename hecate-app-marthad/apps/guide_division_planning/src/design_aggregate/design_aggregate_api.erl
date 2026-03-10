%%% @doc API handler: POST /api/plannings/:division_id/design-aggregate
-module(design_aggregate_api).

-export([init/2, routes/0]).

routes() -> [{"/api/plannings/:division_id/design-aggregate", ?MODULE, []}].

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
    AggName = app_marthad_api_utils:get_field(aggregate_name, Params),
    Description = app_marthad_api_utils:get_field(description, Params),
    StreamPrefix = app_marthad_api_utils:get_field(stream_prefix, Params),
    Fields = app_marthad_api_utils:get_field(fields, Params),

    CmdParams = #{
        division_id => DivisionId,
        aggregate_name => AggName,
        description => Description,
        stream_prefix => StreamPrefix,
        fields => case Fields of undefined -> []; _ -> Fields end
    },
    case design_aggregate_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_design_aggregate:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            app_marthad_api_utils:json_ok(201, #{
                division_id => design_aggregate_v1:get_division_id(Cmd),
                aggregate_name => design_aggregate_v1:get_aggregate_name(Cmd),
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
