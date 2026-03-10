%%% @doc API handler: POST /api/plannings/:division_id/open
-module(open_planning_api).

-export([init/2, routes/0]).

routes() -> [{"/api/plannings/:division_id/open", ?MODULE, []}].

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
            case open_planning_v1:new(#{division_id => DivisionId}) of
                {ok, Cmd} -> dispatch(Cmd, Req0);
                {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req0)
            end
    end.

dispatch(Cmd, Req) ->
    case maybe_open_planning:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            app_marthad_api_utils:json_ok(200, #{
                division_id => open_planning_v1:get_division_id(Cmd),
                opened => true,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
