import { internals } from './core/internals';
export declare namespace core {
    type Event<T> = {
        (args: T): T;
    };
    type Options = {
        pathRoot?: string;
        templates?: string;
        partials?: string;
        partialInput?: internals.UINSERT_MAP;
        templateInput?: internals.UINSERT_MAP;
        watch?: boolean;
        debug?: boolean;
    };
    type ROptions = {
        pathRoot: string;
        templates: string;
        partials: string;
        partialInput: internals.UINSERT_MAP;
        templateInput: internals.UINSERT_MAP;
        watch: boolean;
        debug: boolean;
    };
    type Context = {
        config: Options;
        partials: internals.FileInputMeta[];
        templates: internals.FileInputMeta[];
    };
    type template = string;
    type StaticOptions = {
        load_options: Options;
        static_options: {
            cleanup: boolean;
            outPath: string;
            loaderFile: string | string[];
        };
    };
}
export declare const Loader: (config?: core.Options) => internals.RuntimeState;
