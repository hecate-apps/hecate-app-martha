%%% @doc maybe_initiate_crafting handler
%%% Business logic for initiating crafting dossiers.
%%% Validates the command and dispatches via evoq.
-module(maybe_initiate_crafting).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, handle/2, dispatch/1]).

%% @doc Handle initiate_crafting_v1 command (business logic only)
-spec handle(initiate_crafting_v1:initiate_crafting_v1()) ->
    {ok, [crafting_initiated_v1:crafting_initiated_v1()]} | {error, term()}.
handle(Cmd) ->
    handle(Cmd, undefined).

%% @doc Handle with state (for aggregate pattern)
-spec handle(initiate_crafting_v1:initiate_crafting_v1(), term()) ->
    {ok, [crafting_initiated_v1:crafting_initiated_v1()]} | {error, term()}.
handle(Cmd, _State) ->
    DivisionId = initiate_crafting_v1:get_division_id(Cmd),
    case validate_command(DivisionId) of
        ok ->
            Event = create_event(Cmd),
            {ok, [Event]};
        {error, Reason} ->
            {error, Reason}
    end.

%% @doc Dispatch command via evoq (persists to ReckonDB)
-spec dispatch(initiate_crafting_v1:initiate_crafting_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = initiate_crafting_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = initiate_crafting,
        aggregate_type = division_crafting_aggregate,
        aggregate_id = DivisionId,
        payload = initiate_crafting_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_crafting_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },

    Opts = #{
        store_id => martha_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },

    evoq_dispatcher:dispatch(EvoqCmd, Opts).

%% Internal

validate_command(DivisionId) when is_binary(DivisionId), byte_size(DivisionId) > 0 ->
    ok;
validate_command(_) ->
    {error, invalid_division_id}.

create_event(Cmd) ->
    crafting_initiated_v1:new(#{
        division_id => initiate_crafting_v1:get_division_id(Cmd),
        venture_id => initiate_crafting_v1:get_venture_id(Cmd),
        context_name => initiate_crafting_v1:get_context_name(Cmd),
        initiated_by => initiate_crafting_v1:get_initiated_by(Cmd)
    }).
