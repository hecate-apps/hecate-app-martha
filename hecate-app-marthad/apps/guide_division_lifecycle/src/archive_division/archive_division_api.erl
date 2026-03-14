-module(archive_division_api).
-export([init/2, routes/0]).

routes() -> [{"/api/divisions/:division_id/archive", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case archive_division_v1:new(#{division_id => DivisionId}) of
        {ok, Cmd} ->
            case maybe_archive_division:dispatch(Cmd) of
                {ok, Version, Events} ->
                    hecate_plugin_api:json_ok(#{
                        division_id => DivisionId,
                        archived => true,
                        version => Version,
                        events => Events
                    }, Req0);
                {error, Reason} ->
                    hecate_plugin_api:json_error(400, Reason, Req0)
            end;
        {error, Reason} ->
            hecate_plugin_api:json_error(400, Reason, Req0)
    end.
