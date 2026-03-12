%%% @doc API: POST /api/kanbans/:division_id/initiate
-module(initiate_kanban_board_api).

-export([routes/0, init/2]).

routes() ->
    [{"/api/kanbans/:division_id/initiate", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    DivisionId = cowboy_req:binding(division_id, Req0),
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} ->
            CmdParams = #{
                division_id  => DivisionId,
                venture_id   => get_value(<<"venture_id">>, Params),
                context_name => get_value(<<"context_name">>, Params, <<>>),
                initiated_by => get_value(<<"initiated_by">>, Params, undefined)
            },
            case initiate_kanban_board_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req1);
                {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req1)
            end;
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.

dispatch(Cmd, Req) ->
    case maybe_initiate_kanban_board:dispatch(Cmd) of
        {ok, _Version, _Events} ->
            app_marthad_api_utils:json_ok(201,
                #{<<"division_id">> => initiate_kanban_board_v1:get_division_id(Cmd),
                  <<"status">> => <<"initiated">>}, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.

get_value(Key, Map) -> get_value(Key, Map, undefined).
get_value(Key, Map, Default) -> maps:get(Key, Map, Default).
