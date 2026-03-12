%%% @doc Parser for Martha inter-agent notation.
%%%
%%% Parses the line-oriented structured notation used by agents
%%% to communicate pipeline specifications. Each line starts with
%%% an uppercase keyword. Indentation indicates nesting.
%%%
%%% Returns a list of parsed terms that downstream modules
%%% (e.g., martha_notation_kanban) can consume without LLM calls.
%%% @end
-module(martha_notation).

-export([parse/1, parse_lines/1]).

-type parsed_term() ::
    {division, Name :: binary(), Desc :: binary()} |
    {division_owns, [binary()]} |
    {division_publishes, Fact :: binary()} |
    {division_consumes, Fact :: binary(), From :: binary()} |
    {agg, Name :: binary(), Stream :: binary(), Details :: map()} |
    {app, Name :: binary(), Dept :: cmd | prj | qry, Details :: map()} |
    {phase, Code :: binary(), map()} |
    {item, Id :: binary(), map()} |
    {flag, Agent :: binary(), Severity :: binary(), Msg :: binary()} |
    {amend, File :: binary(), Op :: add | remove, Rule :: binary()} |
    {gate, Name :: binary(), Verdict :: pass | fail, Reason :: binary()} |
    {cost, Agent :: binary(), Tokens :: binary(), Amount :: binary()} |
    {total, Tokens :: binary(), Amount :: binary()} |
    {status, Div :: binary(), Agent :: binary(), Msg :: binary()}.

-export_type([parsed_term/0]).

%% @doc Parse a notation binary into structured terms.
-spec parse(binary()) -> {ok, [parsed_term()]} | {error, term()}.
parse(Binary) when is_binary(Binary) ->
    Lines = binary:split(Binary, <<"\n">>, [global]),
    parse_lines(Lines).

