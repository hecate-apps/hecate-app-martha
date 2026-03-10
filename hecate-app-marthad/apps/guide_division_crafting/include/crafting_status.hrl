-ifndef(CRAFTING_STATUS_HRL).
-define(CRAFTING_STATUS_HRL, true).

%% Crafting dossier status
-define(CRAFTING_INITIATED,  1).   %% 2^0
-define(CRAFTING_ARCHIVED,   2).   %% 2^1
-define(CRAFTING_OPEN,       4).   %% 2^2
-define(CRAFTING_SHELVED,    8).   %% 2^3
-define(CRAFTING_CONCLUDED, 16).   %% 2^4

-define(CRAFTING_FLAG_MAP, #{
    ?CRAFTING_INITIATED  => <<"Initiated">>,
    ?CRAFTING_ARCHIVED   => <<"Archived">>,
    ?CRAFTING_OPEN       => <<"Open">>,
    ?CRAFTING_SHELVED    => <<"Shelved">>,
    ?CRAFTING_CONCLUDED  => <<"Concluded">>
}).

-endif.
