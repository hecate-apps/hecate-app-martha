#!/bin/bash
# Sync Martha plugin beams to the hecate-dev plugin directory.
# Only copies Martha's OWN domain app beams, NOT dependency beams.
set -euo pipefail

BUILD_DIR="$(dirname "$0")/../hecate-app-marthad/_build/default/lib"
PLUGIN_EBIN="$HOME/.hecate-dev/hecate-daemon/plugins/hecate-app-martha/ebin"

# Martha's own OTP apps (from apps/ + root app)
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

echo "Syncing Martha beams to $PLUGIN_EBIN"

for app in "${MARTHA_APPS[@]}"; do
    src="$BUILD_DIR/$app/ebin"
    if [ -d "$src" ]; then
        cp "$src"/*.beam "$PLUGIN_EBIN/" 2>/dev/null || true
        cp "$src"/*.app "$PLUGIN_EBIN/" 2>/dev/null || true
        echo "  ✓ $app"
    else
        echo "  ✗ $app (not found)"
    fi
done

echo "Done."
