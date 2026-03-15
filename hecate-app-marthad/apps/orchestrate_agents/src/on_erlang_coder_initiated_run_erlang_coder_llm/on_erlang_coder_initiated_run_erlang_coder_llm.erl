%%% @doc LLM runner PM: on erlang_coder initiated, run LLM and complete/fail.
%%% Reacts to erlang_coder_initiated_v1 from orchestration_store.
%%% Loads role spec, builds prompt, calls chat_to_llm, parses notation,
%%% then dispatches complete or fail command.
-module(on_erlang_coder_initiated_run_erlang_coder_llm).
-behaviour(evoq_event_handler).
-export([interested_in/0, init/1, handle_event/4]).

-define(ROLE, <<"erlang_coder">>).

interested_in() -> [<<"erlang_coder_initiated_v1">>].

init(_Config) -> {ok, #{}}.

handle_event(_EventType, Event, _Metadata, State) ->
    Data = maps:get(data, Event),
    SessionId = gv(session_id, Data),
    VentureId = gv(venture_id, Data),
    Model = gv(model, Data),
    InputContext = gv(input_context, Data),
    RepoPath = lookup_repo_path(VentureId),
    spawn_link(fun() -> run_llm(SessionId, VentureId, Model, InputContext, RepoPath) end),
    {ok, State}.

%% Internal

run_llm(SessionId, VentureId, Model, InputContext, RepoPath) ->
    case load_agent_role:load(?ROLE) of
        {ok, RoleContent} ->
            {ok, KnowledgeCtx} = curate_context:curate(VentureId, ?ROLE, #{}),
            SystemPrompt = <<RoleContent/binary, KnowledgeCtx/binary>>,
            Messages = [
                #{role => <<"system">>, content => SystemPrompt},
                #{role => <<"user">>, content => ensure_binary(InputContext)}
            ],
            Opts = #{
                venture_id => VentureId,
                agent_id => SessionId
            },
            case chat_to_llm:chat(Model, Messages, Opts) of
                {ok, Response} ->
                    handle_llm_success(SessionId, Response, RepoPath);
                {error, Reason} ->
                    handle_llm_failure(SessionId, Reason)
            end;
        {error, Reason} ->
            handle_llm_failure(SessionId, {role_load_failed, Reason})
    end.

handle_llm_success(SessionId, Response, RepoPath) ->
    Content = extract_content(Response),
    TokensIn = extract_tokens_in(Response),
    TokensOut = extract_tokens_out(Response),
    {ParsedTerms, NotationOutput} = parse_notation(Content),
    run_codegen(SessionId, ParsedTerms, RepoPath),
    CmdParams = #{
        session_id => SessionId,
        notation_output => NotationOutput,
        parsed_terms => ParsedTerms,
        tokens_in => TokensIn,
        tokens_out => TokensOut
    },
    case complete_erlang_coder_v1:new(CmdParams) of
        {ok, Cmd} ->
            case maybe_complete_erlang_coder:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:info("[~s] completed erlang_coder session ~s", [?MODULE, SessionId]);
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
    case fail_erlang_coder_v1:new(CmdParams) of
        {ok, Cmd} ->
            case maybe_fail_erlang_coder:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:warning("[~s] erlang_coder session ~s failed: ~s",
                                  [?MODULE, SessionId, ErrorBin]);
                {error, DispErr} ->
                    logger:error("[~s] failed to dispatch fail for ~s: ~p",
                               [?MODULE, SessionId, DispErr])
            end;
        {error, CmdErr} ->
            logger:error("[~s] failed to create fail command for ~s: ~p",
                        [?MODULE, SessionId, CmdErr])
    end.

run_codegen(_SessionId, [], _RepoPath) ->
    ok;
run_codegen(_SessionId, _ParsedTerms, undefined) ->
    logger:info("[~s] skipping codegen: no repo_path for venture", [?MODULE]);
run_codegen(SessionId, ParsedTerms, RepoPath) ->
    try
        case martha_codegen_bridge:scaffold(ParsedTerms, RepoPath) of
            {ok, []} ->
                logger:info("[~s] codegen: no scaffoldable terms in session ~s",
                           [?MODULE, SessionId]);
            {ok, Files} ->
                logger:info("[~s] codegen: scaffolded ~b files for session ~s",
                           [?MODULE, length(Files), SessionId])
        end
    catch Class:Reason:Stack ->
        logger:warning("[~s] codegen failed for session ~s: ~p:~p~n~p",
                      [?MODULE, SessionId, Class, Reason, Stack])
    end.

lookup_repo_path(VentureId) ->
    try
        case project_ventures_store:get_venture(VentureId) of
            {ok, #{repo_path := Path}} when is_binary(Path) -> Path;
            _ -> undefined
        end
    catch _:_ ->
        undefined
    end.

extract_content(#{message := #{content := C}}) -> C;
extract_content(#{content := [#{text := T} | _]}) -> T;
extract_content(#{content := C}) when is_binary(C) -> C;
extract_content(_) -> <<>>.

extract_tokens_in(#{usage := #{input_tokens := N}}) -> N;
extract_tokens_in(#{prompt_eval_count := N}) -> N;
extract_tokens_in(_) -> 0.

extract_tokens_out(#{usage := #{output_tokens := N}}) -> N;
extract_tokens_out(#{eval_count := N}) -> N;
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

gv(Key, Map) when is_atom(Key) ->
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error -> maps:get(atom_to_binary(Key), Map, undefined)
    end.
