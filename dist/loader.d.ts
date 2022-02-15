import { FileInputMeta } from './internals';
export declare namespace Runtime {
    type Options = {
        pathRoot?: string;
        templates?: string;
        partials?: string;
        partialInput?: object;
        templateInput?: object;
        watch?: boolean;
        debug?: boolean;
    };
    type Context = {
        config: Options;
        partials: FileInputMeta[];
        templates: FileInputMeta[];
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
export declare const Loader: ({ ...config }: Runtime.Options) => {
    template: (name: string, { ...data }?: object) => string;
};