%% @doc Parse a list of notation lines into structured terms.
-spec parse_lines([binary()]) -> {ok, [parsed_term()]} | {error, term()}.
parse_lines(Lines) ->
    {Terms, _Ctx} = lists:foldl(fun parse_fold/2, {[], #{}}, Lines),
    {ok, lists:reverse(Terms)}.

%%====================================================================
%% Internal — line dispatcher
%%====================================================================

parse_fold(Line, {Acc, Ctx}) ->
    Trimmed = string:trim(Line),
    case Trimmed of
        <<>> -> {Acc, Ctx};
        <<"#", _/binary>> -> {Acc, Ctx};  %% comment
        _ -> dispatch(Trimmed, Line, Acc, Ctx)
    end.

dispatch(Trimmed, _Raw, Acc, Ctx) ->
    case Trimmed of
        <<"DIV ", Rest/binary>> -> parse_div(Rest, Acc, Ctx);
        <<"OWNS ", Rest/binary>> -> parse_owns(Rest, Acc, Ctx);
        <<"PUBLISHES ", Rest/binary>> -> parse_publishes(Rest, Acc, Ctx);
        <<"CONSUMES ", Rest/binary>> -> parse_consumes(Rest, Acc, Ctx);
        <<"AGG ", Rest/binary>> -> parse_agg(Rest, Acc, Ctx);
        <<"DESK ", Rest/binary>> -> parse_desk(Rest, Acc, Ctx);
        <<"FLAGS ", Rest/binary>> -> parse_flags(Rest, Acc, Ctx);
        <<"WALK ", Rest/binary>> -> parse_walk(Rest, Acc, Ctx);
        <<"PM ", Rest/binary>> -> parse_pm(Rest, Acc, Ctx);
        <<"APP ", Rest/binary>> -> parse_app(Rest, Acc, Ctx);
        <<"SUP ", Rest/binary>> -> parse_sup(Rest, Acc, Ctx);
        <<"EMIT ", Rest/binary>> -> parse_emit(Rest, Acc, Ctx);
        <<"STORE ", Rest/binary>> -> parse_store(Rest, Acc, Ctx);
        <<"TABLE ", Rest/binary>> -> parse_table(Rest, Acc, Ctx);
        <<"PROJ ", Rest/binary>> -> parse_proj(Rest, Acc, Ctx);
        <<"QUERY ", Rest/binary>> -> parse_query(Rest, Acc, Ctx);
        <<"PHASE ", Rest/binary>> -> parse_phase(Rest, Acc, Ctx);
        <<"ITEM ", Rest/binary>> -> parse_item(Rest, Acc, Ctx);
        <<"FLAG ", Rest/binary>> -> parse_flag(Rest, Acc, Ctx);
        <<"AMEND ", Rest/binary>> -> parse_amend(Rest, Acc, Ctx);
        <<"GATE ", Rest/binary>> -> parse_gate(Rest, Acc, Ctx);
        <<"COST ", Rest/binary>> -> parse_cost(Rest, Acc, Ctx);
        <<"TOTAL ", Rest/binary>> -> parse_total(Rest, Acc, Ctx);
        <<"STATUS ", Rest/binary>> -> parse_status(Rest, Acc, Ctx);
        _ -> {Acc, Ctx}  %% skip unknown lines
    end.

%%====================================================================
%% Internal — parsers per keyword
%%====================================================================

%% DIV billing "Invoice and payment processing"
parse_div(Rest, Acc, Ctx) ->
    {Name, Desc} = split_name_desc(Rest),
    Ctx2 = Ctx#{current_div => Name},
    {[{division, Name, Desc} | Acc], Ctx2}.

%% OWNS invoice payment account_receivable
parse_owns(Rest, Acc, Ctx) ->
    Concepts = split_words(Rest),
    {[{division_owns, Concepts} | Acc], Ctx}.

%% PUBLISHES invoice_paid_fact
parse_publishes(Rest, Acc, Ctx) ->
    Facts = split_words(Rest),
    Terms = [{division_publishes, F} || F <- Facts],
    {Terms ++ Acc, Ctx}.

%% CONSUMES customer_registered_fact FROM auth
parse_consumes(Rest, Acc, Ctx) ->
    case binary:split(Rest, <<" FROM ">>) of
        [Fact, From] -> {[{division_consumes, string:trim(Fact), string:trim(From)} | Acc], Ctx};
        [Fact] -> {[{division_consumes, string:trim(Fact), <<>>} | Acc], Ctx}
    end.

%% AGG invoice invoice-{invoice_id}
parse_agg(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Name, Stream | _] ->
            Ctx2 = Ctx#{current_agg => Name},
            {[{agg, Name, Stream, #{desks => [], flags => [], pms => []}} | Acc], Ctx2};
        [Name] ->
            Ctx2 = Ctx#{current_agg => Name},
            {[{agg, Name, <<>>, #{desks => [], flags => [], pms => []}} | Acc], Ctx2}
    end.

%% DESK issue_invoice -> invoice_issued_v1 [invoice_id venture_id ...]
parse_desk(Rest, Acc, Ctx) ->
    case binary:split(Rest, <<" -> ">>) of
        [DeskName, EventAndFields] ->
            {Event, Fields} = parse_event_fields(EventAndFields),
            Term = {desk, string:trim(DeskName), Event, Fields},
            {attach_to_agg(Term, Acc), Ctx};
        _ ->
            {Acc, Ctx}
    end.

%% FLAGS INITIATED=1 ARCHIVED=2 ISSUED=4
parse_flags(Rest, Acc, Ctx) ->
    Pairs = [parse_flag_pair(P) || P <- split_words(Rest)],
    Term = {flags, Pairs},
    {attach_to_agg(Term, Acc), Ctx}.

%% WALK initiate_invoice archive_invoice
parse_walk(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    Term = {walk, Words},
    {attach_to_agg(Term, Acc), Ctx}.

%% PM on_invoice_paid_notify_customer -> notifications
parse_pm(Rest, Acc, Ctx) ->
    case binary:split(Rest, <<" -> ">>) of
        [Name, Target] ->
            Term = {pm, string:trim(Name), string:trim(Target)},
            {attach_to_agg(Term, Acc), Ctx};
        [Name] ->
            Term = {pm, string:trim(Name), <<>>},
            {attach_to_agg(Term, Acc), Ctx}
    end.

%% APP guide_billing CMD
parse_app(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Name, DeptBin | _] ->
            Dept = parse_dept(DeptBin),
            Ctx2 = Ctx#{current_app => Name},
            {[{app, Name, Dept, #{}} | Acc], Ctx2};
        _ ->
            {Acc, Ctx}
    end.

%% SUP guide_billing_sup one_for_one
parse_sup(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Name, Strategy | _] -> {[{sup, Name, Strategy} | Acc], Ctx};
        [Name] -> {[{sup, Name, <<"one_for_one">>} | Acc], Ctx};
        _ -> {Acc, Ctx}
    end.

%% EMIT invoice_issued_v1_to_pg
parse_emit(Rest, Acc, Ctx) ->
    {[{emit, string:trim(Rest)} | Acc], Ctx}.

%% STORE project_billings_store
parse_store(Rest, Acc, Ctx) ->
    {[{store, string:trim(Rest)} | Acc], Ctx}.

%% TABLE billings [division_id:pk venture_id:text status:int]
parse_table(Rest, Acc, Ctx) ->
    {Name, Fields} = parse_event_fields(Rest),
    {[{table, Name, Fields} | Acc], Ctx}.

%% PROJ invoice_issued_v1 -> invoices INSERT
parse_proj(Rest, Acc, Ctx) ->
    case binary:split(Rest, <<" -> ">>) of
        [Event, TableAndOp] ->
            Words = split_words(TableAndOp),
            Table = hd(Words),
            Op = case tl(Words) of
                [O | _] -> O;
                [] -> <<"INSERT">>
            end,
            {[{proj, string:trim(Event), Table, Op} | Acc], Ctx};
        _ ->
            {Acc, Ctx}
    end.

%% QUERY get_billing_by_id GET /api/billings/:division_id
parse_query(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Name, Method, Path | _] ->
            {[{query, Name, Method, Path} | Acc], Ctx};
        _ ->
            {Acc, Ctx}
    end.

%% PHASE planning STATUS=5 LABEL="Open" ACTIONS=[shelve conclude]
parse_phase(Rest, Acc, Ctx) ->
    Props = parse_props(Rest),
    Code = maps:get(<<"_name">>, Props, <<>>),
    {[{phase, Code, maps:remove(<<"_name">>, Props)} | Acc], Ctx}.

%% ITEM i-001 TYPE=cmd_desk STATUS=ready "issue_invoice"
parse_item(Rest, Acc, Ctx) ->
    Props = parse_props(Rest),
    Id = maps:get(<<"_name">>, Props, <<>>),
    {[{item, Id, maps:remove(<<"_name">>, Props)} | Acc], Ctx}.

%% FLAG stormer MAJOR "invoice_created is CRUD"
parse_flag(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Agent, Severity | MsgParts] ->
            Msg = unquote(iolist_to_binary(lists:join(<<" ">>, MsgParts))),
            {[{flag, Agent, Severity, Msg} | Acc], Ctx};
        _ ->
            {Acc, Ctx}
    end.

%% AMEND roles/stormer.md +"Financial events: issued, not created"
parse_amend(Rest, Acc, Ctx) ->
    case binary:split(Rest, <<" +">>) of
        [File, Rule] ->
            {[{amend, string:trim(File), add, unquote(string:trim(Rule))} | Acc], Ctx};
        _ ->
            case binary:split(Rest, <<" -">>) of
                [File, Rule] ->
                    {[{amend, string:trim(File), remove, unquote(string:trim(Rule))} | Acc], Ctx};
                _ ->
                    {Acc, Ctx}
            end
    end.

%% GATE boundary_gate PASS "5 divisions"
parse_gate(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Name, VerdictBin | ReasonParts] ->
            Verdict = case string:lowercase(VerdictBin) of
                <<"pass">> -> pass;
                <<"fail">> -> fail;
                _ -> unknown
            end,
            Reason = unquote(iolist_to_binary(lists:join(<<" ">>, ReasonParts))),
            {[{gate, Name, Verdict, Reason} | Acc], Ctx};
        _ ->
            {Acc, Ctx}
    end.

%% COST stormer 4.2K $0.03
parse_cost(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Agent, Tokens, Amount | _] ->
            {[{cost, Agent, Tokens, Amount} | Acc], Ctx};
        _ ->
            {Acc, Ctx}
    end.

%% TOTAL 38.2K $0.24
parse_total(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Tokens, Amount | _] ->
            {[{total, Tokens, Amount} | Acc], Ctx};
        _ ->
            {Acc, Ctx}
    end.

%% STATUS billing stormer COMPLETE
parse_status(Rest, Acc, Ctx) ->
    Words = split_words(Rest),
    case Words of
        [Div, Agent | MsgParts] ->
            Msg = iolist_to_binary(lists:join(<<" ">>, MsgParts)),
            {[{status, Div, Agent, Msg} | Acc], Ctx};
        _ ->
            {Acc, Ctx}
    end.

%%====================================================================
%% Internal — helpers
%%====================================================================

%% Split "billing" from "\"Invoice processing\"" in: billing "Invoice processing"
split_name_desc(Bin) ->
    case binary:split(Bin, <<" ">>) of
        [Name, Rest] -> {Name, unquote(Rest)};
        [Name] -> {Name, <<>>}
    end.

%% Split binary into words on whitespace, ignoring empties
split_words(Bin) ->
    [W || W <- binary:split(string:trim(Bin), <<" ">>, [global]), W =/= <<>>].

%% Parse "invoice_issued_v1 [invoice_id venture_id amount]"
parse_event_fields(Bin) ->
    case binary:split(Bin, <<"[">>) of
        [Before, FieldsBin] ->
            Event = string:trim(Before),
            Stripped = binary:replace(FieldsBin, <<"]">>, <<>>),
            Fields = split_words(Stripped),
            {Event, Fields};
        [Just] ->
            {string:trim(Just), []}
    end.

%% Parse "INITIATED=1" -> {<<"INITIATED">>, 1}
parse_flag_pair(Pair) ->
    case binary:split(Pair, <<"=">>) of
        [Name, ValBin] ->
            Val = try binary_to_integer(ValBin) catch _:_ -> ValBin end,
            {Name, Val};
        [Name] ->
            {Name, 0}
    end.

%% Parse CMD/PRJ/QRY atom
parse_dept(<<"CMD">>) -> cmd;
parse_dept(<<"PRJ">>) -> prj;
parse_dept(<<"QRY">>) -> qry;
parse_dept(Other) -> binary_to_atom(string:lowercase(Other)).

%% Parse key=value props from a line, first word is _name
parse_props(Bin) ->
    Words = split_words(Bin),
    case Words of
        [Name | Rest] ->
            Props = lists:foldl(fun parse_prop/2, #{}, Rest),
            Props#{<<"_name">> => Name};
        [] ->
            #{}
    end.

parse_prop(Word, Acc) ->
    case binary:split(Word, <<"=">>) of
        [Key, Val] -> Acc#{Key => unquote(Val)};
        _ -> Acc
    end.

%% Remove surrounding quotes
unquote(<<"\"", Rest/binary>>) ->
    case binary:last(Rest) of
        $" -> binary:part(Rest, 0, byte_size(Rest) - 1);
        _ -> Rest
    end;
unquote(Bin) -> Bin.

%% Attach a sub-term to the most recent {agg,...} in the accumulator
attach_to_agg(Term, [{agg, Name, Stream, Details} | Rest]) ->
    Details2 = case Term of
        {desk, _, _, _} ->
            Desks = maps:get(desks, Details, []),
            Details#{desks => Desks ++ [Term]};
        {flags, Pairs} ->
            Details#{flags => Pairs};
        {walk, Names} ->
            Details#{walk => Names};
        {pm, _, _} ->
            PMs = maps:get(pms, Details, []),
            Details#{pms => PMs ++ [Term]}
    end,
    [{agg, Name, Stream, Details2} | Rest];
attach_to_agg(_Term, Acc) ->
    %% No current aggregate — skip
    Acc.
