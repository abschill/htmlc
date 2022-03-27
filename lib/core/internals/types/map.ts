import { MAP_OR_LIST_OR_VALUE, MAP_OR_LIST } from './util';

export type DirtyMap = object;
export type MapType = 'todo_partials' | 'todo_keys' | 'todo_loops';
export type ASTMatch = RegExpMatchArray | String[] | []
export type STemplate = string;
export type RTemplate = string;
export type Template = string;

export interface RenderMap {
    todo_partials: ASTMatch;
    todo_keys: ASTMatch;
    todo_loops: ASTMatch;
}

export type MappedEntry = [
	key: MapType,
	value: MAP_OR_LIST<string>
];

export interface RMap extends DirtyMap {
    partialInput: DirtyMap;
}

export type MappedValue = string | string[];

export type Entry = Array<string | DirtyMap>;

export type Insertion = [
    string | DirtyMap,
    Entry
];

export type AST_TARGET = string;

//stores key value to test against ast target domstring
export type kBUF = {
    target: AST_TARGET;
    key: string;
}

//stores value assigned to key to test against target domstring
export type vBUF = {
    target: AST_TARGET;
    key: string;
    value: string;
}

export interface RLoopBUF {
    head: number;
    tail: number;
}

export type ResolvedMap = {
    raw: string;
    render: string;
}

export type ResolvedMapItem = {
    replacer: RTemplate;
    insertion: MAP_OR_LIST_OR_VALUE<RTemplate>
}

export type Dictionary<ReservedWord> = ReservedWord[];

export type ReservedWord = {
    key: string;
    boolean: ( a: kBUF ) => boolean;
    array: ( a: AST_TARGET ) => string[];
}