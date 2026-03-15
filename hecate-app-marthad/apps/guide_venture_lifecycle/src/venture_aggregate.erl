%%% @doc Venture aggregate — unified lifecycle for inception + discovery.
%%%
%%% Absorbs: setup_aggregate (setup_venture) + discovery_aggregate (discover_divisions)
%%% Stream: venture-{venture_id}
%%% Store: martha_store
%%%
%%% Lifecycle:
%%%   1. initiate_venture (birth event)
%%%   2. refine_vision / submit_vision (inception phase)
%%%   3. prepare_venture_knowledge / contribute_research_brief / complete_venture_preparation
%%%   4. start_discovery / identify_division / pause/resume/complete_discovery
%%%   5. archive_venture (walking skeleton)
%%% @end
-module(venture_aggregate).

-behaviour(evoq_aggregate).

-include("venture_lifecycle_status.hrl").
-include("venture_state.hrl").

-export([state_module/0, init/1, execute/2, apply/2]).
-export([flag_map/0]).

-type state() :: #venture_state{}.
-export_type([state/0]).

-spec state_module() -> module().
state_module() -> venture_state.

-spec flag_map() -> evoq_bit_flags:flag_map().
flag_map() -> ?VL_FLAG_MAP.

%% --- Callbacks ---

-spec init(binary()) -> {ok, state()}.
init(AggregateId) ->
    {ok, venture_state:new(AggregateId)}.

%% --- Execute ---
%% NOTE: evoq calls execute(State, Payload) - State FIRST!

-spec execute(state(), map()) -> {ok, [map()]} | {error, term()}.

