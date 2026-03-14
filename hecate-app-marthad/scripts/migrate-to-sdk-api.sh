#!/bin/bash
# Migrate all references from app_marthad_api_utils to hecate_plugin_api
set -euo pipefail

BASE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "Migrating app_marthad_api_utils -> hecate_plugin_api in ${BASE_DIR}"

# Find all .erl and .sh files referencing the old module
# Exclude the module itself (will be deleted) and this script
find "${BASE_DIR}" -type f \( -name '*.erl' -o -name '*.sh' \) \
    -not -name 'app_marthad_api_utils.erl' \
    -not -name 'migrate-to-sdk-api.sh' \
    -exec grep -l 'app_marthad_api_utils' {} \; | while read -r file; do
    echo "  updating: ${file#${BASE_DIR}/}"
    sed -i 's/app_marthad_api_utils/hecate_plugin_api/g' "${file}"
done

echo ""
echo "Done. Files updated:"
grep -rl 'hecate_plugin_api' "${BASE_DIR}" --include='*.erl' --include='*.sh' | wc -l
echo ""
echo "Remaining references to old module (should be 1 — the module file itself):"
grep -rl 'app_marthad_api_utils' "${BASE_DIR}" --include='*.erl' --include='*.sh' | cat
