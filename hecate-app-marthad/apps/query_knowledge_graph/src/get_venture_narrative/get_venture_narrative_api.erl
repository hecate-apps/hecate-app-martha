%%% @doc GET /api/knowledge-graph/:venture_id/narrative
%%% Synthesizes venture status into a human-readable markdown narrative.
%%% Template-based — no LLM needed.
-module(get_venture_narrative_api).
-behaviour(cowboy_handler).
-export([init/2, routes/0]).

routes() ->
    [{"/api/knowledge-graph/:venture_id/narrative", ?MODULE, []}].

init(Req0, State) ->
    case cowboy_req:method(Req0) of
        <<"GET">> -> handle_get(Req0, State);
        _ -> hecate_plugin_api:method_not_allowed(Req0)
    end.

handle_get(Req0, State) ->
    VentureId = cowboy_req:binding(venture_id, Req0),
    case project_knowledge_graph_store:get_graph(VentureId) of
        {ok, Graph} ->
            Narrative = build_narrative(VentureId, Graph),
            Resp = hecate_plugin_api:json_ok(#{
                venture_id => VentureId,
                narrative => Narrative
            }, Req0),
            {ok, Resp, State};
        {error, not_found} ->
            Resp = hecate_plugin_api:json_error(404, <<"Venture not found">>, Req0),
            {ok, Resp, State}
    end.

%% --- Internal ---

build_narrative(VentureId, Graph) ->
    Entities = get_entities(Graph),
    Insights = get_active_insights(Graph),
    Relationships = get_relationships(Graph),
    Warnings = [I || I <- Insights,
                     gv(<<"insight_type">>, I) =:= <<"quality_warning">>],
    GateDecisions = [I || I <- Insights,
                          lists:member(gv(<<"insight_type">>, I),
                                       [<<"gate_decision">>, <<"gate_rejection">>])],
    OtherInsights = [I || I <- Insights,
                          not lists:member(gv(<<"insight_type">>, I),
                                           [<<"quality_warning">>, <<"gate_decision">>,
                                            <<"gate_rejection">>])],

    Parts = [
        <<"# Venture Progress: ">>, VentureId, <<"\n\n">>,
        format_summary(Entities, Insights, Relationships),
        format_gate_history(GateDecisions),
        format_warnings(Warnings),
        format_key_insights(OtherInsights),
        format_entity_summary(Entities)
    ],
    iolist_to_binary(Parts).

format_summary(Entities, Insights, Relationships) ->
    iolist_to_binary([
        <<"## Summary\n\n">>,
        <<"- **Entities discovered:** ">>, integer_to_binary(length(Entities)), <<"\n">>,
        <<"- **Insights captured:** ">>, integer_to_binary(length(Insights)), <<"\n">>,
        <<"- **Relationships mapped:** ">>, integer_to_binary(length(Relationships)), <<"\n\n">>
    ]).

format_gate_history([]) ->
    <<>>;
format_gate_history(Decisions) ->
    Header = <<"## Gate History\n\n">>,
    Lines = [format_gate_decision(D) || D <- lists:sublist(Decisions, 10)],
    iolist_to_binary([Header | Lines] ++ [<<"\n">>]).

format_gate_decision(Decision) ->
    Content = gv(<<"content">>, Decision, <<>>),
    Source = gv(<<"source_agent">>, Decision, <<"unknown">>),
    iolist_to_binary([<<"- [">>, Source, <<"] ">>, truncate_line(Content, 120), <<"\n">>]).

format_warnings([]) ->
    <<>>;
format_warnings(Warnings) ->
    Header = <<"## Active Warnings\n\n">>,
    Lines = [iolist_to_binary([<<"- ">>, truncate_line(gv(<<"content">>, W, <<>>), 150), <<"\n">>])
             || W <- lists:sublist(Warnings, 10)],
    iolist_to_binary([Header | Lines] ++ [<<"\n">>]).

format_key_insights([]) ->
    <<>>;
format_key_insights(Insights) ->
    Header = <<"## Key Insights\n\n">>,
    Lines = [format_insight(I) || I <- lists:sublist(Insights, 15)],
    iolist_to_binary([Header | Lines] ++ [<<"\n">>]).

format_insight(Insight) ->
    Content = gv(<<"content">>, Insight, <<>>),
    Type = gv(<<"insight_type">>, Insight, <<"general">>),
    Source = gv(<<"source_agent">>, Insight, <<"unknown">>),
    iolist_to_binary([<<"- [">>, Type, <<"/">>, Source, <<"] ">>,
                      truncate_line(Content, 120), <<"\n">>]).

format_entity_summary([]) ->
    <<>>;
format_entity_summary(Entities) ->
    %% Group entities by type
    TypeGroups = lists:foldl(fun(E, Acc) ->
        Type = gv(<<"type">>, E, <<"unknown">>),
        maps:update_with(Type, fun(L) -> [E | L] end, [E], Acc)
    end, #{}, Entities),
    Header = <<"## Entity Map\n\n">>,
    Lines = maps:fold(fun(Type, Es, Acc) ->
        Names = [gv(<<"name">>, E, <<>>) || E <- Es],
        NameStr = join_names(lists:sublist(Names, 8)),
        [iolist_to_binary([<<"- **">>, Type, <<"** (">>,
                           integer_to_binary(length(Es)), <<"): ">>,
                           NameStr, <<"\n">>]) | Acc]
    end, [], TypeGroups),
    iolist_to_binary([Header | lists:sort(Lines)] ++ [<<"\n">>]).

%% --- Helpers ---

get_entities(#{entities := E}) when is_map(E) -> maps:values(E);
get_entities(#{<<"entities">> := E}) when is_map(E) -> maps:values(E);
get_entities(_) -> [].

get_active_insights(#{insights := I}) when is_list(I) ->
    [X || X <- I, not is_superseded(X)];
get_active_insights(#{<<"insights">> := I}) when is_list(I) ->
    [X || X <- I, not is_superseded(X)];
get_active_insights(_) -> [].

get_relationships(#{relationships := R}) when is_map(R) -> maps:values(R);
get_relationships(#{<<"relationships">> := R}) when is_map(R) -> maps:values(R);
get_relationships(_) -> [].

is_superseded(#{superseded := true}) -> true;
is_superseded(#{<<"superseded">> := true}) -> true;
is_superseded(_) -> false.

gv(Key, Map) -> gv(Key, Map, undefined).
gv(Key, Map, Default) when is_binary(Key) ->
    maps:get(Key, Map, maps:get(binary_to_atom(Key), Map, Default)).

truncate_line(Bin, Max) when byte_size(Bin) =< Max -> Bin;
truncate_line(Bin, Max) ->
    <<(binary:part(Bin, 0, Max))/binary, "...">>.

join_names([]) -> <<>>;
join_names([H]) -> H;
join_names([H | T]) ->
    lists:foldl(fun(N, Acc) -> <<Acc/binary, ", ", N/binary>> end, H, T).
