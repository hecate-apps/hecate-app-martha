%%% @doc API: POST /api/kanbans/:division_id/archive
-module(archive_kanban_board_api).

-export([routes/0, init/2]).

routes() ->
    [{"/api/kanbans/:division_id/archive", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    CmdParams = #{division_id => DivisionId},
    case archive_kanban_board_v1:new(CmdParams) of
        {ok, Cmd} ->
            case maybe_archive_kanban_board:dispatch(Cmd) of
                {ok, _Version, _Events} ->
                    app_marthad_api_utils:json_ok(200,
                        #{<<"division_id">> => DivisionId,
                          <<"status">> => <<"archived">>}, Req0);
                {error, Reason} ->
                    app_marthad_api_utils:bad_request(Reason, Req0)
            end;
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req0)
    end.
