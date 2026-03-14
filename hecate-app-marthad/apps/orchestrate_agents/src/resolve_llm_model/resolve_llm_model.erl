%%% @doc Resolves agent tier labels (T1/T2/T3) to LLM models
%%% via the SDK's capability-based selection.
%%%
%%% Tier mapping:
%%%   T1 (highest) -> smart  (e.g. Opus, o3, large local)
%%%   T2 (default) -> balanced (e.g. Sonnet, GPT-4o, medium local)
%%%   T3 (economy) -> fast   (e.g. Haiku, GPT-4o-mini, small local)
-module(resolve_llm_model).

-export([resolve/1]).

-spec resolve(binary()) -> {ok, binary()} | {error, term()}.
resolve(Tier) when is_binary(Tier) ->
    hecate_plugin_llm:select_model(#{capability => tier_to_capability(Tier)}).

%% Internal

tier_to_capability(<<"T1">>) -> smart;
tier_to_capability(<<"T2">>) -> balanced;
tier_to_capability(<<"T3">>) -> fast;
tier_to_capability(_)        -> balanced.
