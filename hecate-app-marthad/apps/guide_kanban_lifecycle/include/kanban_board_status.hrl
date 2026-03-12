-ifndef(KANBAN_BOARD_STATUS_HRL).
-define(KANBAN_BOARD_STATUS_HRL, true).

%% Kanban board status (bit flags)
-define(BOARD_INITIATED,  1).   %% 2^0
-define(BOARD_ARCHIVED,   2).   %% 2^1
-define(BOARD_ACTIVE,     4).   %% 2^2

-define(BOARD_FLAG_MAP, #{
    ?BOARD_INITIATED  => <<"Initiated">>,
    ?BOARD_ARCHIVED   => <<"Archived">>,
    ?BOARD_ACTIVE     => <<"Active">>
}).

-endif.
