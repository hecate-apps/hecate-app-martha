-ifndef(DIVISION_TEAM_STATE_HRL).
-define(DIVISION_TEAM_STATE_HRL, true).

-record(division_team_state, {
    division_id    :: binary() | undefined,
    venture_id     :: binary() | undefined,
    status = 0     :: non_neg_integer(),
    planned_roles = [] :: [binary()],
    members = []   :: [map()],     %% [#{agent_role => binary(), session_id => binary()}]
    formed_at      :: non_neg_integer() | undefined,
    formed_by      :: binary() | undefined,
    activated_at   :: non_neg_integer() | undefined,
    disbanded_at   :: non_neg_integer() | undefined
}).

-endif.
