%%% @doc maybe_disband_team handler.
%%% Disbands a team unconditionally (guard is in the aggregate).
-module(maybe_disband_team).

-export([handle/1]).

-spec handle(disband_team_v1:disband_team_v1()) ->
    {ok, [team_disbanded_v1:team_disbanded_v1()]} | {error, term()}.
handle(Cmd) ->
    case disband_team_v1:validate(Cmd) of
        {ok, _} ->
            Event = team_disbanded_v1:new(#{
                division_id => disband_team_v1:get_division_id(Cmd),
                reason => disband_team_v1:get_reason(Cmd)
            }),
            {ok, [Event]};
        {error, _} = Err ->
            Err
    end.
