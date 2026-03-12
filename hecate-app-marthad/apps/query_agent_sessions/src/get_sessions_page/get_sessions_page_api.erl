-module(get_sessions_page_api).
-export([init/2, routes/0]).

routes() -> [{"/api/agents/sessions", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    QS = cowboy_req:parse_qs(Req0),
    Filters = build_filters(QS, #{}),
    case get_sessions_page:get(Filters) of
        {ok, Sessions} ->
            app_marthad_api_utils:json_ok(#{sessions => Sessions}, Req0);
        {error, Reason} ->
            app_marthad_api_utils:json_error(500, Reason, Req0)
    end.

build_filters(QS, Acc) ->
    lists:foldl(fun parse_filter/2, Acc, QS).

parse_filter({<<"venture_id">>, V}, Acc) -> Acc#{venture_id => V};
parse_filter({<<"division_id">>, V}, Acc) -> Acc#{division_id => V};
parse_filter({<<"agent_role">>, V}, Acc) -> Acc#{agent_role => V};
parse_filter({<<"limit">>, V}, Acc) -> maybe_int(limit, V, Acc);
parse_filter({<<"offset">>, V}, Acc) -> maybe_int(offset, V, Acc);
parse_filter(_, Acc) -> Acc.

maybe_int(Key, V, Acc) ->
    case catch binary_to_integer(V) of
        I when is_integer(I) -> Acc#{Key => I};
        _ -> Acc
    end.
