import { internals, compiler } from './core/internals';
export declare namespace core {
    interface RuntimeState {
        ctx: core.Context;
        template: (name: string, data?: object) => core.template;
    }
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
        debug?: boolean;
    };
    type ROptions = Entity<Options>;
    type Context = {
        config: ROptions;
        partials: internals.FileInputMeta[];
        templates: internals.FileInputMeta[];
    };
    type template = string;
    type StaticOptions = {
        load_options: ROptions;
        static_options: {
            cleanup: boolean;
            outPath: string;
            loaderFile: string | string[];
        };
    };
}
export declare function Loader(config?: core.Options): core.RuntimeState;
