%%% @doc API handler: GET /api/knowledge-graph/:venture_id/entities
-module(get_entities_page_api).
-export([init/2, routes/0]).

routes() -> [{"/api/knowledge-graph/:venture_id/entities", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    VentureId = cowboy_req:binding(venture_id, Req0),
    case project_knowledge_graph_store:get_entities(VentureId) of
        {ok, Entities} ->
            hecate_plugin_api:json_ok(#{entities => Entities}, Req0)
    end.
