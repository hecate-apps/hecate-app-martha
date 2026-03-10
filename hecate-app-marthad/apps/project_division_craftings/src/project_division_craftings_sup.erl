%%% @doc Top-level supervisor for project_division_craftings.
-module(project_division_craftings_sup).
-behaviour(supervisor).
-export([start_link/0, init/1]).

start_link() ->
    supervisor:start_link({local, ?MODULE}, ?MODULE, []).

init([]) ->
    Children = [
        %% SQLite connection worker (must start first)
        #{
            id => project_division_craftings_store,
            start => {project_division_craftings_store, start_link, []},
            restart => permanent,
            type => worker
        },
        %% Projection: crafting_initiated_v1 -> division_craftings table
        #{
            id => crafting_initiated_v1_to_division_craftings_sup,
            start => {crafting_initiated_v1_to_division_craftings_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: crafting_archived_v1 -> division_craftings table
        #{
            id => crafting_archived_v1_to_division_craftings_sup,
            start => {crafting_archived_v1_to_division_craftings_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: crafting_opened_v1 -> division_craftings table
        #{
            id => crafting_opened_v1_to_division_craftings_sup,
            start => {crafting_opened_v1_to_division_craftings_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: crafting_shelved_v1 -> division_craftings table
        #{
            id => crafting_shelved_v1_to_division_craftings_sup,
            start => {crafting_shelved_v1_to_division_craftings_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: crafting_resumed_v1 -> division_craftings table
        #{
            id => crafting_resumed_v1_to_division_craftings_sup,
            start => {crafting_resumed_v1_to_division_craftings_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: crafting_concluded_v1 -> division_craftings table
        #{
            id => crafting_concluded_v1_to_division_craftings_sup,
            start => {crafting_concluded_v1_to_division_craftings_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: module_generated_v1 -> generated_modules table
        #{
            id => module_generated_v1_to_generated_modules_sup,
            start => {module_generated_v1_to_generated_modules_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: test_generated_v1 -> generated_tests table
        #{
            id => test_generated_v1_to_generated_tests_sup,
            start => {test_generated_v1_to_generated_tests_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: test_suite_run_v1 -> test_suites table
        #{
            id => test_suite_run_v1_to_test_suites_sup,
            start => {test_suite_run_v1_to_test_suites_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: test_result_recorded_v1 -> test_results table
        #{
            id => test_result_recorded_v1_to_test_results_sup,
            start => {test_result_recorded_v1_to_test_results_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: release_delivered_v1 -> releases table
        #{
            id => release_delivered_v1_to_releases_sup,
            start => {release_delivered_v1_to_releases_sup, start_link, []},
            restart => permanent,
            type => supervisor
        },
        %% Projection: delivery_staged_v1 -> delivery_stages table
        #{
            id => delivery_staged_v1_to_delivery_stages_sup,
            start => {delivery_staged_v1_to_delivery_stages_sup, start_link, []},
            restart => permanent,
            type => supervisor
        }
    ],
    {ok, {#{strategy => one_for_one, intensity => 10, period => 10}, Children}}.
