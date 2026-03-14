-module(get_divisions_by_venture_api).
-export([init/2, routes/0]).

routes() -> [{"/api/ventures/:venture_id/divisions", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    VentureId = cowboy_req:binding(venture_id, Req0),
    case get_divisions_by_venture:get(VentureId) of
        {ok, Divisions} ->
            hecate_plugin_api:json_ok(#{divisions => Divisions}, Req0);
        {error, Reason} ->
            hecate_plugin_api:json_error(500, Reason, Req0)
    end.
