%%% @doc API handler: GET /api/knowledge-graph/:venture_id
-module(get_knowledge_graph_api).
-export([init/2, routes/0]).

routes() -> [{"/api/knowledge-graph/:venture_id", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    VentureId = cowboy_req:binding(venture_id, Req0),
    case project_knowledge_graph_store:get_graph(VentureId) of
        {ok, Graph} ->
            hecate_plugin_api:json_ok(#{graph => Graph}, Req0);
        {error, not_found} ->
            hecate_plugin_api:json_error(404, <<"Knowledge graph not found">>, Req0)
    end.
