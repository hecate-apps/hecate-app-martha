%%% @doc SQLite store for project_division_kanbans read models.
%%%
%%% Tables: division_kanbans, kanban_cards
%%% @end
-module(project_division_kanbans_store).
-behaviour(gen_server).

-export([start_link/0, init_schema/0, execute/1, execute/2, query/1, query/2]).
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2]).

-record(state, {db :: esqlite3:esqlite3()}).

-spec start_link() -> {ok, pid()} | {error, term()}.
start_link() ->
    gen_server:start_link({local, ?MODULE}, ?MODULE, [], []).

init([]) ->
    DbPath = app_marthad_paths:sqlite_path("project_division_kanbans.db"),
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
            logger:error("[project_division_kanbans_store] SQLite step error: ~p", [Code]),
            {error, Code};
        [_|_] -> step_until_done(Stmt)
    end.

create_tables(Db) ->
    Stmts = [
        "CREATE TABLE IF NOT EXISTS division_kanbans (
            division_id TEXT PRIMARY KEY,
            venture_id TEXT NOT NULL,
            context_name TEXT,
            status INTEGER NOT NULL DEFAULT 0,
            status_label TEXT DEFAULT 'New',
            initiated_at INTEGER,
            initiated_by TEXT
        );",
        "CREATE INDEX IF NOT EXISTS idx_kanbans_venture ON division_kanbans(venture_id);",
        "CREATE INDEX IF NOT EXISTS idx_kanbans_status ON division_kanbans(status);",

        "CREATE TABLE IF NOT EXISTS kanban_cards (
            card_id TEXT PRIMARY KEY,
            division_id TEXT NOT NULL,
            title TEXT,
            description TEXT,
            card_type TEXT,
            status INTEGER NOT NULL DEFAULT 1,
            status_text TEXT DEFAULT 'posted',
            posted_by TEXT,
            posted_at INTEGER,
            picked_by TEXT,
            picked_at INTEGER,
            finished_at INTEGER,
            parked_by TEXT,
            parked_at INTEGER,
            park_reason TEXT,
            blocked_by TEXT,
            blocked_at INTEGER,
            block_reason TEXT
        );",
        "CREATE INDEX IF NOT EXISTS idx_cards_division ON kanban_cards(division_id);",
        "CREATE INDEX IF NOT EXISTS idx_cards_status ON kanban_cards(status);",
        "CREATE INDEX IF NOT EXISTS idx_cards_status_text ON kanban_cards(status_text);"
    ],
    lists:foreach(fun(Sql) -> ok = esqlite3:exec(Db, Sql) end, Stmts),
    ok.
