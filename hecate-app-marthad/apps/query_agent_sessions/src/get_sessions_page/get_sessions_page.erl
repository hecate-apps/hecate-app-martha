-module(get_sessions_page).
-export([get/1]).

-spec get(map()) -> {ok, [map()]} | {error, term()}.
get(Filters) ->
    Limit = maps:get(limit, Filters, 50),
    Offset = maps:get(offset, Filters, 0),
    Sessions = case Filters of
        #{venture_id := VentureId} ->
            project_agent_sessions_store:list_sessions_by_venture(VentureId);
        #{division_id := DivisionId} ->
            project_agent_sessions_store:list_sessions_by_division(DivisionId);
        #{agent_role := Role} ->
            project_agent_sessions_store:list_sessions_by_role(Role);
        _ ->
            project_agent_sessions_store:list_active_sessions()
    end,
    case Sessions of
        {ok, All} ->
            {ok, paginate(All, Offset, Limit)};
        {error, _} = Err ->
            Err
    end.

paginate(List, Offset, Limit) ->
    lists:sublist(safe_drop(List, Offset), Limit).

safe_drop(List, 0) -> List;
safe_drop([], _) -> [];
safe_drop([_ | T], N) -> safe_drop(T, N - 1).
