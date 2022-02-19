import { Runtime } from '../loader';
export declare namespace hclInternal {
    type _match = RegExpMatchArray | [];
    type _insertMap = object;
    interface compiledMap extends _insertMap {
        partialInput: _insertMap;
    }
    interface RenderMap {
        todo_partials: _match;
        todo_keys: _match;
        todo_loops: _match;
    }
    type Resolved<RenderMap> = {
        raw: string;
        renderMap: RenderMap;
        insertionMap: object;
        render: string;
    };
    type StackItem = {
        replacer: Runtime.template;
        insertion: Runtime.template | Runtime.template[] | Runtime.template[][];
    };
    type RenderTemplateArgs = {
        _toInsert: Object;
        raw: string;
        conf: Runtime.Options;
    };
    type Template = {
        path: string;
        args: RenderTemplateArgs;
        valueOf: string;
    };
}
export declare namespace hclFS {
    type TargetDirectoryTree = {
        path: string;
        files: string[];
    };
    type FileInputMeta = {
        path: string;
        name: string;
        rawFile: string;
    };
    type fileUTF8 = string;
}
export declare type _templateInsert = object | {} | any | null;
export interface TemplateInsertion {
    partialInput?: TemplateInsertion;
}
export declare type Dictionary<ReservedWord> = Array<ReservedWord>;
export declare type ReservedWord = {
    key: string;
    boolean: (target: string, arr: string) => boolean;
    array: (target: string) => hclInternal._match;
};
export interface LoaderContext {
    template: (name: string, data?: object) => Runtime.template;
}
export declare const DEFAULTS: {
    _publishDefault: string;
    pathRoot: string;
    partials: string;
    templates: string;
    outDefault: string;
    static_config: {
        pathRoot: string;
        partials: string;
        templates: string;
        outPath: string;
        loaderFile: string;
        cleanup: boolean;
    };
};
