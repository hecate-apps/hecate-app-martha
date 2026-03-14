%%% @doc Process Manager: llm_call_tracked_v1 -> record_spending_v1
%%%
%%% When an LLM call is tracked with cost data, record the spending
%%% against the venture's cost budget.
%%% @end
-module(on_llm_call_tracked_record_spending).
-behaviour(evoq_event_handler).
-export([interested_in/0, init/1, handle_event/4]).

interested_in() -> [<<"llm_call_tracked_v1">>].

init(_Config) -> {ok, #{}}.

handle_event(_EventType, Event, _Metadata, State) ->
    Data = maps:get(data, Event),
    VentureId = hecate_plugin_api:get_field(venture_id, Data),
    CostUsd = hecate_plugin_api:get_field(cost_usd, Data),
    Model = hecate_plugin_api:get_field(model, Data),
    CallId = hecate_plugin_api:get_field(call_id, Data),

    %% Only record if cost is positive and venture is set
    case is_binary(VentureId) andalso VentureId =/= <<>> andalso
         is_number(CostUsd) andalso CostUsd > 0 of
        true ->
            spawn_link(fun() -> dispatch_record_spending(VentureId, CostUsd, Model, CallId) end);
        false ->
            ok
    end,
    {ok, State}.

%% Internal

dispatch_record_spending(VentureId, CostUsd, Model, CallId) ->
    SessionId = case CallId of
        undefined -> <<>>;
        _ -> CallId
    end,
    case record_spending_v1:new(#{
        venture_id => VentureId,
        amount_usd => CostUsd,
        model => Model,
        session_id => SessionId
    }) of
        {ok, Cmd} ->
            case maybe_record_spending:dispatch(Cmd) of
                {ok, _, _} ->
                    logger:info("[PM] Recorded $~.4f spending for venture ~s (model: ~s)",
                                [CostUsd, VentureId, Model]);
                {error, budget_not_set} ->
                    %% No budget configured for this venture — silently skip
                    ok;
                {error, Reason} ->
                    logger:warning("[PM] Failed to record spending for venture ~s: ~p",
                                    [VentureId, Reason])
            end;
        {error, Reason} ->
            logger:error("[PM] Failed to create record_spending command: ~p", [Reason])
    end.
