-module(get_plannings_by_venture_api).
-export([init/2, routes/0]).

routes() -> [{"/api/ventures/:venture_id/plannings", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    VentureId = cowboy_req:binding(venture_id, Req0),
    case get_plannings_by_venture:get(VentureId) of
        {ok, Plannings} ->
            app_marthad_api_utils:json_ok(#{plannings => Plannings}, Req0);
        {error, Reason} ->
            app_marthad_api_utils:json_error(500, Reason, Req0)
    end.
