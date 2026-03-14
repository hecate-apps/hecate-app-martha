-module(get_division_storming_api).
-export([init/2, routes/0]).

routes() -> [{"/api/divisions/:division_id/storming", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case get_division_storming:get(DivisionId) of
        {ok, Storming} ->
            hecate_plugin_api:json_ok(#{storming => Storming}, Req0);
        {error, not_found} ->
            hecate_plugin_api:json_error(404, <<"Division not found">>, Req0);
        {error, Reason} ->
            hecate_plugin_api:json_error(500, Reason, Req0)
    end.
