%%% @doc API handler: POST /api/ventures/:venture_id/knowledge/prepare
%%%
%%% Starts knowledge preparation for a venture.
%%% Accepts optional research_topics list; if empty, topics are
%%% derived from the venture vision by the orchestration layer.
-module(prepare_venture_knowledge_api).

-export([init/2, routes/0]).

routes() -> [{"/api/ventures/:venture_id/knowledge/prepare", ?MODULE, []}].

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
            Parsed = case Body of
                <<>> -> #{};
                _ -> json:decode(Body)
            end,
            Topics = maps:get(<<"research_topics">>, Parsed, []),
            do_prepare(VentureId, Topics, Req1)
    end.

do_prepare(VentureId, Topics, Req) ->
    CmdParams = #{venture_id => VentureId, research_topics => Topics},
    case prepare_venture_knowledge_v1:new(CmdParams) of
        {ok, Cmd} -> dispatch(Cmd, VentureId, Req);
        {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
    end.

dispatch(Cmd, VentureId, Req) ->
    case maybe_prepare_venture_knowledge:dispatch(Cmd) of
        {ok, _Version, EventMaps} ->
            hecate_plugin_api:json_ok(200, #{
                venture_id => VentureId,
                preparation_started => true,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
