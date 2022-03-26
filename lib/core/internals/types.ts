export type coreContext = {
    config: ROptions;
    partials: FileInputMeta[];
    templates: FileInputMeta[];
};

export interface RuntimeState {
    ctx: coreContext;
    template: ( name: string, data ?: object ) => FTemplate;
}

export type coreEventArgs<T> = [
    T,
    coreContext
];

export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}

export type coreEventName = string;

export type ASTMatch = RegExpMatchArray | String[] | []

export interface Args {
    template_name: string;
    ctx: coreContext;
    data ?: UINSERT_MAP;
}

export interface RenderMap {
    todo_partials: ASTMatch;
    todo_keys: ASTMatch;
    todo_loops: ASTMatch;
}

export type Dictionary<ReservedWord> = Array<ReservedWord>

export type ReservedWord = {
    key: string;
    boolean: ( a: kBUF ) => boolean;
    array: ( a: AST_TARGET ) => Array<string>;
}

export type StackItem = {
    replacer: RTemplate;
    insertion: RTemplate | RTemplate[] | RTemplate[][];
}

export type UINSERT_MAP = object;

export interface compiledMap extends UINSERT_MAP {
    partialInput: UINSERT_MAP;
}

export type AST_TARGET = string;

//stores key value to test against ast target domstring
export type kBUF = {
    target: AST_TARGET
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

export type Entry = Array<string | UINSERT_MAP>;

export type Insertion = [
    string | UINSERT_MAP,
    Entry
];

export type Resolved<RenderMap> = {
    raw: string;
    render: string;
}

export type RenderTemplateArgs = {
    _toInsert: Object;
    raw: string;
    conf: ROptions;
}

export type TargetDirectoryTree = {
    path: string;
    files: string[];
}

export type FileInputMeta = {
    path: string;
    name: string;
    rawFile: string;
}

export type fileUTF8 = string;

export type fileJSON = object;

export type _templateInsert = object | {} | any | null;

export type RDebugOpts = boolean | {
    logFile: string;
    suppressFatal: boolean;
};

export type Entity<Type> = {
    [Property in keyof Type]-?: Type[Property];
}

export type Event<T> = {
    ( args: T ): T;
}

export type Options = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: UINSERT_MAP;
    templateInput ?: UINSERT_MAP;
    watch ?: boolean;
    debug ?: RDebugOpts;
};

export type ROptions = Entity<Options>;

export type RTemplate = string;
export type FTemplate = string;

export type SOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: UINSERT_MAP;
    templateInput ?: UINSERT_MAP;
    debug ?: RDebugOpts;
    outPath: string;
    loaderFile: string;
    cleanup: boolean;
}

export type SSGOptions = Entity<SOptions>;
export type STemplate = string;


export type MapType = 'todo_partials' | 'todo_keys' | 'todo_loops';

export type MappedEntry = [
	key: MapType,
	value: string[] | string[][]
];

export type MappedValue = string | string[];