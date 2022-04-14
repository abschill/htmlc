export declare type Defaulted<T> = Readonly<Required<T>>;
export interface CompilerArgs {
    template_name: string;
    caller_ctx: LoaderContext;
    caller_data?: object;
}
export declare type ConfigStringType = 'ssr' | 'ssg';
export declare type ConfigType = SSROptions | SSGOptions;
export declare type SSGOptions = Defaulted<USSGOptions>;
export declare type SSROptions = Defaulted<USSROptions>;
export declare type UGlobalOptions = {
    pathRoot?: string;
    templates?: string;
    partials?: string;
    discoverPaths?: boolean;
    partialInput?: object;
    templateInput?: object;
    errorSuppression?: boolean;
    intlCode?: string;
    debug?: UUDebugConfig;
};
export declare type GlobalOptions = Defaulted<UGlobalOptions>;
export interface USSROptions extends UGlobalOptions {
    watch?: boolean;
}
export interface USSGOptions extends UGlobalOptions {
    outPath?: string;
    loaderFile?: string;
    cleanup?: boolean;
}
export declare type DebugConfig = Defaulted<UDebugConfig>;
export declare type DebugEventPhase = -1 | 0 | 1 | 2;
export declare type DebugEventStatus = 0 | 1 | 2;
export interface UDebugConfig {
    logFile?: string;
    logMode?: LogMode;
    logStrategy?: LogStrategy;
}
export declare type UUDebugConfig = boolean | UDebugConfig;
export declare type DebugEventSignature = 'file:change' | 'watch:init' | 'loader:init' | 'partial:load' | 'template:load';
export declare type DebugEventType = {
    phase: DebugEventPhase;
    signature: DebugEventSignature;
    fatal: boolean;
};
export declare type LogMode = 'silent' | 'verbose';
export declare type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';
export declare type AST_MAP = {
    partials: Token[];
    keys: Token[];
    loops: Token[];
};
export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}
export declare type Token = {
    name: string;
    raw: string;
};
export declare type HTMLPage = string;
export declare type HTMLChunkContent = string;
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
export interface Loader {
    ctx: LoaderContext;
    template: (name: string, data?: object) => HTMLPage;
}
export declare type LoaderContext = {
    config: SSROptions;
    chunks: HTMLChunk[];
};
export declare type LIST_OR_VALUE<T> = T | T[];
export declare type MAP_OR_LIST<T> = T[] | T[][];
export declare type MAP_OR_LIST_OR_VALUE<T> = LIST_OR_VALUE<T> | T[][][];
export declare type MappedValue = LIST_OR_VALUE<string>;
export interface MapWithPartial {
    partialInput: object;
}
export declare type RT_EVENT_DATA = {
    template_name: string;
    u_insert_map: object;
    c_insert_map: MapWithPartial;
};
