%%% @doc HTTP handler for passing the vision gate.
-module(pass_vision_gate_api).

-include_lib("evoq/include/evoq.hrl").

-export([init/2, routes/0]).

routes() -> [{"/api/agents/visionary/gate/pass", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case hecate_plugin_api:read_json_body(Req0) of
        {ok, Params, Req1} -> do_pass(Params, Req1);
        {error, invalid_json, Req1} ->
            hecate_plugin_api:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_pass(Params, Req) ->
    SessionId = hecate_plugin_api:get_field(session_id, Params),
    case SessionId of
        undefined ->
            hecate_plugin_api:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                passed_by => hecate_plugin_api:get_field(passed_by, Params)
            },
            case pass_vision_gate_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req);
                {error, Reason} -> hecate_plugin_api:bad_request(Reason, Req)
            end
    end.

dispatch(Cmd, Req) ->
    SessionId = pass_vision_gate_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = pass_gate,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = pass_vision_gate_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => agent_orchestration_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    case evoq_dispatcher:dispatch(EvoqCmd, Opts) of
        {ok, Version, EventMaps} ->
            hecate_plugin_api:json_ok(200, #{
                session_id => SessionId,
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            hecate_plugin_api:bad_request(Reason, Req)
    end.
