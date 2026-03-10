#!/usr/bin/env bash
set -euo pipefail

# Bump version across all Martha artifacts:
#   - manifest.json
#   - hecate-app-marthad/src/hecate_app_marthad.app.src
#   - hecate-app-marthad/src/app_martha.erl (manifest/0)
#   - hecate-app-marthad/rebar.config (relx release)
#   - hecate-app-marthaw/package.json

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

if [[ $# -ne 1 ]]; then
    echo "Usage: $0 <new-version>"
    echo "Example: $0 0.2.0"
    exit 1
fi

NEW_VERSION="$1"

# Validate semver format
if ! [[ "$NEW_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be semver (X.Y.Z), got: $NEW_VERSION"
    exit 1
fi

echo "Bumping to version $NEW_VERSION"

# 1. manifest.json
MANIFEST="$REPO_ROOT/manifest.json"
sed -i "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" "$MANIFEST"
echo "  Updated $MANIFEST"

# 2. app.src — {vsn, "X.Y.Z"}
APP_SRC="$REPO_ROOT/hecate-app-marthad/src/hecate_app_marthad.app.src"
sed -i "s/{vsn, \"[0-9]*\.[0-9]*\.[0-9]*\"}/{vsn, \"$NEW_VERSION\"}/" "$APP_SRC"
echo "  Updated $APP_SRC"

# 3. app_martha.erl — version => <<"X.Y.Z">>
APP_MARTHA="$REPO_ROOT/hecate-app-marthad/src/app_martha.erl"
sed -i "s/version => <<\"[0-9]*\.[0-9]*\.[0-9]*\">>/version => <<\"$NEW_VERSION\">>/" "$APP_MARTHA"
echo "  Updated $APP_MARTHA"

# 4. rebar.config — {release, {hecate_app_marthad, "X.Y.Z"}
REBAR_CONFIG="$REPO_ROOT/hecate-app-marthad/rebar.config"
sed -i "s/{release, {hecate_app_marthad, \"[0-9]*\.[0-9]*\.[0-9]*\"}/{release, {hecate_app_marthad, \"$NEW_VERSION\"}/" "$REBAR_CONFIG"
echo "  Updated $REBAR_CONFIG"

# 5. package.json — "version": "X.Y.Z"
PACKAGE_JSON="$REPO_ROOT/hecate-app-marthaw/package.json"
sed -i "s/\"version\": \"[0-9]*\.[0-9]*\.[0-9]*\"/\"version\": \"$NEW_VERSION\"/" "$PACKAGE_JSON"
echo "  Updated $PACKAGE_JSON"

echo ""
echo "Version bumped to $NEW_VERSION in all artifacts."
echo "Next steps:"
echo "  1. Update CHANGELOG.md"
echo "  2. git add -A && git commit -m 'chore: Release v$NEW_VERSION'"
echo "  3. git tag v$NEW_VERSION"
echo "  4. git push && git push --tags"
