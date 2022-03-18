import { Entity, Options } from './types';
export declare const _DEFAULTS: Entity<Options>;
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
    debug: import("./types").RDebugOpts;
};
