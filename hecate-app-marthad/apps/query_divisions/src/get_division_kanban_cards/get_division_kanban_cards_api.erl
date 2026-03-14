-module(get_division_kanban_cards_api).
-export([init/2, routes/0]).

routes() -> [{"/api/divisions/:division_id/kanban/cards", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    QsVals = cowboy_req:parse_qs(Req0),
    Result = case lists:keyfind(<<"status">>, 1, QsVals) of
        {_, StatusBin} -> get_division_kanban_cards:get(DivisionId, #{status => StatusBin});
        false -> get_division_kanban_cards:get(DivisionId)
    end,
    case Result of
        {ok, Cards} ->
            hecate_plugin_api:json_ok(#{cards => Cards}, Req0);
        {error, Reason} ->
            hecate_plugin_api:json_error(500, Reason, Req0)
    end.
