-ifndef(KANBAN_CARD_STATUS_HRL).
-define(KANBAN_CARD_STATUS_HRL, true).

%% Kanban card status (bit flags)
-define(CARD_POSTED,   1).    %% 2^0
-define(CARD_PICKED,   2).    %% 2^1
-define(CARD_FINISHED, 4).    %% 2^2
-define(CARD_PARKED,   8).    %% 2^3
-define(CARD_BLOCKED,  16).   %% 2^4

-define(CARD_FLAG_MAP, #{
    ?CARD_POSTED   => <<"Posted">>,
    ?CARD_PICKED   => <<"Picked">>,
    ?CARD_FINISHED => <<"Finished">>,
    ?CARD_PARKED   => <<"Parked">>,
    ?CARD_BLOCKED  => <<"Blocked">>
}).

-endif.
