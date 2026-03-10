%%% @doc guide_division_planning top-level supervisor
%%%
%%% Supervises all emitters for division planning events:
%%% - PG emitters: subscribe to evoq, broadcast to pg groups (internal)
%%% - Mesh emitters: subscribe to evoq, publish to mesh (external)
%%% - Process managers: cross-domain integration
%%% @end
-module(guide_division_planning_sup).
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

        %% Planning lifecycle
        #{id => planning_initiated_v1_to_pg,
          start => {planning_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => planning_archived_v1_to_pg,
          start => {planning_archived_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => planning_opened_v1_to_pg,
          start => {planning_opened_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => planning_shelved_v1_to_pg,
          start => {planning_shelved_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => planning_resumed_v1_to_pg,
          start => {planning_resumed_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => planning_concluded_v1_to_pg,
          start => {planning_concluded_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% Design + plan desks
        #{id => aggregate_designed_v1_to_pg,
          start => {aggregate_designed_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => event_designed_v1_to_pg,
          start => {event_designed_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => desk_planned_v1_to_pg,
          start => {desk_planned_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => dependency_planned_v1_to_pg,
          start => {dependency_planned_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% ── Mesh emitters (external, subscribe via evoq -> publish to mesh) ──

        #{id => planning_initiated_v1_to_mesh,
          start => {planning_initiated_v1_to_mesh, start_link, []},
          restart => permanent, type => worker},

        %% ── Process managers ──

        #{id => on_division_identified_initiate_planning,
          start => {on_division_identified_initiate_planning, start_link, []},
          restart => permanent, type => worker}
    ],

    {ok, {SupFlags, Children}}.
