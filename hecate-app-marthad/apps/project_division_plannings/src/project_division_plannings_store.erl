%%% @doc SQLite store for project_division_plannings read models.
%%%
%%% Tables: division_plannings, designed_aggregates, designed_events,
%%%          planned_desks, planned_dependencies
%%% @end
-module(project_division_plannings_store).
-behaviour(gen_server).

-export([start_link/0, init_schema/0, execute/1, execute/2, query/1, query/2]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-record(state, {db :: esqlite3:esqlite3()}).

-spec start_link() -> {ok, pid()} | {error, term()}.
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    DbPath = app_marthad_paths:sqlite_path("project_division_plannings.db"),
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
            logger:error("[project_division_plannings_store] SQLite step error: ~p", [Code]),
            {error, Code};
        [_|_] -> step_until_done(Stmt)
    end.

create_tables(Db) ->
    Stmts = [
        "CREATE TABLE IF NOT EXISTS division_plannings (
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
        "CREATE INDEX IF NOT EXISTS idx_plannings_venture ON division_plannings(venture_id);",
        "CREATE INDEX IF NOT EXISTS idx_plannings_status ON division_plannings(status);",

        "CREATE TABLE IF NOT EXISTS designed_aggregates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            division_id TEXT NOT NULL,
            aggregate_name TEXT NOT NULL,
            description TEXT,
            stream_prefix TEXT,
            fields TEXT,
            designed_at INTEGER NOT NULL,
            UNIQUE(division_id, aggregate_name)
        );",

        "CREATE TABLE IF NOT EXISTS designed_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            division_id TEXT NOT NULL,
            event_name TEXT NOT NULL,
            description TEXT,
            aggregate_name TEXT,
            fields TEXT,
            designed_at INTEGER NOT NULL,
            UNIQUE(division_id, event_name)
        );",

        "CREATE TABLE IF NOT EXISTS planned_desks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            division_id TEXT NOT NULL,
            desk_name TEXT NOT NULL,
            description TEXT,
            department TEXT,
            commands TEXT,
            planned_at INTEGER NOT NULL,
            UNIQUE(division_id, desk_name)
        );",

        "CREATE TABLE IF NOT EXISTS planned_dependencies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            division_id TEXT NOT NULL,
            dependency_id TEXT NOT NULL,
            from_desk TEXT,
            to_desk TEXT,
            dep_type TEXT,
            planned_at INTEGER NOT NULL,
            UNIQUE(division_id, dependency_id)
        );"
    ],
    lists:foreach(fun(Sql) -> ok = esqlite3:exec(Db, Sql) end, Stmts),
    ok.
