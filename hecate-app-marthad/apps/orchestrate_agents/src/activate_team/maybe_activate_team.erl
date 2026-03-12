%%% @doc maybe_activate_team handler.
%%% Validates that the team has at least one member before activating.
-module(maybe_activate_team).

-include("division_team_state.hrl").

-export([handle/2]).

-spec handle(activate_team_v1:activate_team_v1(), #division_team_state{}) ->
    {ok, [team_activated_v1:team_activated_v1()]} | {error, term()}.
handle(Cmd, #division_team_state{members = Members}) ->
    case Members of
        [] ->
            {error, no_members};
        _ ->
            case activate_team_v1:validate(Cmd) of
                {ok, _} ->
                    Event = team_activated_v1:new(#{
                        division_id => activate_team_v1:get_division_id(Cmd)
                    }),
                    {ok, [Event]};
                {error, _} = Err ->
                    Err
            end
    end.
