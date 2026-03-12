%%% @doc maybe_initiate_explorer handler.
%%% Validates command and produces explorer_initiated_v1 event.
%%% Resolves tier to model via agent_tier_resolver.
-module(maybe_initiate_explorer).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(initiate_explorer_v1:initiate_explorer_v1()) ->
    {ok, [explorer_initiated_v1:explorer_initiated_v1()]} | {error, term()}.
handle(Cmd) ->
    case initiate_explorer_v1:validate(Cmd) of
        ok ->
            Tier = initiate_explorer_v1:get_tier(Cmd),
            Model = resolve_model(Tier),
            Event = explorer_initiated_v1:new(#{
                session_id => initiate_explorer_v1:get_session_id(Cmd),
                venture_id => initiate_explorer_v1:get_venture_id(Cmd),
                tier => Tier,
                model => Model,
                input_context => initiate_explorer_v1:get_input_context(Cmd),
                initiated_by => initiate_explorer_v1:get_initiated_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(initiate_explorer_v1:initiate_explorer_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = initiate_explorer_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = initiate_explorer,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = initiate_explorer_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => agent_orchestration_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },

    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },

    evoq_dispatcher:dispatch(EvoqCmd, Opts).

%% Internal
resolve_model(Tier) ->
    case resolve_llm_model:resolve(Tier) of
        {ok, Model} -> Model;
        {error, _} -> <<"claude-sonnet-4-20250514">>
    end.
