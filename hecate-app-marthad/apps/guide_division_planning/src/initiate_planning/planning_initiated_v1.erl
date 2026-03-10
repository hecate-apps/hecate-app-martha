%%% @doc planning_initiated_v1 event
%%% Emitted when a division planning dossier is initiated.
-module(planning_initiated_v1).

-export([new/1, to_map/1, from_map/1]).
-export([get_division_id/1, get_venture_id/1, get_context_name/1,
         get_initiated_by/1, get_initiated_at/1]).

-record(planning_initiated_v1, {
    division_id  :: binary(),
    venture_id   :: binary() | undefined,
    context_name :: binary(),
    initiated_by :: binary() | undefined,
    initiated_at :: non_neg_integer()
}).

-export_type([planning_initiated_v1/0]).
-opaque planning_initiated_v1() :: #planning_initiated_v1{}.

-dialyzer({nowarn_function, [new/1, from_map/1]}).

-spec new(map()) -> planning_initiated_v1().
new(#{division_id := DivisionId, context_name := ContextName} = Params) ->
    #planning_initiated_v1{
        division_id = DivisionId,
        venture_id = maps:get(venture_id, Params, undefined),
        context_name = ContextName,
        initiated_by = maps:get(initiated_by, Params, undefined),
        initiated_at = erlang:system_time(millisecond)
    }.

-spec to_map(planning_initiated_v1()) -> map().
to_map(#planning_initiated_v1{} = E) ->
    #{
        <<"event_type">> => <<"planning_initiated_v1">>,
        <<"division_id">> => E#planning_initiated_v1.division_id,
        <<"venture_id">> => E#planning_initiated_v1.venture_id,
        <<"context_name">> => E#planning_initiated_v1.context_name,
        <<"initiated_by">> => E#planning_initiated_v1.initiated_by,
        <<"initiated_at">> => E#planning_initiated_v1.initiated_at
    }.

-spec from_map(map()) -> {ok, planning_initiated_v1()} | {error, term()}.
from_map(Map) ->
    DivisionId = get_value(division_id, Map),
    case DivisionId of
        undefined -> {error, invalid_event};
        _ ->
            {ok, #planning_initiated_v1{
                division_id = DivisionId,
                venture_id = get_value(venture_id, Map, undefined),
                context_name = get_value(context_name, Map, undefined),
                initiated_by = get_value(initiated_by, Map, undefined),
                initiated_at = get_value(initiated_at, Map, erlang:system_time(millisecond))
            }}
    end.

%% Accessors
-spec get_division_id(planning_initiated_v1()) -> binary().
get_division_id(#planning_initiated_v1{division_id = V}) -> V.

-spec get_venture_id(planning_initiated_v1()) -> binary() | undefined.
get_venture_id(#planning_initiated_v1{venture_id = V}) -> V.

-spec get_context_name(planning_initiated_v1()) -> binary().
get_context_name(#planning_initiated_v1{context_name = V}) -> V.

-spec get_initiated_by(planning_initiated_v1()) -> binary() | undefined.
get_initiated_by(#planning_initiated_v1{initiated_by = V}) -> V.

-spec get_initiated_at(planning_initiated_v1()) -> non_neg_integer().
get_initiated_at(#planning_initiated_v1{initiated_at = V}) -> V.

%% Internal helper
get_value(Key, Map) ->
    get_value(Key, Map, undefined).

get_value(Key, Map, Default) when is_atom(Key) ->
    BinKey = atom_to_binary(Key, utf8),
    case maps:find(Key, Map) of
        {ok, V} -> V;
        error ->
            case maps:find(BinKey, Map) of
                {ok, V} -> V;
                error -> Default
            end
    end.