%% Fresh aggregate — only initiate allowed
execute(#venture_state{status = 0}, Payload) ->
    case get_command_type(Payload) of
        <<"initiate_venture_v1">> -> execute_initiate_venture(Payload);
        _ -> {error, venture_not_initiated}
    end;

%% Archived — nothing allowed
execute(#venture_state{status = S}, _Payload) when S band ?VL_ARCHIVED =/= 0 ->
    {error, venture_archived};

%% Initiated and not archived — route by command type
execute(#venture_state{status = S} = State, Payload) when S band ?VL_INITIATED =/= 0 ->
    case get_command_type(Payload) of
        <<"refine_vision_v1">>      -> execute_refine_vision(Payload, State);
        <<"submit_vision_v1">>      -> execute_submit_vision(Payload, State);
        <<"prepare_venture_knowledge_v1">>    -> execute_prepare_knowledge(Payload, State);
        <<"contribute_research_brief_v1">>    -> execute_contribute_brief(Payload, State);
        <<"complete_venture_preparation_v1">> -> execute_complete_preparation(Payload, State);
        <<"start_discovery_v1">>    -> execute_start_discovery(Payload, State);
        <<"identify_division_v1">>  -> execute_identify_division(Payload, State);
        <<"pause_discovery_v1">>    -> execute_pause_discovery(Payload, State);
        <<"resume_discovery_v1">>   -> execute_resume_discovery(Payload, State);
        <<"complete_discovery_v1">> -> execute_complete_discovery(Payload, State);
        <<"archive_venture_v1">>    -> execute_archive_venture(Payload, State);
        %% Scaffold
        <<"scaffold_venture_repo_v1">> -> execute_scaffold_venture_repo(Payload, State);
        %% Big Picture Event Storming
        <<"start_big_picture_storm_v1">>   -> execute_start_storm(Payload, State);
        <<"post_event_sticky_v1">>         -> execute_post_sticky(Payload, State);
        <<"pull_event_sticky_v1">>         -> execute_pull_sticky(Payload, State);
        <<"stack_event_sticky_v1">>        -> execute_stack_sticky(Payload, State);
        <<"unstack_event_sticky_v1">>      -> execute_unstack_sticky(Payload, State);
        <<"groom_event_stack_v1">>         -> execute_groom_stack(Payload, State);
        <<"cluster_event_sticky_v1">>      -> execute_cluster_sticky(Payload, State);
        <<"uncluster_event_sticky_v1">>    -> execute_uncluster_sticky(Payload, State);
        <<"dissolve_event_cluster_v1">>    -> execute_dissolve_cluster(Payload, State);
        <<"name_event_cluster_v1">>        -> execute_name_cluster(Payload, State);
        <<"draw_fact_arrow_v1">>           -> execute_draw_arrow(Payload, State);
        <<"erase_fact_arrow_v1">>          -> execute_erase_arrow(Payload, State);
        <<"promote_event_cluster_v1">>     -> execute_promote_cluster(Payload, State);
        <<"advance_storm_phase_v1">>       -> execute_advance_phase(Payload, State);
        <<"shelve_big_picture_storm_v1">>  -> execute_shelve_storm(Payload, State);
        <<"resume_big_picture_storm_v1">>  -> execute_resume_storm(Payload, State);
        <<"archive_big_picture_storm_v1">> -> execute_archive_storm(Payload, State);
        _ -> {error, unknown_command}
    end;

execute(_State, _Payload) ->
    {error, unknown_command}.

%% --- Command handlers ---

execute_initiate_venture(Payload) ->
    {ok, Cmd} = initiate_venture_v1:from_map(Payload),
    convert_events(maybe_initiate_venture:handle(Cmd), fun venture_initiated_v1:to_map/1).

execute_refine_vision(Payload, _State) ->
    {ok, Cmd} = refine_vision_v1:from_map(Payload),
    convert_events(maybe_refine_vision:handle(Cmd), fun vision_refined_v1:to_map/1).

execute_submit_vision(Payload, #venture_state{status = S}) ->
    case S band ?VL_SUBMITTED of
        0 ->
            {ok, Cmd} = submit_vision_v1:from_map(Payload),
            convert_events(maybe_submit_vision:handle(Cmd), fun vision_submitted_v1:to_map/1);
        _ ->
            {error, vision_already_submitted}
    end.

execute_prepare_knowledge(Payload, #venture_state{status = S}) ->
    case {S band ?VL_SUBMITTED, S band ?VL_PREPARING, S band ?VL_PREPARATION_DONE} of
        {0, _, _} -> {error, vision_not_submitted};
        {_, V, _} when V =/= 0 -> {error, preparation_already_started};
        {_, _, V} when V =/= 0 -> {error, preparation_already_completed};
        _ ->
            {ok, Cmd} = prepare_venture_knowledge_v1:from_map(Payload),
            convert_events(maybe_prepare_venture_knowledge:handle(Cmd),
                fun venture_knowledge_preparation_started_v1:to_map/1)
    end.

execute_contribute_brief(Payload, #venture_state{status = S}) ->
    case S band ?VL_PREPARING of
        0 -> {error, preparation_not_active};
        _ ->
            {ok, Cmd} = contribute_research_brief_v1:from_map(Payload),
            convert_events(maybe_contribute_research_brief:handle(Cmd),
                fun research_brief_contributed_v1:to_map/1)
    end.

execute_complete_preparation(Payload, #venture_state{status = S}) ->
    case S band ?VL_PREPARING of
        0 -> {error, preparation_not_active};
        _ ->
            {ok, Cmd} = complete_venture_preparation_v1:from_map(Payload),
            convert_events(maybe_complete_venture_preparation:handle(Cmd),
                fun venture_preparation_completed_v1:to_map/1)
    end.

execute_start_discovery(Payload, #venture_state{status = S}) ->
    case S band ?VL_DISCOVERING of
        0 ->
            case S band ?VL_DISCOVERY_COMPLETED of
                0 ->
                    {ok, Cmd} = start_discovery_v1:from_map(Payload),
                    convert_events(maybe_start_discovery:handle(Cmd), fun discovery_started_v1:to_map/1);
                _ ->
                    {error, discovery_already_completed}
            end;
        _ ->
            {error, discovery_already_started}
    end.

execute_identify_division(Payload, #venture_state{status = S, discovered_divisions = Discovered}) ->
    case S band ?VL_DISCOVERING of
        0 -> {error, discovery_not_active};
        _ ->
            {ok, Cmd} = identify_division_v1:from_map(Payload),
            Context = #{discovered_divisions => Discovered},
            convert_events(maybe_identify_division:handle(Cmd, Context), fun division_identified_v1:to_map/1)
    end.

execute_pause_discovery(Payload, #venture_state{status = S}) ->
    case S band ?VL_DISCOVERING of
        0 -> {error, discovery_not_active};
        _ ->
            {ok, Cmd} = pause_discovery_v1:from_map(Payload),
            convert_events(maybe_pause_discovery:handle(Cmd), fun discovery_paused_v1:to_map/1)
    end.

execute_resume_discovery(Payload, #venture_state{status = S}) ->
    case S band ?VL_DISCOVERY_PAUSED of
        0 -> {error, discovery_not_paused};
        _ ->
            {ok, Cmd} = resume_discovery_v1:from_map(Payload),
            convert_events(maybe_resume_discovery:handle(Cmd), fun discovery_resumed_v1:to_map/1)
    end.

execute_complete_discovery(Payload, #venture_state{status = S}) ->
    case S band ?VL_DISCOVERING of
        0 -> {error, discovery_not_active};
        _ ->
            {ok, Cmd} = complete_discovery_v1:from_map(Payload),
            convert_events(maybe_complete_discovery:handle(Cmd), fun discovery_completed_v1:to_map/1)
    end.

execute_archive_venture(Payload, _State) ->
    {ok, Cmd} = archive_venture_v1:from_map(Payload),
    convert_events(maybe_archive_venture:handle(Cmd), fun venture_archived_v1:to_map/1).

execute_scaffold_venture_repo(Payload, _State) ->
    {ok, Cmd} = scaffold_venture_repo_v1:from_map(Payload),
    convert_events(maybe_scaffold_venture_repo:handle(Cmd), fun venture_repo_scaffolded_v1:to_map/1).

%% --- Big Picture Event Storming command handlers ---

execute_start_storm(Payload, #venture_state{status = S}) ->
    case {S band ?VL_DISCOVERING, S band ?VL_STORMING} of
        {0, _} -> {error, discovery_not_active};
        {_, V} when V =/= 0 -> {error, storm_already_active};
        _ ->
            {ok, Cmd} = start_big_picture_storm_v1:from_map(Payload),
            convert_events(maybe_start_big_picture_storm:handle(Cmd), fun big_picture_storm_started_v1:to_map/1)
    end.

execute_post_sticky(Payload, #venture_state{status = S, storm_number = SN}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = post_event_sticky_v1:from_map(Payload),
        Context = #{storm_number => SN},
        convert_events(maybe_post_event_sticky:handle(Cmd, Context), fun event_sticky_posted_v1:to_map/1)
    end).

execute_pull_sticky(Payload, #venture_state{status = S, event_stickies = Stickies}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = pull_event_sticky_v1:from_map(Payload),
        Context = #{event_stickies => Stickies},
        convert_events(maybe_pull_event_sticky:handle(Cmd, Context), fun event_sticky_pulled_v1:to_map/1)
    end).

execute_stack_sticky(Payload, #venture_state{status = S, event_stickies = Stickies, event_stacks = Stacks}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = stack_event_sticky_v1:from_map(Payload),
        Context = #{event_stickies => Stickies, event_stacks => Stacks},
        maybe_stack_event_sticky:handle(Cmd, Context)
    end).

execute_unstack_sticky(Payload, #venture_state{status = S, event_stickies = Stickies}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = unstack_event_sticky_v1:from_map(Payload),
        Context = #{event_stickies => Stickies},
        convert_events(maybe_unstack_event_sticky:handle(Cmd, Context), fun event_sticky_unstacked_v1:to_map/1)
    end).

execute_groom_stack(Payload, #venture_state{status = S, event_stickies = Stickies, event_stacks = Stacks}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = groom_event_stack_v1:from_map(Payload),
        Context = #{event_stickies => Stickies, event_stacks => Stacks},
        convert_events(maybe_groom_event_stack:handle(Cmd, Context), fun event_stack_groomed_v1:to_map/1)
    end).

execute_cluster_sticky(Payload, #venture_state{status = S, event_stickies = Stickies, event_clusters = Clusters}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = cluster_event_sticky_v1:from_map(Payload),
        Context = #{event_stickies => Stickies, event_clusters => Clusters},
        maybe_cluster_event_sticky:handle(Cmd, Context)
    end).

execute_uncluster_sticky(Payload, #venture_state{status = S, event_stickies = Stickies}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = uncluster_event_sticky_v1:from_map(Payload),
        Context = #{event_stickies => Stickies},
        maybe_uncluster_event_sticky:handle(Cmd, Context)
    end).

execute_dissolve_cluster(Payload, #venture_state{status = S, event_clusters = Clusters}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = dissolve_event_cluster_v1:from_map(Payload),
        Context = #{event_clusters => Clusters},
        maybe_dissolve_event_cluster:handle(Cmd, Context)
    end).

execute_name_cluster(Payload, #venture_state{status = S, event_clusters = Clusters}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = name_event_cluster_v1:from_map(Payload),
        Context = #{event_clusters => Clusters},
        maybe_name_event_cluster:handle(Cmd, Context)
    end).

execute_draw_arrow(Payload, #venture_state{status = S, storm_number = SN, event_clusters = Clusters, fact_arrows = Arrows}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = draw_fact_arrow_v1:from_map(Payload),
        Context = #{storm_number => SN, event_clusters => Clusters, fact_arrows => Arrows},
        maybe_draw_fact_arrow:handle(Cmd, Context)
    end).

execute_erase_arrow(Payload, #venture_state{status = S, fact_arrows = Arrows}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = erase_fact_arrow_v1:from_map(Payload),
        Context = #{fact_arrows => Arrows},
        maybe_erase_fact_arrow:handle(Cmd, Context)
    end).

execute_promote_cluster(Payload, #venture_state{status = S, event_clusters = Clusters}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = promote_event_cluster_v1:from_map(Payload),
        Context = #{event_clusters => Clusters},
        maybe_promote_event_cluster:handle(Cmd, Context)
    end).

execute_advance_phase(Payload, #venture_state{status = S, storm_phase = Phase}) ->
    require_storming(S, fun() ->
        {ok, Cmd} = advance_storm_phase_v1:from_map(Payload),
        Context = #{storm_phase => Phase},
        convert_events(maybe_advance_storm_phase:handle(Cmd, Context), fun storm_phase_advanced_v1:to_map/1)
    end).

execute_shelve_storm(Payload, #venture_state{status = S}) ->
    case S band ?VL_STORMING of
        0 -> {error, storm_not_active};
        _ ->
            {ok, Cmd} = shelve_big_picture_storm_v1:from_map(Payload),
            convert_events(maybe_shelve_big_picture_storm:handle(Cmd), fun big_picture_storm_shelved_v1:to_map/1)
    end.

execute_resume_storm(Payload, #venture_state{status = S}) ->
    case S band ?VL_STORM_SHELVED of
        0 -> {error, storm_not_shelved};
        _ ->
            {ok, Cmd} = resume_big_picture_storm_v1:from_map(Payload),
            convert_events(maybe_resume_big_picture_storm:handle(Cmd), fun big_picture_storm_resumed_v1:to_map/1)
    end.

execute_archive_storm(Payload, #venture_state{status = S}) ->
    case S band ?VL_STORMING bor S band ?VL_STORM_SHELVED of
        0 -> {error, no_storm_to_archive};
        _ ->
            {ok, Cmd} = archive_big_picture_storm_v1:from_map(Payload),
            convert_events(maybe_archive_big_picture_storm:handle(Cmd), fun big_picture_storm_archived_v1:to_map/1)
    end.

require_storming(S, Fun) ->
    case S band ?VL_STORMING of
        0 -> {error, storm_not_active};
        _ -> Fun()
    end.

%% --- Apply ---
%% Delegates to venture_state module (evoq_state behaviour).

-spec apply(state(), map()) -> state().
apply(State, Event) ->
    venture_state:apply_event(State, Event).

%% --- Internal ---

get_command_type(#{command_type := T}) when is_binary(T) -> T;
get_command_type(#{command_type := T}) when is_atom(T) -> atom_to_binary(T);
get_command_type(_) -> undefined.

convert_events({ok, Events}, ToMapFn) ->
    {ok, [ToMapFn(E) || E <- Events]};
convert_events({error, _} = Err, _) ->
    Err.
