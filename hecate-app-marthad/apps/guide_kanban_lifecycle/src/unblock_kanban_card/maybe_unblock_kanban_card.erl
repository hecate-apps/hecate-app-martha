%%% @doc Handler: validate and produce kanban_card_unblocked_v1.
-module(maybe_unblock_kanban_card).

-include("kanban_card_status.hrl").
-include_lib("evoq/include/evoq.hrl").

-export([handle/2, dispatch/1]).

-spec handle(unblock_kanban_card_v1:unblock_kanban_card_v1(), map()) ->
    {ok, [kanban_card_unblocked_v1:kanban_card_unblocked_v1()]} | {error, term()}.
handle(Cmd, Context) ->
    case unblock_kanban_card_v1:validate(Cmd) of
        ok ->
            CardId = unblock_kanban_card_v1:get_card_id(Cmd),
            Cards = maps:get(cards, Context, #{}),
            case maps:find(CardId, Cards) of
                {ok, #{status := S}} when S band 16 =/= 0 ->
                    Event = kanban_card_unblocked_v1:new(#{
                        division_id => unblock_kanban_card_v1:get_division_id(Cmd),
                        card_id     => unblock_kanban_card_v1:get_card_id(Cmd)
                    }),
                    {ok, [Event]};
                {ok, _} ->
                    {error, card_not_blocked};
                error ->
                    {error, card_not_found}
            end;
        {error, _} = Err ->
            Err
    end.

-spec dispatch(unblock_kanban_card_v1:unblock_kanban_card_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = unblock_kanban_card_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = unblock_kanban_card,
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = unblock_kanban_card_v1:to_map(Cmd),
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
