%%% @doc Converts parsed Martha notation into kanban card commands.
%%%
%%% Takes the output of martha_notation:parse/1 and extracts DESK
%%% definitions, converting each into a post_kanban_card_v1 command
%%% payload. This allows the Coordinator to populate the kanban board
%%% from agent output without any LLM calls (zero tokens).
%%% @end
-module(martha_notation_kanban).

-export([desks_to_cards/2, apps_to_cards/2, extract_desks/1, extract_apps/1]).

%% @doc Convert all DESK terms from parsed notation into kanban card payloads.
%% Each desk becomes one cmd_desk kanban card.
-spec desks_to_cards(DivisionId :: binary(), [martha_notation:parsed_term()]) ->
    [map()].
desks_to_cards(DivisionId, ParsedTerms) ->
    Desks = extract_desks(ParsedTerms),
    [desk_to_card(DivisionId, D) || D <- Desks].

%% @doc Convert APP terms into kanban cards for PRJ/QRY scaffolding.
%% CMD desks come from DESK lines. PRJ/QRY apps get one card each.
-spec apps_to_cards(DivisionId :: binary(), [martha_notation:parsed_term()]) ->
    [map()].
apps_to_cards(DivisionId, ParsedTerms) ->
    Apps = extract_apps(ParsedTerms),
    lists:filtermap(fun(App) -> app_to_card(DivisionId, App) end, Apps).

%% @doc Extract all desk definitions from parsed terms.
-spec extract_desks([martha_notation:parsed_term()]) ->
    [{binary(), binary(), [binary()]}].
extract_desks(ParsedTerms) ->
    lists:foldl(fun extract_desks_from_term/2, [], ParsedTerms).

%% @doc Extract all app definitions from parsed terms.
-spec extract_apps([martha_notation:parsed_term()]) ->
    [{binary(), cmd | prj | qry, map()}].
extract_apps(ParsedTerms) ->
    [{Name, Dept, Details} || {app, Name, Dept, Details} <- ParsedTerms].

%%====================================================================
%% Internal
%%====================================================================

extract_desks_from_term({agg, _Name, _Stream, #{desks := Desks}}, Acc) ->
    Extracted = [{DeskName, Event, Fields} || {desk, DeskName, Event, Fields} <- Desks],
    Acc ++ Extracted;
extract_desks_from_term(_, Acc) ->
    Acc.

desk_to_card(DivisionId, {DeskName, EventName, Fields}) ->
    #{
        division_id => DivisionId,
        card_type => <<"cmd_desk">>,
        title => DeskName,
        description => iolist_to_binary([
            DeskName, <<" -> ">>, EventName,
            <<" [">>, lists:join(<<" ">>, Fields), <<"]">>
        ])
    }.

app_to_card(DivisionId, {Name, prj, _Details}) ->
    {true, #{
        division_id => DivisionId,
        card_type => <<"prj_desk">>,
        title => Name,
        description => iolist_to_binary([<<"PRJ app scaffold: ">>, Name])
    }};
app_to_card(DivisionId, {Name, qry, _Details}) ->
    {true, #{
        division_id => DivisionId,
        card_type => <<"qry_desk">>,
        title => Name,
        description => iolist_to_binary([<<"QRY app scaffold: ">>, Name])
    }};
app_to_card(_DivisionId, {_Name, cmd, _Details}) ->
    false.  %% CMD desks come from DESK lines, not APP lines
