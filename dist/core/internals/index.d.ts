import { core } from '../';
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
    type ASTMatch = RegExpMatchArray | String[] | [];
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
        boolean: (a: internals.kBUF) => boolean;
        array: (a: internals.AST_TARGET) => Array<string>;
    };
    type StackItem = {
        replacer: core.RTemplate;
        insertion: core.RTemplate | core.RTemplate[] | core.RTemplate[][];
    };
    type UINSERT_MAP = object;
    interface compiledMap extends UINSERT_MAP {
        partialInput: UINSERT_MAP;
    }
}
export declare namespace internals {
    type AST_TARGET = string;
    type kBUF = {
        target: AST_TARGET;
        key: string;
    };
    type vBUF = {
        target: AST_TARGET;
        key: string;
        value: string;
    };
    interface RLoopBUF {
        head: number;
        tail: number;
    }
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
        conf: core.ROptions;
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
    type fileJSON = object;
    type _templateInsert = object | {} | any | null;
}
export declare const _DEFAULTS: core.Entity<core.Options>;
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
    pathRoot: string;
    templates: string;
    partials: string;
    partialInput: object;
    templateInput: object;
    watch: boolean;
    debug: core.RDebugOpts;
};
