import Debugger from '../debugger';

export interface Loader {
    ctx: LoaderContext;
    template: ( name: string, data ?: object ) => string;
}

export type LogMode = 'silent' | 'verbose';

// the method by which the debugger will process logging
export type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';

// boolean to set true for defaults, leaving it blank in FF / constructor will just have the same effect as false
export type UserDebugConfig = boolean | DebugConfig;

export interface DebugConfig {
    logFile ?: string; // file to log to
    logMode ?: LogMode; // mode for logger to run in (must be verbose with logFile)
    logStrategy ?: LogStrategy; // strategy for writing logs 
}

export interface ProcessCacheConfig {
    ttl : number; //default 0
}

export interface ProcessCache {
    config: ProcessCacheConfig;
    timeStamp : Date; //calculated at runtime
    isClean ?: boolean; //default null
}

export type E_DebugConfig = Entity<DebugConfig>;

export interface BaseInput {
    partialInput ?: object; // constructor fallback for partial variables - default {}
    templateInput ?: object; // constructor fallback for template variables - default {}
    debug ?: UserDebugConfig; 
}

export interface BaseMappedConfig extends BaseInput {
    pathRoot ?: string; // directory to look for relative to process.cwd()
    templates ?: string; // directory to resolve tempaltes from relative to pathRoot - default 'pages'
    partials ?: string; // directory to resolve partials from relative to pathRoot - default 'partials'
    discoverPaths ?: boolean;
    intlCode ?: string;
}

// optional arguments for the factory function itself
export interface UserSSROptions extends BaseMappedConfig {
    watch ?: boolean; // watches files at runtime - default false
}

// ssg cli options
export interface UserSSGOptions extends BaseMappedConfig {
    outPath: string; //default public
    loaderFile: string; //default cwd/hcl-config.js
    cleanup: boolean; //whether or not to clear the outPath before writing the files
}
// cleaned ssg cli optoins
export type E_SSGOptions = Entity<UserSSGOptions>;

// determines if the optoins have been cleaned or still unclead from the function arguments
export type LoaderOptions = E_SSROptions | UserSSROptions;

// cleaned arguments submitted to constructor, defaulted if nonexistent
// only used the E_ENTITYNAME convention for internals, this one will be exposed to the public api
export type E_SSROptions = Entity<UserSSROptions>;

export type Entity<T> = {
    [Property in keyof T]-?: T[Property];
}

export type LIST_OR_VALUE<T> = T | T[];
export type MAP_OR_LIST<T> = T[] | T[][];
export type MAP_OR_LIST_OR_VALUE<T> = LIST_OR_VALUE<T> | T[][][];

export type ResolvedFile = {
    path: string;
    name: string;
    rawFile: string;
}

export type ConfigFallbackStrategy = 'package.json' | 'hcl-config.js';

export type loaderConfig = LIST_OR_VALUE<LoaderOptions>
export type staticConfig = UserSSGOptions;
export type RootConfigType = loaderConfig | staticConfig;

export type MapType = 'todo_partials' | 'todo_keys' | 'todo_loops';
export type ASTMatch = RegExpMatchArray | String[] | []

export interface RenderMap {
    todo_partials: ASTMatch;
    todo_keys: ASTMatch;
    todo_loops: ASTMatch;
}

export type MappedEntry = [
	key: MapType,
	value: MAP_OR_LIST<string>
];

export interface RMap {
    partialInput: object;
}

export type MappedValue = LIST_OR_VALUE<string>

export type Entry = Array<string | object>;

export type Insertion = [
    string | object,
    Entry
];

//stores key value to test against ast target domstring
export type TargetMatchBuffer = {
    target: string;
    key: string;
}

//stores value assigned to key to test against target domstring
export type TargetReplaceBuffer = {
    target: string;
    key: string;
    value: string;
}

export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}

export interface CompilerArgs {
    template_name: string;
    template_ctx: LoaderContext;
    template_data ?: object;
    _debugger: Debugger;
}

export type TargetDirectoryTree = {
    path: string;
    files: string[];
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
    replacer: string;
    insertion: MAP_OR_LIST_OR_VALUE<string>
}

export type LoaderContext = {
    config: E_SSROptions;
    partials: ResolvedFile[];
    templates: ResolvedFile[];
};

export type ReservedWord = {
    key: string;
    boolean: ( a: TargetMatchBuffer ) => boolean;
    array: ( a: string ) => string[];
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
    event_data: string | object
}