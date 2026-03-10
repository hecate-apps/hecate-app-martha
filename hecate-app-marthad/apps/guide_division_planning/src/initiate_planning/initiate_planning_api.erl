%%% @doc API handler: POST /api/plannings
%%%
%%% Initiates a new division planning dossier.
%%% @end
-module(initiate_planning_api).

-include("planning_status.hrl").

-export([init/2, routes/0]).

routes() -> [{"/api/plannings", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} ->
            do_initiate(Params, Req1);
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.

do_initiate(Params, Req) ->
    DivisionId = app_marthad_api_utils:get_field(division_id, Params),
    VentureId = app_marthad_api_utils:get_field(venture_id, Params),
    ContextName = app_marthad_api_utils:get_field(context_name, Params),
    InitiatedBy = app_marthad_api_utils:get_field(initiated_by, Params),

    case validate(DivisionId, ContextName) of
        ok -> create_planning(DivisionId, VentureId, ContextName, InitiatedBy, Req);
        {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
    end.

validate(undefined, _) -> {error, <<"division_id is required">>};
validate(_, undefined) -> {error, <<"context_name is required">>};
validate(D, _) when not is_binary(D); byte_size(D) =:= 0 ->
    {error, <<"division_id must be a non-empty string">>};
validate(_, C) when not is_binary(C); byte_size(C) =:= 0 ->
    {error, <<"context_name must be a non-empty string">>};
validate(_, _) -> ok.

create_planning(DivisionId, VentureId, ContextName, InitiatedBy, Req) ->
    CmdParams = #{
        division_id => DivisionId,
        venture_id => VentureId,
        context_name => ContextName,
        initiated_by => InitiatedBy
    },
    case initiate_planning_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_initiate_planning:dispatch(Cmd) of
        {ok, Version, EventMaps} ->
            DivisionId = initiate_planning_v1:get_division_id(Cmd),
            Status = evoq_bit_flags:set(0, 1), %% PLANNING_INITIATED
            StatusLabel = evoq_bit_flags:to_string(Status, ?PLANNING_FLAG_MAP),
            app_marthad_api_utils:json_ok(201, #{
                division_id => DivisionId,
                venture_id => initiate_planning_v1:get_venture_id(Cmd),
                context_name => initiate_planning_v1:get_context_name(Cmd),
                status => Status,
                status_label => StatusLabel,
                initiated_at => erlang:system_time(millisecond),
                initiated_by => initiate_planning_v1:get_initiated_by(Cmd),
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
