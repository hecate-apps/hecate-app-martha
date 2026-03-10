# hecate-app-martha

A Hecate Application for creating Hecate Applications in an AI-assisted manner.

## Architecture

Martha is an **in-VM** Hecate plugin with two components:

- **hecate-app-marthad** — Erlang/OTP backend (event-sourced CQRS, loaded into hecate-daemon's BEAM VM)
- **hecate-app-marthaw** — SvelteKit frontend (custom element, served as static assets)

### Plugin Entry Point

`app_martha.erl` implements `hecate_plugin` behaviour. The plugin loader calls `app_martha:init/1` which starts `app_martha_sup` supervising all 9 domain apps.

### 9-App Backend Structure

```
guide_venture_lifecycle     — Venture inception + discovery (CMD)
project_ventures            — Venture read models (PRJ)
query_ventures              — Venture queries (QRY)

guide_division_planning     — Planning dossier: design + plan (CMD)
project_division_plannings  — Planning read models (PRJ)
query_division_plannings    — Planning queries (QRY)

guide_division_crafting     — Crafting dossier: build + deliver (CMD)
project_division_craftings  — Crafting read models (PRJ)
query_division_craftings    — Crafting queries (QRY)
```

### Process Manager Chain

```
division_identified_v1  -->  initiate_planning_v1
planning_concluded_v1   -->  initiate_crafting_v1
```

### Lifecycle Protocol

Each dossier follows: `initiate -> open -> shelve/resume -> conclude -> archive`

## Development

```bash
# Daemon
cd hecate-app-marthad
rebar3 compile
rebar3 eunit

# Frontend
cd hecate-app-marthaw
npm install
npm run check
npm run build:lib

# Sync frontend into priv/static for local testing
./scripts/sync-frontend.sh

# Build plugin tarball
bash hecate-app-marthad/scripts/package.sh
```

## Release

```bash
./scripts/bump-version.sh 0.3.0
# Update CHANGELOG.md
git add -A && git commit -m 'chore: Release v0.3.0'
git tag v0.3.0
git push && git push --tags
# CI builds tarball and creates GitHub release
```
