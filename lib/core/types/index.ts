import { Debugger } from '../internals/debugger';

export type ASTMatch = RegExpMatchArray | String[] | [];

export interface CompilerArgs {
    template_name: string;
    template_ctx: LoaderContext;
    template_data ?: object;
    _debugger: Debugger;
}

export type ConfigFallbackStrategy = 'package.json' | 'hcl-config.js';

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

export interface RenderMap {
    todo_partials: ASTMatch;
    todo_keys: ASTMatch;
    todo_loops: ASTMatch;
}
export type ResolvedMap = {
    raw: HTMLChunkContent;
    render: HTMLChunkContent;
}
export type ResolvedMapItem = {
    replacer: string;
    insertion: MAP_OR_LIST_OR_VALUE<string>
}
export type ReservedWord = {
    key: string;
    boolean: ( a: TargetMatchBuffer ) => boolean;
    array: ( a: string ) => string[];
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

export type TargetDirectoryTree = {
    path: string;
    files: string[];
}
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
export type toNarrowOptions = SSROptions | USSROptions;
// base options submitted by user to create a loader
export interface toLoadOptions extends UInput {
    pathRoot ?: string; // directory to look for relative to process.cwd()
    templates ?: string; // directory to resolve tempaltes from relative to pathRoot - default 'pages'
    partials ?: string; // directory to resolve partials from relative to pathRoot - default 'partials'
    discoverPaths ?: boolean;
    intlCode ?: string;
    preload ?: boolean;
}

export type UDebugConfig = boolean | DebugOptions;
export interface UInput {
    partialInput ?: object; // constructor fallback for partial variables - default {}
    templateInput ?: object; // constructor fallback for template variables - default {}
    debug ?: UDebugConfig; 
}
// optional arguments for the createLoader factory function exclusively
export interface USSROptions extends toLoadOptions {
    watch ?: boolean; // watches files at runtime - default false
}
// ssg cli options
export interface USSGOptions extends toLoadOptions {
    outPath: string; //default public
    loaderFile: string; //default cwd/hcl-config.js
    cleanup: boolean; //whether or not to clear the outPath before writing the files
}
