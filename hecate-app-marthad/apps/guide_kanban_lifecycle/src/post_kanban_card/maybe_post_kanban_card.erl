%%% @doc Handler: validate and produce kanban_card_posted_v1.
-module(maybe_post_kanban_card).

-include("kanban_card_status.hrl").
-include_lib("evoq/include/evoq.hrl").

-export([handle/2, dispatch/1]).

-spec handle(post_kanban_card_v1:post_kanban_card_v1(), map()) ->
    {ok, [kanban_card_posted_v1:kanban_card_posted_v1()]} | {error, term()}.
handle(Cmd, Context) ->
    case post_kanban_card_v1:validate(Cmd) of
        ok ->
            CardId = post_kanban_card_v1:get_card_id(Cmd),
            Cards = maps:get(cards, Context, #{}),
            case maps:is_key(CardId, Cards) of
                true ->
                    {error, card_already_exists};
                false ->
                    Event = kanban_card_posted_v1:new(#{
                        division_id => post_kanban_card_v1:get_division_id(Cmd),
                        card_id     => CardId,
                        title       => post_kanban_card_v1:get_title(Cmd),
                        description => post_kanban_card_v1:get_description(Cmd),
                        card_type   => post_kanban_card_v1:get_card_type(Cmd),
                        posted_by   => post_kanban_card_v1:get_posted_by(Cmd)
                    }),
                    {ok, [Event]}
            end;
        {error, _} = Err ->
            Err
    end.

-spec dispatch(post_kanban_card_v1:post_kanban_card_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = post_kanban_card_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),
    EvoqCmd = #evoq_command{
        command_type = post_kanban_card,
        aggregate_type = division_kanban_aggregate,
        aggregate_id = DivisionId,
        payload = post_kanban_card_v1:to_map(Cmd),
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
