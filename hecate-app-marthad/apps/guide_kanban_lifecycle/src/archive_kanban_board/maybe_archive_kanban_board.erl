%%% @doc Handler: validate and produce kanban_board_archived_v1.
-module(maybe_archive_kanban_board).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(archive_kanban_board_v1:archive_kanban_board_v1()) ->
    {ok, [kanban_board_archived_v1:kanban_board_archived_v1()]} | {error, term()}.
handle(Cmd) ->
    case archive_kanban_board_v1:validate(Cmd) of
        ok ->
            Event = kanban_board_archived_v1:new(#{
                division_id => archive_kanban_board_v1:get_division_id(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(archive_kanban_board_v1:archive_kanban_board_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = archive_kanban_board_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = archive_kanban_board,
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = archive_kanban_board_v1:to_map(Cmd),
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
