import { core } from '../loader';
export declare namespace internals {
    type EventName = string;
    type EventArgs<T> = [
        T,
        core.Context,
        IArguments
    ];
    interface CompilerArgs {
        template_name: string;
        ctx: core.Context;
        data?: UINSERT_MAP;
    }
    type Entry = Array<string | UINSERT_MAP>;
    type Insertion = [
        string | UINSERT_MAP,
        Entry
    ];
    type _match = RegExpMatchArray | [];
    type UINSERT_MAP = object;
    interface compiledMap extends UINSERT_MAP {
        partialInput: UINSERT_MAP;
    }
    interface RenderMap {
        todo_partials: _match;
        todo_keys: _match;
        todo_loops: _match;
    }
    type Resolved<RenderMap> = {
        raw: string;
        renderMap: RenderMap;
        insertionMap: UINSERT_MAP;
        render: string;
    };
    type StackItem = {
        replacer: core.template;
        insertion: core.template | core.template[] | core.template[][];
    };
    type RenderTemplateArgs = {
        _toInsert: Object;
        raw: string;
        conf: core.Options;
    };
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
    type _templateInsert = object | {} | any | null;
    interface TemplateInsertion {
        partialInput?: TemplateInsertion;
    }
    type Dictionary<ReservedWord> = Array<ReservedWord>;
    type ReservedWord = {
        key: string;
        boolean: (target: string, arr: string) => boolean;
        array: (target: string) => RegExpMatchArray | null;
    };
    interface RuntimeState {
        conf: core.Context;
        template: (name: string, data?: object) => core.template;
    }
}
export declare const _DEFAULTS: core.Options;
export declare const DEFAULTS: {
    _publishDefault: string;
    outDefault: string;
    static_config: {
        pathRoot: string;
        partials: string;
        templates: string;
        outPath: string;
        loaderFile: string;
        cleanup: boolean;
    };
    pathRoot?: string;
    templates?: string;
    partials?: string;
    partialInput?: object;
    templateInput?: object;
    watch?: boolean;
    debug?: boolean;
};
export declare class hclDebugger {
    constructor();
    static _registerEvent(...args: internals.EventArgs<internals.EventName>): void;
}
