%%% @doc maybe_initiate_reviewer handler.
%%% Validates command and produces reviewer_initiated_v1 event.
%%% Resolves tier to model via agent_tier_resolver.
-module(maybe_initiate_reviewer).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(initiate_reviewer_v1:initiate_reviewer_v1()) ->
    {ok, [reviewer_initiated_v1:reviewer_initiated_v1()]} | {error, term()}.
handle(Cmd) ->
    case initiate_reviewer_v1:validate(Cmd) of
        ok ->
            Tier = initiate_reviewer_v1:get_tier(Cmd),
            Model = resolve_model(Tier),
            Event = reviewer_initiated_v1:new(#{
                session_id => initiate_reviewer_v1:get_session_id(Cmd),
                venture_id => initiate_reviewer_v1:get_venture_id(Cmd),
                tier => Tier,
                model => Model,
                input_context => initiate_reviewer_v1:get_input_context(Cmd),
                initiated_by => initiate_reviewer_v1:get_initiated_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(initiate_reviewer_v1:initiate_reviewer_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    SessionId = initiate_reviewer_v1:get_session_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = initiate_reviewer,
        aggregate_type = agent_orchestration_aggregate,
        aggregate_id = SessionId,
        payload = initiate_reviewer_v1:to_map(Cmd),
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
        {error, _} -> error({no_llm_model_for_tier, Tier})
    end.
