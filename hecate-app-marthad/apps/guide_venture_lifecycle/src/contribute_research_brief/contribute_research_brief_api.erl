%%% @doc API handler: POST /api/ventures/:venture_id/knowledge/brief
%%%
%%% Contributes a research brief for a specific topic.
-module(contribute_research_brief_api).

-export([init/2, routes/0]).

routes() -> [{"/api/ventures/:venture_id/knowledge/brief", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    VentureId = cowboy_req:binding(venture_id, Req0),
    case VentureId of
        undefined ->
            hecate_plugin_api:bad_request(<<"venture_id is required">>, Req0);
        _ ->
            {ok, Body, Req1} = cowboy_req:read_body(Req0),
            Parsed = json:decode(Body),
            do_contribute(VentureId, Parsed, Req1)
    end.

do_contribute(VentureId, Parsed, Req) ->
    CmdParams = #{
        venture_id => VentureId,
        topic => maps:get(<<"topic">>, Parsed, undefined),
        brief => maps:get(<<"brief">>, Parsed, undefined),
        agent_role => maps:get(<<"agent_role">>, Parsed, <<"unknown">>)
    },
    case contribute_research_brief_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, VentureId, Req);
        {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
    end.

dispatch(Cmd, VentureId, Req) ->
    case maybe_contribute_research_brief:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(200, #{
                venture_id => VentureId,
                contributed => true,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
