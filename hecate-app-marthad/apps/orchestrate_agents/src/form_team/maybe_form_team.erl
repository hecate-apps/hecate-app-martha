%%% @doc maybe_form_team handler.
%%% Business logic for forming a division team.
-module(maybe_form_team).

-include_lib("evoq/include/evoq.hrl").

-export([handle/1, dispatch/1]).

-spec handle(form_team_v1:form_team_v1()) ->
    {ok, [team_formed_v1:team_formed_v1()]} | {error, term()}.
handle(Cmd) ->
    case form_team_v1:validate(Cmd) of
        {ok, _} ->
            Event = team_formed_v1:new(#{
                division_id => form_team_v1:get_division_id(Cmd),
                venture_id => form_team_v1:get_venture_id(Cmd),
                planned_roles => form_team_v1:get_planned_roles(Cmd),
                formed_by => form_team_v1:get_formed_by(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.

-spec dispatch(form_team_v1:form_team_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = form_team_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = form_team,
        aggregate_type = division_team_aggregate,
        aggregate_id = DivisionId,
        payload = form_team_v1:to_map(Cmd),
        metadata = #{timestamp => Timestamp, aggregate_type => division_team_aggregate},
        causation_id = undefined,
        correlation_id = undefined
    },

    Opts = #{
        store_id => orchestration_store,
        adapter => reckon_evoq_adapter,
        consistency => eventual
    },

    evoq_dispatcher:dispatch(EvoqCmd, Opts).
