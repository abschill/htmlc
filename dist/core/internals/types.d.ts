export declare type coreContext = {
    config: ROptions;
    partials: FileInputMeta[];
    templates: FileInputMeta[];
};
export interface RuntimeState {
    ctx: coreContext;
    template: (name: string, data?: object) => FTemplate;
}
export declare type coreEventArgs<T> = [
    T,
    coreContext
];
export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}
export declare type coreEventName = string;
export declare type ASTMatch = RegExpMatchArray | String[] | [];
export interface Args {
    template_name: string;
    ctx: coreContext;
    data?: UINSERT_MAP;
}
export interface RenderMap {
    todo_partials: ASTMatch;
    todo_keys: ASTMatch;
    todo_loops: ASTMatch;
}
export declare type Dictionary<ReservedWord> = Array<ReservedWord>;
export declare type ReservedWord = {
    key: string;
    boolean: (a: kBUF) => boolean;
    array: (a: AST_TARGET) => Array<string>;
};
export declare type StackItem = {
    replacer: RTemplate;
    insertion: RTemplate | RTemplate[] | RTemplate[][];
};
export declare type UINSERT_MAP = object;
export interface compiledMap extends UINSERT_MAP {
    partialInput: UINSERT_MAP;
}
export declare type AST_TARGET = string;
export declare type kBUF = {
    target: AST_TARGET;
    key: string;
};
export declare type vBUF = {
    target: AST_TARGET;
    key: string;
    value: string;
};
export interface RLoopBUF {
    head: number;
    tail: number;
}
export declare type Entry = Array<string | UINSERT_MAP>;
export declare type Insertion = [
    string | UINSERT_MAP,
    Entry
];
export declare type Resolved<RenderMap> = {
    raw: string;
    renderMap: RenderMap;
    insertionMap: UINSERT_MAP;
    render: string;
};
export declare type RenderTemplateArgs = {
    _toInsert: Object;
    raw: string;
    conf: ROptions;
};
export declare type TargetDirectoryTree = {
    path: string;
    files: string[];
};
export declare type FileInputMeta = {
    path: string;
    name: string;
    rawFile: string;
};
export declare type fileUTF8 = string;
export declare type fileJSON = object;
export declare type _templateInsert = object | {} | any | null;
export declare type RDebugOpts = boolean | {
    logFile: string;
    suppressFatal: boolean;
};
export declare type Entity<Type> = {
    [Property in keyof Type]-?: Type[Property];
};
export declare type Event<T> = {
    (args: T): T;
};
export declare type Options = {
    pathRoot?: string;
    templates?: string;
    partials?: string;
    partialInput?: UINSERT_MAP;
    templateInput?: UINSERT_MAP;
    watch?: boolean;
    debug?: RDebugOpts;
};
export declare type ROptions = Entity<Options>;
export declare type RTemplate = string;
export declare type FTemplate = string;
export declare type SOptions = {
    pathRoot?: string;
    templates?: string;
    partials?: string;
    partialInput?: UINSERT_MAP;
    templateInput?: UINSERT_MAP;
    debug?: RDebugOpts;
    outPath: string;
    loaderFile: string;
    cleanup: boolean;
};
export declare type SSGOptions = Entity<SOptions>;
export declare type STemplate = string;
