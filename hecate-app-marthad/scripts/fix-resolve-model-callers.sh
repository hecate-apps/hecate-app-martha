#!/usr/bin/env bash
## Replace hardcoded fallback in resolve_model/1 across all maybe_initiate_* handlers.
## Old pattern:
##   resolve_model(Tier) ->
##       case resolve_llm_model:resolve(Tier) of
##           {ok, Model} -> Model;
##           {error, _} -> <<"claude-sonnet-4-20250514">>
##       end.
##
## New pattern:
##   resolve_model(Tier) ->
##       case resolve_llm_model:resolve(Tier) of
##           {ok, Model} -> Model;
##           {error, _} -> error({no_llm_model_for_tier, Tier})
##       end.

set -euo pipefail

BASE="apps/orchestrate_agents/src"
COUNT=0

for f in $(grep -rl 'resolve_llm_model:resolve' "$BASE" | grep 'maybe_initiate_'); do
    sed -i 's/{error, _} -> <<"claude-sonnet-4-20250514">>/{error, _} -> error({no_llm_model_for_tier, Tier})/' "$f"
    COUNT=$((COUNT + 1))
    echo "Fixed: $f"
done

echo "Updated $COUNT files."
