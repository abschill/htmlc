export type CoreContext = {
    config: CoreOptions;
    partials: FileInputMeta[];
    templates: FileInputMeta[];
};

export interface HCL_Runtime {
    ctx: CoreContext;
    template: ( name: string, data ?: object ) => Template;
}

export interface DEP_TAG {
    old: string;
    new: string;
    v_change: string;
}

export type ASTMatch = RegExpMatchArray | String[] | []

export interface CompilerArgs {
    template_name: string;
    ctx: CoreContext;
    data ?: DirtyMap;
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

export type ResolvedMapItem = {
    replacer: RTemplate;
    insertion: RTemplate | RTemplate[] | RTemplate[][];
}

export type DirtyMap = object;

export interface RMap extends DirtyMap {
    partialInput: DirtyMap;
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

export type Entry = Array<string | DirtyMap>;

export type Insertion = [
    string | DirtyMap,
    Entry
];

export type ResolvedMap = {
    raw: string;
    render: string;
}

export type RenderTemplateArgs = {
    _toInsert: Object;
    raw: string;
    conf: CoreOptions;
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

export type DebugOptions = boolean | {
    logFile ?: string;
    logMode ?: LogMode;
    logStrategy ?: LogStrategy;
};

export type Entity<Type> = {
    [Property in keyof Type]-?: Type[Property];
}

export type LoadOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    watch ?: boolean;
    debug ?: DebugOptions;
};

export type CoreOptions = Entity<LoadOptions>;

export type RTemplate = string;
export type Template = string;

export type SOptions = {
    pathRoot ?: string;
    templates ?: string;
    partials ?: string;
    partialInput ?: DirtyMap;
    templateInput ?: DirtyMap;
    debug ?: DebugOptions;
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

export type LogMode = 'silent' | 'normal' | 'verbose';

export type LogStrategy = 'fs' | 'stdout' | 'both';

export type Options = CoreOptions | LoadOptions;