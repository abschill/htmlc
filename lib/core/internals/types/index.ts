import Debugger from '../debugger';

export type CoreContext = {
    config: CoreOptions;
    partials: FileInputMeta[];
    templates: FileInputMeta[];
};

export interface Loader {
    ctx: CoreContext;
    template: ( name: string, data ?: object ) => Template;
}

export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}

export interface CompilerArgs {
    template_name: string;
    template_ctx: CoreContext;
    template_data ?: DirtyMap;
    _debugger: Debugger;
}

export type TargetDirectoryTree = {
    path: string;
    files: string[];
}

export type fileUTF8 = string;
export type fileJSON = object;

export type LogMode = 'silent' | 'verbose';

// the method by which the debugger will process logging
export type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';

// boolean to set true for defaults, leaving it blank in FF / constructor will just have the same effect as false
export type UserDebugConfig = boolean | DebugConfig;

export interface DebugConfig {
    logFile ?: string;
    logMode ?: LogMode;
    logStrategy ?: LogStrategy;
}
export type E_DebugConfig = Entity<DebugConfig>;

// ssg cli options
export type UserSSGOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    debug ?: UserDebugConfig;
    outPath: string;
    loaderFile: string;
    cleanup: boolean;
}
// cleaned ssg cli optoins
export type E_SSGOptions = Entity<UserSSGOptions>;

// determines if the optoins have been cleaned or still unclead from the function arguments
export type LoaderOptions = CoreOptions | LoadOptions;

// optional arguments for the factory function itself
export type LoadOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    watch ?: boolean;
    debug ?: UserDebugConfig;
};

// cleaned arguments submitted to constructor, defaulted if nonexistent
// only used the E_ENTITYNAME convention for internals, this one will be exposed to the public api
export type CoreOptions = Entity<LoadOptions>;

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
export type RT_EVENT_DATA = {
    template_name: string; 
    u_insert_map: object; 
    c_insert_map: RMap;
}

export type HCL_EVENT_SIGNATURE = 'file:change' | 'watch:init' | 'loader:init' | 'template:load';

export enum HCL_EVENT_TYPE_MAP {
    STATUS = 0,
    TRIGGER = 1,
    WARNING = 2,
    ERROR = 3
}

export type HCL_EVENT_PHASE = -1 | 0 | 1 | 2;
export type HCL_EVENT_TYPE = 0 | 1;


export type HCL_EVENT = {
	phase: HCL_EVENT_PHASE;
	type: HCL_EVENT_TYPE_MAP;
	signature: HCL_EVENT_SIGNATURE;
	fatal: boolean;
}

export interface HCL_RUNTIME_EVENT extends HCL_EVENT {
    event_data: string | object;
}
export type Entity<T> = {
    [Property in keyof T]-?: T[Property];
}

export type LIST_OR_VALUE<T> = T | T[];
export type MAP_OR_LIST<T> = T[] | T[][];
export type MAP_OR_LIST_OR_VALUE<T> = LIST_OR_VALUE<T> | T[][][];

export type FileInputMeta = {
    path: string;
    name: string;
    rawFile: string;
}
