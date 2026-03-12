-ifndef(AGENT_ORCHESTRATION_STATUS_HRL).
-define(AGENT_ORCHESTRATION_STATUS_HRL, true).

%% Agent session status bit flags
-define(AO_INITIATED,      1).   %% 2^0
-define(AO_RUNNING,         2).   %% 2^1
-define(AO_COMPLETED,       4).   %% 2^2
-define(AO_FAILED,          8).   %% 2^3
-define(AO_GATE_PENDING,   16).   %% 2^4
-define(AO_GATE_PASSED,    32).   %% 2^5
-define(AO_GATE_REJECTED,  64).   %% 2^6
-define(AO_ARCHIVED,        128).   %% 2^7
-define(AO_AWAITING_INPUT,  256).   %% 2^8

-define(AO_FLAG_MAP, #{
    ?AO_INITIATED      => <<"Initiated">>,
    ?AO_RUNNING        => <<"Running">>,
    ?AO_COMPLETED      => <<"Completed">>,
    ?AO_FAILED         => <<"Failed">>,
    ?AO_GATE_PENDING   => <<"Gate Pending">>,
    ?AO_GATE_PASSED    => <<"Gate Passed">>,
    ?AO_GATE_REJECTED  => <<"Gate Rejected">>,
    ?AO_ARCHIVED       => <<"Archived">>,
    ?AO_AWAITING_INPUT => <<"Awaiting Input">>
}).

-endif.
