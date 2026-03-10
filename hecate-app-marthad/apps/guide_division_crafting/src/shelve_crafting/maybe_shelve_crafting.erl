%%% @doc maybe_shelve_crafting handler
%%% Business logic for shelving crafting dossiers.
-module(maybe_shelve_crafting).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(shelve_crafting_v1:shelve_crafting_v1()) ->
    {ok, [crafting_shelved_v1:crafting_shelved_v1()]} | {error, term()}.
handle(Cmd) ->
    DivisionId = shelve_crafting_v1:get_division_id(Cmd),
    case validate_command(DivisionId) of
        ok ->
            Event = crafting_shelved_v1:new(#{
                division_id => DivisionId,
                reason => shelve_crafting_v1:get_reason(Cmd)
            }),
            {ok, [Event]};
        {error, Reason} ->
            {error, Reason}
    end.

-spec dispatch(shelve_crafting_v1:shelve_crafting_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = shelve_crafting_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = shelve_crafting,
        aggregate_type = division_crafting_aggregate,
        aggregate_id = DivisionId,
        payload = shelve_crafting_v1:to_map(Cmd),
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
validate_command(DivisionId) when is_binary(DivisionId), byte_size(DivisionId) > 0 -> ok;
validate_command(_) -> {error, invalid_division_id}.
