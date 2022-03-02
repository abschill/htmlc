import { core } from '../loader';
export declare namespace coreEvent {
    type Name = string;
    type Args<T> = [
        T,
        core.Context,
        IArguments
    ];
    interface Trigger<T> {
        name: string;
        signature: Args<T>;
    }
}
export declare namespace compiler {
    type ASTMatch = RegExpMatchArray | [];
    interface Args {
        template_name: string;
        ctx: core.Context;
        data?: compiler.UINSERT_MAP;
    }
    interface RenderMap {
        todo_partials: ASTMatch;
        todo_keys: ASTMatch;
        todo_loops: ASTMatch;
    }
    type Dictionary<ReservedWord> = Array<ReservedWord>;
    type ReservedWord = {
        key: string;
        boolean: (target: string, arr: string) => boolean;
        array: (target: string) => RegExpMatchArray | null;
    };
    type StackItem = {
        replacer: core.template;
        insertion: core.template | core.template[] | core.template[][];
    };
    type UINSERT_MAP = object;
    interface compiledMap extends UINSERT_MAP {
        partialInput: UINSERT_MAP;
    }
}
export declare namespace internals {
    type Entry = Array<string | compiler.UINSERT_MAP>;
    type Insertion = [
        string | compiler.UINSERT_MAP,
        Entry
    ];
    type Resolved<RenderMap> = {
        raw: string;
        renderMap: RenderMap;
        insertionMap: compiler.UINSERT_MAP;
        render: string;
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
    interface RuntimeState {
        ctx: core.Context;
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
export declare class Debugger {
    constructor();
    static _registerEvent(...args: coreEvent.Args<coreEvent.Name>): void;
    static _registerMap(rmap: compiler.RenderMap, imap: compiler.UINSERT_MAP): void;
}
