#!/usr/bin/env bash
set -euo pipefail

# Build hecate-app-marthaw and copy dist/ into marthad's priv/static/
# For local dev — the release workflow handles this automatically
#
# Usage: ./scripts/sync-frontend.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$REPO_ROOT/hecate-app-marthaw"
PRIV_STATIC="$REPO_ROOT/hecate-app-marthad/priv/static"

echo "Building frontend..."
(cd "$FRONTEND_DIR" && npm run build:lib)

echo "Copying dist/ -> $PRIV_STATIC/"
mkdir -p "$PRIV_STATIC"
cp -r "$FRONTEND_DIR/dist/"* "$PRIV_STATIC/"

echo "Done."
