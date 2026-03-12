%%% @doc HTTP handler for archiving an agent session.
-module(archive_agent_session_api).

-include("agent_orchestration_status.hrl").

-export([init/2, routes/0]).

routes() -> [{"/api/agents/sessions/archive", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"POST">> -> handle_post(Req0, State);
        _ -> app_marthad_api_utils:method_not_allowed(Req0)
    end.

handle_post(Req0, _State) ->
    case app_marthad_api_utils:read_json_body(Req0) of
        {ok, Params, Req1} -> do_archive(Params, Req1);
        {error, invalid_json, Req1} ->
            app_marthad_api_utils:bad_request(<<"Invalid JSON">>, Req1)
    end.

%% Internal

do_archive(Params, Req) ->
    SessionId = app_marthad_api_utils:get_field(session_id, Params),
    ArchivedBy = app_marthad_api_utils:get_field(archived_by, Params),
    case SessionId of
        undefined ->
            app_marthad_api_utils:bad_request(<<"session_id required">>, Req);
        _ ->
            CmdParams = #{
                session_id => SessionId,
                archived_by => ArchivedBy
            },
            case archive_agent_session_v1:new(CmdParams) of
                {ok, Cmd} -> dispatch(Cmd, Req);
                {error, Reason} -> app_marthad_api_utils:bad_request(Reason, Req)
            end
    end.

dispatch(Cmd, Req) ->
    case maybe_archive_agent_session:dispatch(Cmd) of
        {ok, Version, EventMaps} ->
            SessionId = archive_agent_session_v1:get_session_id(Cmd),
            Status = evoq_bit_flags:set(0, ?AO_ARCHIVED),
            StatusLabel = evoq_bit_flags:to_string(Status, ?AO_FLAG_MAP),
            app_marthad_api_utils:json_ok(200, #{
                session_id => SessionId,
                status => Status,
                status_label => StatusLabel,
                version => Version,
                events => EventMaps
            }, Req);
        {error, Reason} ->
            app_marthad_api_utils:bad_request(Reason, Req)
    end.
