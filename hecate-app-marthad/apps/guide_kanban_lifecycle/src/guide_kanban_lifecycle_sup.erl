%%% @doc guide_kanban_lifecycle top-level supervisor
%%%
%%% Supervises all emitters for division kanban events:
%%% - PG emitters: subscribe to evoq, broadcast to pg groups (internal)
%%% - Process managers: cross-domain integration
%%% @end
-module(guide_kanban_lifecycle_sup).
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
        %% ── Board PG emitters ──

        #{id => kanban_board_initiated_v1_to_pg,
          start => {kanban_board_initiated_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_board_archived_v1_to_pg,
          start => {kanban_board_archived_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% ── Card PG emitters ──

        #{id => kanban_card_posted_v1_to_pg,
          start => {kanban_card_posted_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_card_picked_v1_to_pg,
          start => {kanban_card_picked_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_card_finished_v1_to_pg,
          start => {kanban_card_finished_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_card_unpicked_v1_to_pg,
          start => {kanban_card_unpicked_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_card_parked_v1_to_pg,
          start => {kanban_card_parked_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_card_unparked_v1_to_pg,
          start => {kanban_card_unparked_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_card_blocked_v1_to_pg,
          start => {kanban_card_blocked_v1_to_pg, start_link, []},
          restart => permanent, type => worker},
        #{id => kanban_card_unblocked_v1_to_pg,
          start => {kanban_card_unblocked_v1_to_pg, start_link, []},
          restart => permanent, type => worker},

        %% ── Process managers ──

        #{id => on_division_identified_initiate_division_kanban,
          start => {on_division_identified_initiate_division_kanban, start_link, []},
          restart => permanent, type => worker}
    ],

    {ok, {SupFlags, Children}}.
