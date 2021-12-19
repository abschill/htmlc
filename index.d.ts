export declare namespace Loader {
    export type Options = {
        pathRoot ?: string;
        templates ?: string;
        partials ?: string
        partialInput ?: object,
        templateInput ?: object,
        watch ?: boolean,
        debug ?: boolean
    }

    export type Context = {
        partials: any
        templates: any
    }
    
    export type template = string;

    export type Runtime = {
        template: Function
    }
    
    export type StaticOptions = {
        load_options: Options,
        static_options: {
            cleanup: boolean,
            outPath: string,
            loaderFile: string | string[]
        }
    }
}





