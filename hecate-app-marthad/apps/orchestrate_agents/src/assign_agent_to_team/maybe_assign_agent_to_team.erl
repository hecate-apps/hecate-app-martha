%%% @doc maybe_assign_agent_to_team handler.
%%% Validates assignment and checks for duplicate roles.
-module(maybe_assign_agent_to_team).

-include_lib("evoq/include/evoq.hrl").
-include("division_team_state.hrl").

-export([handle/2, dispatch/1]).

-spec handle(assign_agent_to_team_v1:assign_agent_to_team_v1(), #division_team_state{}) ->
    {ok, [agent_assigned_to_team_v1:agent_assigned_to_team_v1()]} | {error, term()}.
handle(Cmd, #division_team_state{members = Members}) ->
    case assign_agent_to_team_v1:validate(Cmd) of
        {ok, _} ->
            SessId = assign_agent_to_team_v1:get_session_id(Cmd),
            case already_assigned(SessId, Members) of
                true ->
                    {error, agent_already_assigned};
                false ->
                    Event = agent_assigned_to_team_v1:new(#{
                        division_id => assign_agent_to_team_v1:get_division_id(Cmd),
                        agent_role => assign_agent_to_team_v1:get_agent_role(Cmd),
                        session_id => SessId
                    }),
                    {ok, [Event]}
            end;
        {error, _} = Err ->
            Err
    end.

-spec dispatch(assign_agent_to_team_v1:assign_agent_to_team_v1()) ->
    {ok, non_neg_integer(), [map()]} | {error, term()}.
dispatch(Cmd) ->
    DivisionId = assign_agent_to_team_v1:get_division_id(Cmd),
    Timestamp = erlang:system_time(millisecond),

    EvoqCmd = #evoq_command{
        command_type = assign_agent_to_team,
        aggregate_type = division_team_aggregate,
        aggregate_id = DivisionId,
        payload = assign_agent_to_team_v1:to_map(Cmd),
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

%% Internal
already_assigned(SessionId, Members) ->
    lists:any(fun(#{session_id := S}) -> S =:= SessionId;
                 (_) -> false
              end, Members).
