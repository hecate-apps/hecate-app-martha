-ifndef(PLANNING_STATUS_HRL).
-define(PLANNING_STATUS_HRL, true).

%% Planning dossier status
-define(PLANNING_INITIATED,  1).   %% 2^0
-define(PLANNING_ARCHIVED,   2).   %% 2^1
-define(PLANNING_OPEN,       4).   %% 2^2
-define(PLANNING_SHELVED,    8).   %% 2^3
-define(PLANNING_CONCLUDED, 16).   %% 2^4

-define(PLANNING_FLAG_MAP, #{
    ?PLANNING_INITIATED  => <<"Initiated">>,
    ?PLANNING_ARCHIVED   => <<"Archived">>,
    ?PLANNING_OPEN       => <<"Open">>,
    ?PLANNING_SHELVED    => <<"Shelved">>,
    ?PLANNING_CONCLUDED  => <<"Concluded">>
}).

-endif.
