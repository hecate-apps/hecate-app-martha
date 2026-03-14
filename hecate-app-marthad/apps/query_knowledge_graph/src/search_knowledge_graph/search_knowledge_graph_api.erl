%%% @doc API handler: GET /api/knowledge-graph/:venture_id/search?q=query
-module(search_knowledge_graph_api).
-export([init/2, routes/0]).

routes() -> [{"/api/knowledge-graph/:venture_id/search", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    VentureId = cowboy_req:binding(venture_id, Req0),
    #{q := Query} = cowboy_req:match_qs([{q, [], <<>>}], Req0),
    case Query of
        <<>> ->
            hecate_plugin_api:bad_request(<<"q parameter is required">>, Req0);
        _ ->
            case project_knowledge_graph_store:search_entities(VentureId, Query) of
                {ok, Results} ->
                    hecate_plugin_api:json_ok(#{results => Results}, Req0)
            end
    end.
