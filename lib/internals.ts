import { Runtime } from './loader';

export type RenderTemplateArgs = {
    _toInsert: Object
    raw: string
    conf: Runtime.Options
};

export type Template = {
    path: string
    args: RenderTemplateArgs
    valueOf: string
};

export type TargetDirectoryTree = { 
    path: string, files: string[] 
};

export type FileInputMeta = {
    path: string
    name: string
    rawFile: string
};

export interface RenderMap {
    todo_partials: string[]
    todo_keys: string[]
    todo_loops: string[]
};

export type Resolved<RenderMap> = {
    raw: string
    renderMap: RenderMap
    insertionMap: object
    render: string
};

export type StackItem = { 
    replacer: Runtime.template
    insertion: Runtime.template | Runtime.template[] | Runtime.template[][] 
};

export type Dictionary<ReservedWord> = Array<ReservedWord>

export type ReservedWord = {
    key: string;
    boolean: ( target: string, arr: string ) => boolean;
    array: ( target: string ) => RegExpMatchArray | null;
};


export const DEFAULTS = {
    "_publishDefault":"dist",
    "pathRoot":"views",
    "partials":"partials",
    "templates":"pages",
    "outDefault":"public",
    "static_config": {
        "pathRoot": "views",
        "partials": "partials",
        "templates": "pages",
        "outPath": "public",
        "loaderFile":"loader.js",
        "cleanup":true
    }
}