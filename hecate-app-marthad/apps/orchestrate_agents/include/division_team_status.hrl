-ifndef(DIVISION_TEAM_STATUS_HRL).
-define(DIVISION_TEAM_STATUS_HRL, true).

%% Division team status bit flags
-define(DT_FORMED,     1).   %% 2^0
-define(DT_ACTIVE,     2).   %% 2^1
-define(DT_PAUSED,     4).   %% 2^2
-define(DT_DISBANDED,  8).   %% 2^3

-define(DT_FLAG_MAP, #{
    ?DT_FORMED    => <<"Formed">>,
    ?DT_ACTIVE    => <<"Active">>,
    ?DT_PAUSED    => <<"Paused">>,
    ?DT_DISBANDED => <<"Disbanded">>
}).

-endif.
