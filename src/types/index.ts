import { Debugger } from '../internal/debugger';

export type AST_MAP = {
    partials: Token[];
    keys: Token[];
    loops: Token[];
}
export interface CompilerArgs {
    template_name: string;
    caller_ctx: LoaderContext;
    caller_data ?: object;
    debug ?: Debugger;
}
export type ConfigType = 'ssr' | 'ssg';
export type ConfigArgType = SSROptions | SSGOptions;

export type DebugConfig = Required<DebugOptions>;
export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}
export type DebugEventSignature = 'file:change' | 'watch:init' | 'loader:init' | 'partial:load' | 'template:load';
export enum DebugEventMap {
    STATUS = 0,
    TRIGGER = 1,
    WARNING = 2,
    ERROR = 3
}
export type DebugEventPhase = -1 | 0 | 1 | 2;
export type DebugEventType = 0 | 1;
export type DebugEvent = {
	phase: DebugEventPhase;
	type: DebugEventMap;
	signature: DebugEventSignature;
	fatal: boolean;
}
export interface DebugOptions {
    logFile ?: string; // file to log to
    logMode ?: LogMode; // mode for logger to run in (must be verbose with logFile)
    logStrategy ?: LogStrategy; // strategy for writing logs
}

export type Entry = Array<string | object>;

export type HTMLPage = string;
export type HTMLChunkContent = string;

export interface RuntimeEvent extends DebugEvent {
    event_data: string | object
}

export type HTMLChunkType = 'template' | 'partial';
export type HTMLChunk = {
    type: HTMLChunkType;
    path: string;
    name: string;
    rawFile: HTMLChunkContent;
    renderedChunk ?: HTMLChunkContent;
    isCached: boolean;
    needsRehydrate: boolean;
}

export type Insertion = [
    string | object,
    Entry
];

export interface Loader {
    ctx: LoaderContext;
    template: ( name: string, data ?: object ) => HTMLPage;
}
export type LoaderContext = {
    config: SSROptions;
    chunks: HTMLChunk[];
};
export type LogMode = 'silent' | 'verbose';
// the method by which the debugger will process logging
export type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';
export type LIST_OR_VALUE<T> = T | T[];

export type MappedEntry = [
	key: MapType,
	value: MAP_OR_LIST<string>
];
export type MapType = 'todo_partials' | 'todo_keys' | 'todo_loops';
export type MAP_OR_LIST<T> = T[] | T[][];
export type MAP_OR_LIST_OR_VALUE<T> = LIST_OR_VALUE<T> | T[][][];
export type MappedValue = LIST_OR_VALUE<string>
export interface MapWithPartial {
    partialInput: object;
}

export type ParsableToken = {
    signature: string;
    exists: ( chunk: string ) => boolean;
    asList: ( chunk: string ) => string[];
}

// reserved for later user
export interface ProcessCacheConfig {
    ttl : number; //default 0
}
// reserved for later user
export interface ProcessCache {
    config: ProcessCacheConfig;
    timeStamp : Date; //calculated at runtime
    isClean ?: boolean; //default null
}
export type ProcessingTemplate = string;

export type ResolvedMap = {
    raw: HTMLChunkContent;
    render: HTMLChunkContent;
}
export type ResolvedMapItem = {
    replacer: string;
    insertion: MAP_OR_LIST_OR_VALUE<string>
}
export type RT_EVENT_DATA = {
    template_name: string;
    u_insert_map: object;
    c_insert_map: MapWithPartial;
}

// cleaned ssg cli optoins
export type SSGOptions = Required<USSGOptions>;
// cleaned arguments submitted to Loader constructor, defaulted if nonexistent
export type SSROptions = Required<USSROptions>;
//stores key value to test against ast target domstring
export type TargetMatchBuffer = {
    target: ProcessingTemplate;
    key: string;
}
//stores value assigned to key to test against target domstring
export type TargetReplaceBuffer = {
    target: ProcessingTemplate;
    key: string;
    value: string;
}
export type TemplateTuple = [
    string,
    Array<string | object>
]
export type toNarrowOptions = SSROptions | USSROptions;
// base options submitted by user to create a loader
export interface toLoadOptions extends UInput {
    pathRoot ?: string; // directory to look for relative to process.cwd() default: views
    templates ?: string; // directory to resolve templates from relative to pathRoot - default: 'pages'
    partials ?: string; // directory to resolve partials from relative to pathRoot - default 'partials'
    discoverPaths ?: boolean; // whether or not the runtime will walk the configured directory tree for chunks (default: false)
    intlCode ?: string; //html lang code (default 'en')
    preload ?: boolean; //whether or not to preload renderable chunks before they are called. (default true)
}
export type Token = {
    name: string;
    raw: string;
}

export type UDebugConfig = boolean | DebugOptions;
export interface UInput {
    partialInput ?: object; // constructor fallback for partial variables - default {}
    templateInput ?: object; // constructor fallback for template variables - default {}
    debug ?: UDebugConfig;
}
// optional arguments for the createLoader factory function exclusively
export interface USSROptions extends toLoadOptions {
	errorSuppression ?: boolean //whether or not to throw errors when it will affect template, or if the runtime should try to decide on a solution with what it has to work with in the given situation, even if that includes removing the chunk entirely.
    watch ?: boolean; // watches files at runtime - default false
}
// ssg cli options
export interface USSGOptions extends toLoadOptions {
    outPath: string; //default public
    loaderFile: string; //default cwd/hcl-config.js
    cleanup: boolean; //whether or not to clear the outPath before writing the files
}
