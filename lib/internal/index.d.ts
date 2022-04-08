import { SSROptions, SSGOptions, LogMode, LogStrategy } from '../types';
export declare const DEFAULT_PATHS: {
    pathRoot: string;
    templates: string;
    partials: string;
};
export declare const RT_DEFAULTS: {
    templateInput: {};
    partialInput: {};
    preload: boolean;
    discoverPaths: boolean;
    intlCode: string;
    debug: {
        logMode: LogMode;
        logStrategy: LogStrategy;
    };
};
export declare const HCL_DEFAULTS: SSROptions;
export declare const STATIC_DEFAULTS: SSGOptions;
export declare const FULL_DEFAULTS: {
    ssr_config: Required<import("../types").USSROptions>;
    ssg_config: Required<import("../types").USSGOptions>;
    fallbacks: {};
};
