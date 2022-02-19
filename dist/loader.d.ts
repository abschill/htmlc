import { hclFS, LoaderContext, hclInternal } from './render/internals';
export declare namespace Runtime {
    type Options = {
        pathRoot?: string;
        templates?: string;
        partials?: string;
        partialInput?: hclInternal._mapSection;
        templateInput?: hclInternal._mapSection;
        watch?: boolean;
        debug?: boolean;
    };
    type Context = {
        config: Options;
        partials: hclFS.FileInputMeta[];
        templates: hclFS.FileInputMeta[];
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
export declare const Loader: (config?: Runtime.Options) => LoaderContext;
