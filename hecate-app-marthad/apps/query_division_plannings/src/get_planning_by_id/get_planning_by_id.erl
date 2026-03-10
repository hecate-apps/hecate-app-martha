-module(get_planning_by_id).
-export([get/1]).

-spec get(binary()) -> {ok, map()} | {error, not_found | term()}.
get(DivisionId) ->
    Sql = "SELECT division_id, venture_id, context_name, status, status_label, "
          "initiated_at, initiated_by, opened_at, shelved_at, concluded_at "
          "FROM division_plannings WHERE division_id = ?1",
    case project_division_plannings_store:query(Sql, [DivisionId]) of
        {ok, [Row]} ->
            {ok, row_to_map(Row)};
        {ok, []} ->
            {error, not_found};
        {error, Reason} ->
            {error, Reason}
    end.

row_to_map([DivisionId, VentureId, ContextName, Status, StatusLabel,
            InitiatedAt, InitiatedBy, OpenedAt, ShelvedAt, ConcludedAt]) ->
    #{
        division_id => DivisionId,
        venture_id => VentureId,
        context_name => ContextName,
        status => Status,
        status_label => StatusLabel,
        initiated_at => InitiatedAt,
        initiated_by => InitiatedBy,
        opened_at => OpenedAt,
        shelved_at => ShelvedAt,
        concluded_at => ConcludedAt
    }.
