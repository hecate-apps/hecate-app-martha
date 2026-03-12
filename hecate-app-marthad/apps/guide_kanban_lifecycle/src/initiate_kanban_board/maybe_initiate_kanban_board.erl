%%% @doc Handler: validate and produce kanban_board_initiated_v1.
-module(maybe_initiate_kanban_board).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(initiate_kanban_board_v1:initiate_kanban_board_v1()) ->
    {ok, [kanban_board_initiated_v1:kanban_board_initiated_v1()]} | {error, term()}.
handle(Cmd) ->
    case initiate_kanban_board_v1:validate(Cmd) of
        ok ->
            Event = kanban_board_initiated_v1:new(#{
                division_id  => initiate_kanban_board_v1:get_division_id(Cmd),
                venture_id   => initiate_kanban_board_v1:get_venture_id(Cmd),
                context_name => initiate_kanban_board_v1:get_context_name(Cmd),
                initiated_by => initiate_kanban_board_v1:get_initiated_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(initiate_kanban_board_v1:initiate_kanban_board_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = initiate_kanban_board_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = initiate_kanban_board,
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = initiate_kanban_board_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_kanban_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },
    Opts = #{
        store_id => martha_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },
    evoq_dispatcher:dispatch(EvoqCmd, Opts).
