# Changelog

## [0.2.0] - 2026-03-10

### Changed

- **ALC Restructure**: Replaced monolithic 4-app architecture with 9-app structure
  - Split `query_venture_lifecycle` into `project_ventures` (PRJ) + `query_ventures` (QRY)
  - Replaced `guide_division_alc` with `guide_division_planning` + `guide_division_crafting` (CMD)
  - Replaced `query_division_alc` with `project_division_plannings/craftings` (PRJ) + `query_division_plannings/craftings` (QRY)
- Each division lifecycle process (planning, crafting) now has its own dossier (aggregate), event stream, and CMD/PRJ/QRY app trio
- Process managers chain processes: `division_identified_v1` -> planning, `planning_concluded_v1` -> crafting
- Lifecycle protocol: `initiate/open/shelve/resume/conclude/archive` with bit flag status (1/2/4/8/16)
- Frontend reduced from 4 phases (DnA/AnP/TnI/DnO) to 2 phases (Planning/Crafting)
- Merged `DesignDivision` + `PlanDivision` into unified `PlanDivision` with Event Storm / Desk Inventory tabs
- Merged `CraftDivision` + `DeployDivision` into unified `CraftDivision` with Implementation / Delivery tabs
- Updated all API endpoints to `/api/plannings/` and `/api/craftings/` paths
- **In-VM Plugin**: Converted from container-based to in-VM plugin model
  - Added `app_martha.erl` implementing `hecate_plugin` behaviour with 6 callbacks
  - Added `app_martha_sup.erl` — top supervisor starting all 9 domain supervisors
  - `app_marthad_paths.erl` checks `persistent_term` first for in-VM data dir
  - `app_marthad_mesh_proxy.erl` uses `hecate_mesh:publish/2` directly when in-VM
  - Plugin distributed as tarball (ebin/ + priv/static/ + manifest.json)
  - Added `hecate_sdk` dependency
- CI/CD switched from OCI image build to plugin tarball build

### Removed

- `guide_division_alc` — replaced by `guide_division_planning` + `guide_division_crafting`
- `query_division_alc` — replaced by 4 new PRJ/QRY apps
- `query_venture_lifecycle` — replaced by `project_ventures` + `query_ventures`
- Frontend stubs: `debug_division/`, `monitor_division/`, `rescue_division/`, `refactor_division/`
- Frontend absorbed: `design_division/` (into `plan_division/`), `deploy_division/` (into `craft_division/`)
- Old phase codes: `dna`, `anp`, `tni`, `dno` — replaced by `planning`, `crafting`
- `hecate_app_marthad_sup.erl` — replaced by `app_martha_sup.erl`
- `app_marthad_health_api.erl` — daemon provides manifest automatically
- `app_marthad_manifest_api.erl` — same
- `app_marthad_plugin_registrar.erl` — not needed in-VM
- `docker.yml` workflow — no more OCI image builds
- Container-era scripts: `build-local.sh`, `deploy-quadlet.sh`, `decouple-daemon.sh`, `decouple-web.sh`, `add-mesh-bridge.sh`

## [0.1.0] - 2026-02-20

### Added

- Initial extraction from hecate-daemon and hecate-web as standalone plugin
- **hecate-app-marthad**: Erlang/OTP daemon with ReckonDB event store (`martha_store`)
  - `guide_venture_lifecycle` — Venture inception + discovery (CMD)
  - `query_venture_lifecycle` — Venture + division read models (QRY)
  - `guide_division_alc` — Division ALC phases: design, plan, generate, test, deploy, monitor, rescue (CMD)
  - `query_division_alc` — Division phase read models with 14 SQLite tables (QRY)
  - Health + manifest endpoints for plugin discovery
  - Auto-discovering API route handler
  - Mesh proxy via OTP pg process groups
  - Plugin registrar for hecate-daemon integration
- **hecate-app-marthaw**: SvelteKit frontend as ES module plugin
  - Vertical slice architecture by ALC task
  - 8 slice directories with stores and components
  - Decomposed god-store (devops.ts) into focused slice stores
  - Plugin API pattern (setApi/getApi) replacing Tauri invoke
  - AI assist integration with phase-aware model affinity
  - Big Picture Event Storming with full lifecycle
- **Build infrastructure**: 3-stage Dockerfile, GitHub Actions CI/CD, version bump script
