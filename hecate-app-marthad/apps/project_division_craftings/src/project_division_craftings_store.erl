%%% @doc SQLite store for project_division_craftings read models.
%%%
%%% Tables: division_craftings, generated_modules, generated_tests,
%%%          test_suites, test_results, releases, delivery_stages
%%% @end
-module(project_division_craftings_store).
-behaviour(gen_server).

-export([start_link/0, init_schema/0, execute/1, execute/2, query/1, query/2]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-record(state, {db :: esqlite3:esqlite3()}).

-spec start_link() -> {ok, pid()} | {error, term()}.
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    DbPath = app_marthad_paths:sqlite_path("project_division_craftings.db"),
    ok = filelib:ensure_dir(DbPath),
    {ok, Db} = esqlite3:open(DbPath),
    ok = esqlite3:exec(Db, "PRAGMA journal_mode=WAL;"),
    ok = esqlite3:exec(Db, "PRAGMA synchronous=NORMAL;"),
    ok = create_tables(Db),
    {ok, #state{db = Db}}.

-spec init_schema() -> ok.
init_schema() ->
    gen_server:call(?MODULE, init_schema).

-spec execute(iodata()) -> ok | {error, term()}.
execute(Sql) ->
    gen_server:call(?MODULE, {execute, Sql, []}).

-spec execute(iodata(), [term()]) -> ok | {error, term()}.
execute(Sql, Params) ->
    gen_server:call(?MODULE, {execute, Sql, Params}).

-spec query(iodata()) -> {ok, [[term()]]} | {error, term()}.
query(Sql) ->
    gen_server:call(?MODULE, {query, Sql, []}).

-spec query(iodata(), [term()]) -> {ok, [[term()]]} | {error, term()}.
query(Sql, Params) ->
    gen_server:call(?MODULE, {query, Sql, Params}).

handle_call(init_schema, _From, #state{db = Db} = State) ->
    Result = create_tables(Db),
    {reply, Result, State};

handle_call({execute, Sql, Params}, _From, #state{db = Db} = State) ->
    case Params of
        [] ->
            Result = esqlite3:exec(Db, Sql),
            {reply, Result, State};
        _ ->
            case esqlite3:prepare(Db, Sql) of
                {ok, Stmt} ->
                    ok = esqlite3:bind(Stmt, Params),
                    step_until_done(Stmt),
                    {reply, ok, State};
                {error, _} = Err ->
                    {reply, Err, State}
            end
    end;

handle_call({query, Sql, Params}, _From, #state{db = Db} = State) ->
    case esqlite3:prepare(Db, Sql) of
        {ok, Stmt} ->
            case Params of
                [] -> ok;
                _ -> ok = esqlite3:bind(Stmt, Params)
            end,
            Rows = esqlite3:fetchall(Stmt),
            {reply, {ok, Rows}, State};
        {error, _} = Err ->
            {reply, Err, State}
    end;

handle_call(_Request, _From, State) ->
    {reply, {error, unknown_call}, State}.

handle_cast(_Msg, State) ->
    {noreply, State}.

handle_info(_Info, State) ->
    {noreply, State}.

terminate(_Reason, #state{db = Db}) ->
    esqlite3:close(Db).

%% Internal

step_until_done(Stmt) ->
    case esqlite3:step(Stmt) of
        '$done' -> ok;
        {error, Code} ->
            logger:error("[project_division_craftings_store] SQLite step error: ~p", [Code]),
            {error, Code};
        [_|_] -> step_until_done(Stmt)
    end.

create_tables(Db) ->
    Stmts = [
        "CREATE TABLE IF NOT EXISTS division_craftings (
            division_id TEXT PRIMARY KEY,
            venture_id TEXT NOT NULL,
            context_name TEXT,
            status INTEGER NOT NULL DEFAULT 0,
            status_label TEXT DEFAULT 'New',
            initiated_at INTEGER,
            initiated_by TEXT,
            opened_at INTEGER,
            shelved_at INTEGER,
            concluded_at INTEGER
        );",
        "CREATE INDEX IF NOT EXISTS idx_craftings_venture ON division_craftings(venture_id);",
        "CREATE INDEX IF NOT EXISTS idx_craftings_status ON division_craftings(status);",

        "CREATE TABLE IF NOT EXISTS generated_modules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            division_id TEXT NOT NULL,
            module_name TEXT NOT NULL,
            module_type TEXT,
            path TEXT,
            generated_at INTEGER NOT NULL,
            UNIQUE(division_id, module_name)
        );",

        "CREATE TABLE IF NOT EXISTS generated_tests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            division_id TEXT NOT NULL,
            test_name TEXT NOT NULL,
            module_name TEXT,
            path TEXT,
            generated_at INTEGER NOT NULL,
            UNIQUE(division_id, test_name)
        );",

        "CREATE TABLE IF NOT EXISTS test_suites (
            suite_id TEXT PRIMARY KEY,
            division_id TEXT NOT NULL,
            suite_name TEXT,
            run_at INTEGER NOT NULL
        );",

        "CREATE TABLE IF NOT EXISTS test_results (
            result_id TEXT PRIMARY KEY,
            division_id TEXT NOT NULL,
            suite_id TEXT,
            passed INTEGER DEFAULT 0,
            failed INTEGER DEFAULT 0,
            recorded_at INTEGER NOT NULL
        );",

        "CREATE TABLE IF NOT EXISTS releases (
            release_id TEXT PRIMARY KEY,
            division_id TEXT NOT NULL,
            version TEXT,
            delivered_at INTEGER NOT NULL
        );",

        "CREATE TABLE IF NOT EXISTS delivery_stages (
            stage_id TEXT PRIMARY KEY,
            division_id TEXT NOT NULL,
            release_id TEXT,
            stage_name TEXT,
            staged_at INTEGER NOT NULL
        );"
    ],
    lists:foreach(fun(Sql) -> ok = esqlite3:exec(Db, Sql) end, Stmts),
    ok.
