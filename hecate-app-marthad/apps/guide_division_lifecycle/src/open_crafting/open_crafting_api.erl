%%% @doc API handler: POST /api/craftings/:division_id/open
-module(open_crafting_api).

-export([init/2, routes/0]).

routes() -> [{"/api/craftings/:division_id/open", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case DivisionId of
        undefined ->
            hecate_plugin_api:bad_request(<<"division_id is required">>, Req0);
        _ ->
            case open_crafting_v1:new(#{division_id => DivisionId}) of
                {ok, Cmd} -> dispatch(Cmd, Req0);
                {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req0)
            end
    end.

dispatch(Cmd, Req) ->
    case maybe_open_crafting:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(200, #{
                division_id => open_crafting_v1:get_division_id(Cmd),
                opened => true,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
