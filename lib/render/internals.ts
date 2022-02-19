import { Runtime } from '../loader';


export declare namespace hclInternal {

    type _match = RegExpMatchArray | []


    type _insertMap = object

    interface _mapSection extends _insertMap {
        '*' ?: _insertMap
    }

    interface compiledMap extends _insertMap { 
        partialInput: _mapSection
    }

    export interface RenderMap {
        todo_partials: _match
        todo_keys: _match
        todo_loops: _match
    }

    export type Resolved<RenderMap> = {
        raw: string
        renderMap: RenderMap
        insertionMap: object
        render: string
    }

    export type StackItem = { 
        replacer: Runtime.template
        insertion: Runtime.template | Runtime.template[] | Runtime.template[][] 
    }

    export type RenderTemplateArgs = {
        _toInsert: Object
        raw: string
        conf: Runtime.Options
    }
    
    export type Template = {
        path: string
        args: RenderTemplateArgs
        valueOf: string
    }
}

export declare namespace hclFS {

    type TargetDirectoryTree = { 
        path: string
        files: string[] 
    }

    type FileInputMeta = {
        path: string
        name: string
        rawFile: string
    }

    type fileUTF8 = string
}


export type _templateInsert = object | {} | any | null;

export interface TemplateInsertion {
    partialInput ?: TemplateInsertion;
}

export type Dictionary<ReservedWord> = Array<ReservedWord>

export type ReservedWord = {
    key: string;
    boolean: ( target: string, arr: string ) => boolean;
    array: ( target: string ) => hclInternal._match;
};

export interface LoaderContext {  
    template: ( name: string, data ?: object ) => Runtime.template 
};

export const DEFAULTS = {
    "_publishDefault" : "dist",
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