%%% @doc Handler: validate and produce kanban_card_finished_v1.
-module(maybe_finish_kanban_card).

-include("kanban_card_status.hrl").
-include_lib("evoq/include/evoq.hrl").

-export([handle/2, dispatch/1]).

-spec handle(finish_kanban_card_v1:finish_kanban_card_v1(), map()) ->
    {ok, [kanban_card_finished_v1:kanban_card_finished_v1()]} | {error, term()}.
handle(Cmd, Context) ->
    case finish_kanban_card_v1:validate(Cmd) of
        ok ->
            CardId = finish_kanban_card_v1:get_card_id(Cmd),
            Cards = maps:get(cards, Context, #{}),
            case maps:find(CardId, Cards) of
                {ok, #{status := S}} when S band 2 =/= 0 ->
                    Event = kanban_card_finished_v1:new(#{
                        division_id => finish_kanban_card_v1:get_division_id(Cmd),
                        card_id     => finish_kanban_card_v1:get_card_id(Cmd)
                    }),
                    {ok, [Event]};
                {ok, _} ->
                    {error, card_not_finishable};
                error ->
                    {error, card_not_found}
            end;
        {error, _} = Err ->
            Err
    end.

-spec dispatch(finish_kanban_card_v1:finish_kanban_card_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = finish_kanban_card_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = finish_kanban_card,
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = finish_kanban_card_v1:to_map(Cmd),
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
