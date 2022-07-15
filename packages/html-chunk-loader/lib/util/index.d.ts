import { DebugConfig, SSROptions, SSGOptions, GlobalOptions } from '../types';
export declare const DEBUG_DEFAULTS: DebugConfig;
export declare const DEBUG_BOOLTRUE: DebugConfig;
export declare const __DEFAULTS__: GlobalOptions;
export declare const SSR_DEFAULTS: SSROptions;
export declare const SSG_DEFAULTS: SSGOptions;
export declare const FULL_DEFAULTS: {
    ssr_config: Readonly<Required<import("../types").USSROptions>>;
    ssg_config: Readonly<Required<import("../types").USSGOptions>>;
    fallbacks: {};
};
export * from './color-escape';
export * from './fs';
export * from './html';
export * from './event-map';
export * from './wrap-fn';
