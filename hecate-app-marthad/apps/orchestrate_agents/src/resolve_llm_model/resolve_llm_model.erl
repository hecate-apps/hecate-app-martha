%%% @doc Resolves agent tier labels (T1/T2/T3) to LLM model names.
%%% Configuration via app env {orchestrate_agents, tier_mapping}.
-module(resolve_llm_model).

-export([resolve/1]).

-spec resolve(binary()) -> {ok, binary()} | {error, unknown_tier}.
resolve(Tier) when is_binary(Tier) ->
    Mapping = mapping(),
    case maps:find(Tier, Mapping) of
        {ok, Model} -> {ok, Model};
        error -> {error, unknown_tier}
    end.

%% Internal

mapping() ->
    case application:get_env(orchestrate_agents, tier_mapping) of
        {ok, M} when is_map(M) -> M;
        _ -> default_mapping()
    end.

default_mapping() ->
    #{<<"T1">> => <<"claude-sonnet-4-20250514">>,
      <<"T2">> => <<"claude-sonnet-4-20250514">>,
      <<"T3">> => <<"claude-haiku-3-20250514">>}.
