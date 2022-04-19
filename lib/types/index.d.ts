export declare type Defaulted<T> = Readonly<Required<T>>;
export interface CompilerArgs {
    templateName: string;
    ctx: LoaderContext;
    callData?: object;
    debugger?: Debugger;
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
export declare type AnyLoadConfig = GlobalOptions | UGlobalOptions | USSGOptions | USSROptions | SSROptions | SSGOptions;
export declare type DebugLogArgs = [eventSignature: DebugEventSignature, data: unknown];
export declare type Debugger = {
    log: (...DebugLogArgs: any[]) => void;
};
export declare type DebugConfig = Defaulted<UDebugConfig>;
export declare enum DebugEventPhase {
    UNSPECIFIED = -1,
    RUNTIME_INIT = 0,
    CHUNK_RESOLVE = 1,
    CHUNK_TOKENIZE = 2,
    CHUNK_RENDER = 3
}
export declare enum DebugEventStatus {
    VERBOSE = 0,
    DEFAULT = 1,
    CRITICAL = 2
}
export interface UDebugConfig {
    logFile?: string;
    logMode?: LogMode;
    logStrategy?: LogStrategy;
}
export declare type UUDebugConfig = boolean | UDebugConfig;
export declare type DebugEventSignature = 'parser:tokenize' | 'file:change' | 'watch:init' | 'loader:init' | 'compiler:resolutions' | 'partial:load' | 'template:load';
export declare type DebugEventType = {
    phase: DebugEventPhase;
    signature: DebugEventSignature;
    fatal: boolean;
};
export declare type LogMode = 'silent' | 'verbose' | 'considerate';
export declare type LogStrategy = 'none' | 'fs' | 'stdout' | 'both';
export interface CallerDebugArgs {
    errorSuppression: boolean;
    logMode: LogMode;
    logStrategy: LogStrategy;
    debugger: Debugger;
}
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
export declare type HTMLChunkRenderArgs = [name: string, data?: object];
export declare type HTMLChunkRenderFN = (...HTMLChunkRenderArgs: any[]) => HTMLPage;
export interface HTMLChunkLoader {
    ctx: LoaderContext;
    template: HTMLChunkRenderFN;
}
export declare type LoaderContext = {
    config: SSROptions;
    chunks: HTMLChunk[];
};
export interface MapWithPartial {
    partialInput: object;
}
export { Locale, toLocale } from './locale';
