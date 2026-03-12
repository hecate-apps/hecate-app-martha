%%% @doc Top-level supervisor for project_division_kanbans.
-module(project_division_kanbans_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        %% SQLite connection worker (must start first)
        #{
            id => project_division_kanbans_store,
            start => {project_division_kanbans_store, start_link, []},
            restart => permanent,
            type => worker
        },

        %% Board projections
        #{
            id => kanban_board_initiated_v1_to_division_kanbans_sup,
            start => {kanban_board_initiated_v1_to_division_kanbans_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_board_archived_v1_to_division_kanbans_sup,
            start => {kanban_board_archived_v1_to_division_kanbans_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },

        %% Card projections
        #{
            id => kanban_card_posted_v1_to_kanban_cards_sup,
            start => {kanban_card_posted_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_card_picked_v1_to_kanban_cards_sup,
            start => {kanban_card_picked_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_card_finished_v1_to_kanban_cards_sup,
            start => {kanban_card_finished_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_card_unpicked_v1_to_kanban_cards_sup,
            start => {kanban_card_unpicked_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_card_parked_v1_to_kanban_cards_sup,
            start => {kanban_card_parked_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_card_unparked_v1_to_kanban_cards_sup,
            start => {kanban_card_unparked_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_card_blocked_v1_to_kanban_cards_sup,
            start => {kanban_card_blocked_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        #{
            id => kanban_card_unblocked_v1_to_kanban_cards_sup,
            start => {kanban_card_unblocked_v1_to_kanban_cards_sup, start_link, []},
            restart => permanent,
            type => supervisor
        }
    ],
    {ok, {#{strategy => one_for_one, intensity => 10, period => 10}, Children}}.
