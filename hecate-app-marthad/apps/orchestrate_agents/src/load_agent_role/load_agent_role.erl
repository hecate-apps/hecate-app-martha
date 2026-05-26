%%% @doc Loads agent role definitions from the hecate-corpus repository.
%%%
%%% Reads role files from the daemon's local clone of hecate-corpus
%%% at $HECATE_HOME/hecate-corpus/roles/. Role files are markdown
%%% with YAML front matter.
%%%
%%% Supports both flat names ("visionary") and nested ("storm/domain_expert").
-module(load_agent_role).

-export([load/1]).

-spec load(binary()) -> {ok, binary()} | {error, term()}.
load(RoleName) when is_binary(RoleName) ->
    RolesDir = hecate_agents_repo:roles_path(),
    case filelib:is_dir(RolesDir) of
        false ->
            logger:error(
                "[load_agent_role] hecate-corpus not available at ~s~n"
                "  Run: git clone https://github.com/hecate-social/hecate-corpus.git ~s",
                [RolesDir, hecate_agents_repo:path()]
            ),
            {error, {hecate_agents_not_available, RolesDir}};
        true ->
            FileName = <<RoleName/binary, ".md">>,
            PathParts = binary:split(FileName, <<"/">>, [global]),
            Path = filename:join([RolesDir | [binary_to_list(P) || P <- PathParts]]),
            case file:read_file(Path) of
                {ok, Content} -> {ok, Content};
                {error, enoent} -> {error, {role_not_found, RoleName, Path}};
                {error, Reason} -> {error, Reason}
            end
    end.
