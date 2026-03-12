%%% @doc orchestrate_agents top-level supervisor.
%%%
%%% Supervises per-role desk sups, archive desk, and team desks.
%%% Per-role sups (run_visionary_sup, etc.) are added as they are implemented.
-module(orchestrate_agents_sup).
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
        %% ── Archive desk (role-agnostic) ──

        #{id => agent_session_archived_v1_to_pg,
          start => {agent_session_archived_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% ── Division team emitters ──

        #{id => team_formed_v1_to_pg,
          start => {team_formed_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => agent_assigned_to_team_v1_to_pg,
          start => {agent_assigned_to_team_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => team_activated_v1_to_pg,
          start => {team_activated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => team_disbanded_v1_to_pg,
          start => {team_disbanded_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% ── Team lifecycle PMs ──

        #{id => on_division_identified_form_team,
          start => {on_division_identified_form_team, start_link, []},
          restart => permanent, type => worker},
        #{id => on_agent_initiated_assign_agent_to_team,
          start => {on_agent_initiated_assign_agent_to_team, start_link, []},
          restart => permanent, type => worker},

        %% ── Per-role desk supervisors ──

        #{id => run_visionary_sup,
          start => {run_visionary_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_explorer_sup,
          start => {run_explorer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_stormer_sup,
          start => {run_stormer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_architect_sup,
          start => {run_architect_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_erlang_coder_sup,
          start => {run_erlang_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_svelte_coder_sup,
          start => {run_svelte_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_sql_coder_sup,
          start => {run_sql_coder_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_tester_sup,
          start => {run_tester_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_reviewer_sup,
          start => {run_reviewer_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_coordinator_sup,
          start => {run_coordinator_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_delivery_manager_sup,
          start => {run_delivery_manager_sup, start_link, []},
          restart => permanent, type => supervisor},
        #{id => run_mentor_sup,
          start => {run_mentor_sup, start_link, []},
          restart => permanent, type => supervisor}
    ],

    {ok, {SupFlags, Children}}.
