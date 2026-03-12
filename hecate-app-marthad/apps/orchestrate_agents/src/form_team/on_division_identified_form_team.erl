%%% @doc Process manager: on division_identified_v1, form a division team.
%%% Subscribes to division_identified_v1 from martha_store.
%%% Creates a team with planned roles for the standard agent lineup.
-module(on_division_identified_form_team).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"division_identified_v1">>).
-define(SUB_NAME, <<"on_division_identified_form_team">>).
-define(STORE_ID, martha_store).

-define(DEFAULT_PLANNED_ROLES, [
    <<"stormer">>,
    <<"architect">>,
    <<"erlang_coder">>,
    <<"svelte_coder">>,
    <<"sql_coder">>,
    <<"tester">>,
    <<"reviewer">>
]).

start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    {ok, _} = reckon_evoq_adapter:subscribe(
        ?STORE_ID, event_type, ?EVENT_TYPE, ?SUB_NAME,
        #{subscriber_pid => self()}),
    {ok, #{}}.

handle_info({events, Events}, State) ->
    lists:foreach(fun process_event/1, Events),
    {noreply, State};
handle_info(_Info, State) -> {noreply, State}.

handle_call(_Req, _From, State) -> {reply, ok, State}.
handle_cast(_Msg, State) -> {noreply, State}.
terminate(_Reason, _State) -> ok.

%% Internal

process_event(RawEvent) ->
    Event = app_marthad_projection_event:to_map(RawEvent),
    DivisionId = get_value(division_id, Event),
    VentureId = get_value(venture_id, Event),
    case {DivisionId, VentureId} of
        {undefined, _} ->
            logger:warning("[~s] missing division_id in event", [?MODULE]);
        {_, undefined} ->
            logger:warning("[~s] missing venture_id in event", [?MODULE]);
        _ ->
            CmdParams = #{
                division_id => DivisionId,
                venture_id => VentureId,
                planned_roles => ?DEFAULT_PLANNED_ROLES,
                formed_by => <<"system:pm">>
            },
            case form_team_v1:new(CmdParams) of
                {ok, Cmd} ->
                    case maybe_form_team:dispatch(Cmd) of
                        {ok, _, _} ->
                            logger:info("[~s] formed team for division ~s",
                                       [?MODULE, DivisionId]);
                        {error, Reason} ->
                            logger:warning("[~s] failed to form team for ~s: ~p",
                                          [?MODULE, DivisionId, Reason])
                    end;
                {error, Reason} ->
                    logger:warning("[~s] failed to create command: ~p", [?MODULE, Reason])
            end
    end.

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
