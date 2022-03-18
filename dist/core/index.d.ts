import { internals, compiler } from './internals';
export declare namespace core {
    type Context = {
        config: ROptions;
        partials: internals.FileInputMeta[];
        templates: internals.FileInputMeta[];
    };
    interface RuntimeState {
        ctx: core.Context;
        template: (name: string, data?: object) => core.RTemplate;
    }
    type RDebugOpts = boolean | {
        logFile: string;
        suppressFatal: boolean;
    };
    type Entity<Type> = {
        [Property in keyof Type]-?: Type[Property];
    };
    type Event<T> = {
        (args: T): T;
    };
    type Options = {
        pathRoot?: string;
        templates?: string;
        partials?: string;
        partialInput?: compiler.UINSERT_MAP;
        templateInput?: compiler.UINSERT_MAP;
        watch?: boolean;
        debug?: RDebugOpts;
    };
    type ROptions = Entity<Options>;
    type RTemplate = string;
    type SOptions = {
        pathRoot?: string;
        templates?: string;
        partials?: string;
        partialInput?: compiler.UINSERT_MAP;
        templateInput?: compiler.UINSERT_MAP;
        debug?: RDebugOpts;
        outPath: string;
        loaderFile: string;
        cleanup: boolean;
    };
    type SSGOptions = Entity<SOptions>;
    type STemplate = string;
}
declare const render: (declaredPartials: internals.FileInputMeta[], rawFile: internals.fileUTF8, insertMap: compiler.UINSERT_MAP, debug?: boolean) => core.RTemplate;
export default render;
