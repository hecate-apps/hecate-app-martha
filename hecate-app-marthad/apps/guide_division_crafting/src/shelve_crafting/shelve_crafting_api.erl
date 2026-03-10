%%% @doc API handler: POST /api/craftings/:division_id/shelve
-module(shelve_crafting_api).

-export([init/2, routes/0]).

routes() -> [{"/api/craftings/:division_id/shelve", ?MODULE, []}].

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
                    Reason = app_marthad_api_utils:get_field(reason, Params),
                    do_shelve(DivisionId, Reason, Req1);
                {error, invalid_json, Req1} ->
                    app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
            end
    end.

do_shelve(DivisionId, Reason, Req) ->
    CmdParams = #{division_id => DivisionId, reason => Reason},
    case shelve_crafting_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, Req);
        {error, ErrReason} -> app_marthad_api_utils:bad_request(ErrReason, Req)
    end.

dispatch(Cmd, Req) ->
    case maybe_shelve_crafting:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            app_marthad_api_utils:json_ok(200, #{
                division_id => shelve_crafting_v1:get_division_id(Cmd),
                shelved => true,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
