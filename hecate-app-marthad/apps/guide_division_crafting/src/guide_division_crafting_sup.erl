%%% @doc guide_division_crafting top-level supervisor
%%%
%%% Supervises all emitters for division crafting events:
%%% - PG emitters: subscribe to evoq, broadcast to pg groups (internal)
%%% - Mesh emitters: subscribe to evoq, publish to mesh (external)
%%% - Process managers: cross-domain integration
%%% @end
-module(guide_division_crafting_sup).
-behaviour(supervisor).

-export([start_link/0]).
-export([init/1]).

-spec start_link() -> {ok, pid()} | {error, term()}.
start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

-spec init([]) -> {ok, {supervisor:sup_flags(), [supervisor:child_spec()]}}.
init([]) ->
    SupFlags = #{
        strategy => one_for_one,
        intensity => 10,
        period => 10
    },

    Children = [
        %% ── PG emitters (internal, subscribe via evoq -> broadcast to pg) ────

        %% Lifecycle
        #{id => crafting_initiated_v1_to_pg,
          start => {crafting_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => crafting_archived_v1_to_pg,
          start => {crafting_archived_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => crafting_opened_v1_to_pg,
          start => {crafting_opened_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => crafting_shelved_v1_to_pg,
          start => {crafting_shelved_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => crafting_resumed_v1_to_pg,
          start => {crafting_resumed_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => crafting_concluded_v1_to_pg,
          start => {crafting_concluded_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% Domain
        #{id => module_generated_v1_to_pg,
          start => {module_generated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => test_generated_v1_to_pg,
          start => {test_generated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => test_suite_run_v1_to_pg,
          start => {test_suite_run_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => test_result_recorded_v1_to_pg,
          start => {test_result_recorded_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => release_delivered_v1_to_pg,
          start => {release_delivered_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => delivery_staged_v1_to_pg,
          start => {delivery_staged_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% ── Mesh emitters (external, subscribe via evoq -> publish to mesh) ──

        #{id => crafting_initiated_v1_to_mesh,
          start => {crafting_initiated_v1_to_mesh, start_link, []},
          restart => permanent, type => worker},

        %% ── Process managers ─────────────────────────────────────────────────

        #{id => on_planning_concluded_initiate_crafting,
          start => {on_planning_concluded_initiate_crafting, start_link, []},
          restart => permanent, type => worker}
    ],

    {ok, {SupFlags, Children}}.
