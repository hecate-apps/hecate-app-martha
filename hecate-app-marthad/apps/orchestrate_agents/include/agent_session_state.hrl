-ifndef(AGENT_SESSION_STATE_HRL).
-define(AGENT_SESSION_STATE_HRL, true).

-record(agent_session_state, {
    session_id          :: binary() | undefined,
    agent_role          :: binary() | undefined,
    venture_id          :: binary() | undefined,
    division_id         :: binary() | undefined,
    kanban_item_id      :: binary() | undefined,
    tier                :: binary() | undefined,
    model               :: binary() | undefined,
    status = 0          :: non_neg_integer(),
    initiated_at        :: non_neg_integer() | undefined,
    initiated_by        :: binary() | undefined,
    completed_at        :: non_neg_integer() | undefined,
    failed_at           :: non_neg_integer() | undefined,
    archived_at         :: non_neg_integer() | undefined,
    tokens_in = 0       :: non_neg_integer(),
    tokens_out = 0      :: non_neg_integer(),
    notation_output     :: binary() | undefined,
    parsed_terms = []   :: list(),
    gate_name           :: binary() | undefined,
    gate_verdict        :: binary() | undefined,
    gate_decided_by     :: binary() | undefined,
    gate_decided_at     :: non_neg_integer() | undefined,
    escalated_at        :: non_neg_integer() | undefined,
    rejection_reason    :: binary() | undefined,
    error_reason        :: binary() | undefined,
    %% Conversational turn tracking
    turn_count = 0      :: non_neg_integer(),
    last_agent_output   :: binary() | undefined,
    last_input          :: binary() | undefined,
    last_input_by       :: binary() | undefined
}).

-endif.
