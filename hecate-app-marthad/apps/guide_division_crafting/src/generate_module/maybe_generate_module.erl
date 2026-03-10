%%% @doc maybe_generate_module handler
-module(maybe_generate_module).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(generate_module_v1:generate_module_v1()) ->
    {ok, [module_generated_v1:module_generated_v1()]} | {error, term()}.
handle(Cmd) ->
    DivisionId = generate_module_v1:get_division_id(Cmd),
    case validate_command(DivisionId) of
        ok ->
            Event = module_generated_v1:new(#{
                division_id => DivisionId,
                module_name => generate_module_v1:get_module_name(Cmd),
                module_type => generate_module_v1:get_module_type(Cmd),
                path => generate_module_v1:get_path(Cmd)
            }),
            {ok, [Event]};
        {error, Reason} ->
            {error, Reason}
    end.

-spec dispatch(generate_module_v1:generate_module_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = generate_module_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = generate_module,
        aggregate_type = division_crafting_aggregate,
        aggregate_id = DivisionId,
        payload = generate_module_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_crafting_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{store_id => martha_store, adapter => reckon_evoq_adapter, consistency => eventual},
    evoq_dispatcher:dispatch(EvoqCmd, Opts).

%% Internal
validate_command(DivisionId) when is_binary(DivisionId), byte_size(DivisionId) > 0 -> ok;
validate_command(_) -> {error, invalid_division_id}.
