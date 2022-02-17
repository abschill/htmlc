import { Runtime } from './loader';
export declare type RenderTemplateArgs = {
    _toInsert: Object;
    raw: string;
    conf: Runtime.Options;
};
export declare type Template = {
    path: string;
    args: RenderTemplateArgs;
    valueOf: string;
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
export declare type RenderMap = {
    todo_partials: string[];
    todo_keys: string[];
    todo_loops: string[];
};
export declare type ResolvedRender = {
    raw: string;
    renderMap: RenderMap;
    insertionMap: object;
    render: string;
};
export declare type StackItem = {
    replacer: Runtime.template;
    insertion: Runtime.template | object | Runtime.template[] | object[];
};
export declare type Dictionary<ReservedWord> = Array<ReservedWord>;
export declare type ReservedWord = {
    key: string;
    boolean: (target: string, arr: string) => boolean;
    array: (target: string) => RegExpMatchArray;
};
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
