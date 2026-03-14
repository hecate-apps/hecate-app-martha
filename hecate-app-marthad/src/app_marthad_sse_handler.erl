%%% @doc SSE endpoint: GET /api/events/stream
%%%
%%% Long-lived Server-Sent Events connection for streaming Martha domain
%%% events to the web frontend. One process per connected client.
%%%
%%% On connect: joins martha_sse pg group, starts heartbeat timer.
%%% On event:   receives {martha_event, Type, Data} from app_marthad_web_events,
%%%             writes event: {Type}\ndata: {Data}\n\n.
%%% On disconnect: process dies, pg auto-removes it.
%%% @end
-module(app_marthad_sse_handler).

-export([init/2, routes/0]).

-define(SCOPE, pg).
-define(GROUP, martha_sse).
-define(HEARTBEAT_MS, 30000).

routes() -> [{"/api/events/stream", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> ->
            start_stream(Req0, State);
        _ ->
            hecate_plugin_api:method_not_allowed(Req0)
    end.

start_stream(Req0, _State) ->
    ensure_pg_scope(),
    pg:join(?SCOPE, ?GROUP, self()),
    logger:info("[martha_sse] Client connected, pid=~p", [self()]),

    Req1 = cowboy_req:stream_reply(200, #{
        <<"content-type">> => <<"text/event-stream">>,
        <<"cache-control">> => <<"no-cache">>,
        <<"connection">> => <<"keep-alive">>
    }, Req0),

    cowboy_req:stream_body(<<": connected\n\n">>, nofin, Req1),

    erlang:send_after(?HEARTBEAT_MS, self(), heartbeat),

    stream_loop(Req1).

stream_loop(Req) ->
    receive
        {martha_event, Type, Data} when is_binary(Type), is_binary(Data) ->
            Payload = <<"event: ", Type/binary, "\ndata: ", Data/binary, "\n\n">>,
            case catch cowboy_req:stream_body(Payload, nofin, Req) of
                ok ->
                    stream_loop(Req);
                _ ->
                    logger:info("[martha_sse] Client disconnected (write failed)"),
                    {ok, Req, []}
            end;

        heartbeat ->
            case catch cowboy_req:stream_body(<<": heartbeat\n\n">>, nofin, Req) of
                ok ->
                    erlang:send_after(?HEARTBEAT_MS, self(), heartbeat),
                    stream_loop(Req);
                _ ->
                    logger:info("[martha_sse] Client disconnected (heartbeat failed)"),
                    {ok, Req, []}
            end;

        _Other ->
            stream_loop(Req)
    end.

ensure_pg_scope() ->
    case pg:start(?SCOPE) of
        {ok, _Pid} -> ok;
        {error, {already_started, _Pid}} -> ok
    end.
