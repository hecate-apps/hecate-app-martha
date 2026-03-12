%%% @doc API: unpick_kanban_card
-module(unpick_kanban_card_api).

-export([routes/0, init/2]).

routes() ->
    [{"/api/kanbans/:division_id/cards/:card_id/unpick", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    CardId = cowboy_req:binding(card_id, Req0),
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} ->
            CmdParams = #{
                division_id => DivisionId,
                card_id     => CardId,
                reason      => maps:get(<<"reason">>, Params, undefined)
            },
            case unpick_kanban_card_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_unpick_kanban_card:dispatch(Cmd) of
                        {ok, _Version, _Events} ->
                            app_marthad_api_utils:json_ok(200,
                                #{<<"card_id">> => CardId, <<"status">> => <<"ok">>}, Req1);
                        {error, Reason} ->
                            app_marthad_api_utils:bad_request(Reason, Req1)
                    end;
                {error, Reason} ->
                    app_marthad_api_utils:bad_request(Reason, Req1)
            end;
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.
