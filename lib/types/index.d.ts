import { Debugger } from '../internal/debugger';
export declare type ASTMatch = RegExpMatchArray | String[] | [];
export declare type AST_MAP = {
    todo_partials: Token[];
    todo_keys: Token[];
    todo_loops: Token[];
};
export interface CompilerArgs {
    template_name: string;
    caller_ctx: LoaderContext;
    caller_data?: object;
    debug?: Debugger;
}
export declare type ConfigType = 'ssr' | 'ssg';
export declare type ConfigArgType = SSROptions | SSGOptions;
export declare type DebugConfig = Required<DebugOptions>;
export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}
export declare type DebugEventSignature = 'file:change' | 'watch:init' | 'loader:init' | 'partial:load' | 'template:load';
export declare enum DebugEventMap {
    STATUS = 0,
    TRIGGER = 1,
    WARNING = 2,
    ERROR = 3
}
export declare type DebugEventPhase = -1 | 0 | 1 | 2;
export declare type DebugEventType = 0 | 1;
export declare type DebugEvent = {
    phase: DebugEventPhase;
    type: DebugEventMap;
    signature: DebugEventSignature;
    fatal: boolean;
};
export interface DebugOptions {
    logFile?: string;
    logMode?: LogMode;
    logStrategy?: LogStrategy;
}
export declare type Entry = Array<string | object>;
export declare type HTMLPage = string;
export declare type HTMLChunkContent = string;
export interface RuntimeEvent extends DebugEvent {
    event_data: string | object;
}
export declare type HTMLChunkType = 'template' | 'partial';
export declare type HTMLChunk = {
    type: HTMLChunkType;
    path: string;
    name: string;
    rawFile: HTMLChunkContent;
    renderedChunk?: HTMLChunkContent;
    isCached: boolean;
    needsRehydrate: boolean;
};
export declare type Insertion = [
    string | object,
    Entry
];
export interface Loader {
    ctx: LoaderContext;
    template: (name: string, data?: object) => HTMLPage;
}
export declare type LoaderContext = {
    config: SSROptions;
    chunks: HTMLChunk[];
};
export declare type LogMode = 'silent' | 'verbose';
export declare type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';
export declare type LIST_OR_VALUE<T> = T | T[];
export declare type MappedEntry = [
    key: MapType,
    value: MAP_OR_LIST<string>
];
export declare type MapType = 'todo_partials' | 'todo_keys' | 'todo_loops';
export declare type MAP_OR_LIST<T> = T[] | T[][];
export declare type MAP_OR_LIST_OR_VALUE<T> = LIST_OR_VALUE<T> | T[][][];
export declare type MappedValue = LIST_OR_VALUE<string>;
export interface MapWithPartial {
    partialInput: object;
}
export declare type ParsableToken = {
    signature: string;
    exists: (chunk: string) => boolean;
    asList: (chunk: string) => string[];
};
export interface ProcessCacheConfig {
    ttl: number;
}
export interface ProcessCache {
    config: ProcessCacheConfig;
    timeStamp: Date;
    isClean?: boolean;
}
export declare type ProcessingTemplate = string;
export interface RenderMap {
    todo_partials: ASTMatch;
    todo_keys: ASTMatch;
    todo_loops: ASTMatch;
}
export declare type ResolvedMap = {
    raw: HTMLChunkContent;
    render: HTMLChunkContent;
};
export declare type ResolvedMapItem = {
    replacer: string;
    insertion: MAP_OR_LIST_OR_VALUE<string>;
};
export declare type ReservedWord = {
    key: string;
    boolean: (a: TargetMatchBuffer) => boolean;
    array: (a: string) => string[];
};
export declare type RT_EVENT_DATA = {
    template_name: string;
    u_insert_map: object;
    c_insert_map: MapWithPartial;
};
export declare type SSGOptions = Required<USSGOptions>;
export declare type SSROptions = Required<USSROptions>;
export declare type TargetMatchBuffer = {
    target: ProcessingTemplate;
    key: string;
};
export declare type TargetReplaceBuffer = {
    target: ProcessingTemplate;
    key: string;
    value: string;
};
export declare type TemplateTuple = [
    string,
    Array<string | object>
];
export declare type toNarrowOptions = SSROptions | USSROptions;
export interface toLoadOptions extends UInput {
    pathRoot?: string;
    templates?: string;
    partials?: string;
    discoverPaths?: boolean;
    intlCode?: string;
    preload?: boolean;
}
export declare type Token = {
    name: string;
    raw: string;
};
export declare type UDebugConfig = boolean | DebugOptions;
export interface UInput {
    partialInput?: object;
    templateInput?: object;
    debug?: UDebugConfig;
}
export interface USSROptions extends toLoadOptions {
    errorSuppression?: boolean;
    watch?: boolean;
}
export interface USSGOptions extends toLoadOptions {
    outPath: string;
    loaderFile: string;
    cleanup: boolean;
}
