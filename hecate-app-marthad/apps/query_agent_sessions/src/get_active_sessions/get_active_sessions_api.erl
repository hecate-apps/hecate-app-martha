-module(get_active_sessions_api).
-export([init/2, routes/0]).

routes() -> [{"/api/agents/sessions/active", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    {ok, Sessions} = get_active_sessions:get(),
    hecate_plugin_api:json_ok(#{sessions => Sessions, count => length(Sessions)}, Req0).
