%%% @doc LLM runner PM: on visionary initiated, run LLM and complete/fail.
%%% Subscribes to visionary_initiated_v1 from orchestration_store.
%%% Loads role spec, builds prompt, calls chat_to_llm, parses notation,
%%% then dispatches complete or fail command.
-module(on_visionary_initiated_run_visionary_llm).
-behaviour(gen_server).
-export([start_link/0]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-define(EVENT_TYPE, <<"visionary_initiated_v1">>).
-define(SUB_NAME, <<"on_visionary_initiated_run_visionary_llm">>).
-define(STORE_ID, orchestration_store).
-define(ROLE, <<"visionary">>).

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
    SessionId = get_value(session_id, Event),
    Model = get_value(model, Event),
    InputContext = get_value(input_context, Event),
    spawn_link(fun() -> run_llm(SessionId, Model, InputContext) end).

run_llm(SessionId, Model, InputContext) ->
    case load_agent_role:load(?ROLE) of
        {ok, RoleContent} ->
            Messages = [
                #{role => <<"system">>, content => RoleContent},
                #{role => <<"user">>, content => ensure_binary(InputContext)}
            ],
            Opts = #{
                venture_id => <<"default">>,
                agent_id => SessionId
            },
            case chat_to_llm:chat(Model, Messages, Opts) of
                {ok, Response} ->
                    handle_llm_success(SessionId, Response);
                {error, Reason} ->
                    handle_llm_failure(SessionId, Reason)
            end;
        {error, Reason} ->
            handle_llm_failure(SessionId, {role_load_failed, Reason})
    end.

handle_llm_success(SessionId, Response) ->
    Content = extract_content(Response),
    TokensIn = extract_tokens_in(Response),
    TokensOut = extract_tokens_out(Response),
    {ParsedTerms, NotationOutput} = parse_notation(Content),
    CmdParams = #{
        session_id => SessionId,
        notation_output => NotationOutput,
        parsed_terms => ParsedTerms,
        tokens_in => TokensIn,
        tokens_out => TokensOut
    },
    case complete_visionary_v1:new(CmdParams) of
        {ok, Cmd} ->
            case maybe_complete_visionary:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:info("[~s] completed visionary session ~s", [?MODULE, SessionId]);
                {error, Reason} ->
                    logger:warning("[~s] failed to dispatch complete for ~s: ~p",
                                  [?MODULE, SessionId, Reason])
            end;
        {error, Reason} ->
            logger:warning("[~s] failed to create complete command for ~s: ~p",
                          [?MODULE, SessionId, Reason])
    end.

handle_llm_failure(SessionId, Reason) ->
    ErrorBin = iolist_to_binary(io_lib:format("~p", [Reason])),
    CmdParams = #{
        session_id => SessionId,
        error_reason => ErrorBin,
        tokens_in => 0,
        tokens_out => 0
    },
    case fail_visionary_v1:new(CmdParams) of
        {ok, Cmd} ->
            case maybe_fail_visionary:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:warning("[~s] visionary session ~s failed: ~s",
                                  [?MODULE, SessionId, ErrorBin]);
                {error, DispErr} ->
                    logger:error("[~s] failed to dispatch fail for ~s: ~p",
                               [?MODULE, SessionId, DispErr])
            end;
        {error, CmdErr} ->
            logger:error("[~s] failed to create fail command for ~s: ~p",
                        [?MODULE, SessionId, CmdErr])
    end.

extract_content(#{<<"message">> := #{<<"content">> := C}}) -> C;
extract_content(#{<<"content">> := [#{<<"text">> := T} | _]}) -> T;
extract_content(#{<<"content">> := C}) when is_binary(C) -> C;
extract_content(_) -> <<>>.

extract_tokens_in(#{<<"usage">> := #{<<"input_tokens">> := N}}) -> N;
extract_tokens_in(#{<<"prompt_eval_count">> := N}) -> N;
extract_tokens_in(_) -> 0.

extract_tokens_out(#{<<"usage">> := #{<<"output_tokens">> := N}}) -> N;
extract_tokens_out(#{<<"eval_count">> := N}) -> N;
extract_tokens_out(_) -> 0.

parse_notation(Content) when is_binary(Content), byte_size(Content) > 0 ->
    case martha_notation:parse(Content) of
        {ok, Terms} -> {Terms, Content};
        {error, _} -> {[], Content}
    end;
parse_notation(_) ->
    {[], <<>>}.

ensure_binary(V) when is_binary(V) -> V;
ensure_binary(undefined) -> <<>>;
ensure_binary(V) -> iolist_to_binary(io_lib:format("~p", [V])).

get_value(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
