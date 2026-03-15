#!/bin/bash
# Remove all dependency beams/apps from the plugin ebin directory,
# keeping only Martha's own domain app files.
set -euo pipefail

BUILD_DIR="$(cd "$(dirname "$0")/../hecate-app-marthad/_build/default/lib" && pwd)"
PLUGIN_EBIN="$HOME/.hecate-dev/hecate-daemon/plugins/hecate-app-martha/ebin"

MARTHA_APPS=(
    martha
    hecate_app_marthad
    guide_venture_lifecycle
    guide_division_lifecycle
    guide_knowledge_graph
    guide_retry_strategy
    guard_cost_budget
    orchestrate_agents
    project_ventures
    project_divisions
    project_agent_sessions
    project_knowledge_graph
    project_cost_budgets
    project_retry_strategy
    query_ventures
    query_divisions
    query_agent_sessions
    query_knowledge_graph
    query_cost_budgets
    query_retry_strategy
)

# Build allowlist of Martha's own files
ALLOW_FILE=$(mktemp)
for app in "${MARTHA_APPS[@]}"; do
    src="$BUILD_DIR/$app/ebin"
    if [ -d "$src" ]; then
        for f in "$src"/*.beam "$src"/*.app; do
            [ -f "$f" ] && basename "$f" >> "$ALLOW_FILE"
        done
    fi
done

# Also keep manifest.json if present
echo "manifest.json" >> "$ALLOW_FILE"

# Remove files not in allowlist
REMOVED=0
for f in "$PLUGIN_EBIN"/*.beam "$PLUGIN_EBIN"/*.app; do
    [ -f "$f" ] || continue
    base=$(basename "$f")
    if ! grep -qFx "$base" "$ALLOW_FILE"; then
        rm "$f"
        REMOVED=$((REMOVED + 1))
    fi
done

rm "$ALLOW_FILE"
REMAINING=$(find "$PLUGIN_EBIN" -name '*.beam' -o -name '*.app' | wc -l)
echo "Removed $REMOVED dependency files"
echo "Remaining: $REMAINING Martha files"
