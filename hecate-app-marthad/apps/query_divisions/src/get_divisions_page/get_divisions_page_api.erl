-module(get_divisions_page_api).
-export([init/2, routes/0]).

routes() -> [{"/api/divisions", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    QsVals = cowboy_req:parse_qs(Req0),
    Limit = qs_int(<<"limit">>, QsVals, 20),
    Offset = qs_int(<<"offset">>, QsVals, 0),
    case get_divisions_page:get(Limit, Offset) of
        {ok, Divisions} ->
            hecate_plugin_api:json_ok(#{divisions => Divisions, limit => Limit, offset => Offset}, Req0);
        {error, Reason} ->
            hecate_plugin_api:json_error(500, Reason, Req0)
    end.

qs_int(Key, QsVals, Default) ->
    case lists:keyfind(Key, 1, QsVals) of
        {_, Val} ->
            try binary_to_integer(Val) catch _:_ -> Default end;
        false ->
            Default
    end.
