import { SSROptions, USSROptions, USSGOptions, SSGOptions, ConfigStringType, ConfigType, LoaderContext, UUDebugConfig, DebugConfig } from '../types';
export declare function genTypedFallbacks(type: ConfigStringType, args: ConfigType): ConfigType;
export declare function findConfig(type: ConfigStringType): ConfigType;
export declare function tryHCL(type: ConfigStringType): ConfigType;
export declare function tryPackage(type: ConfigStringType): ConfigType;
export declare function findSSRConfig(conf?: USSROptions): SSROptions;
export declare function findSSGConfig(conf?: USSGOptions): SSGOptions;
export declare function hydrateRuntimeConfig(config: SSROptions | USSROptions): LoaderContext;
export declare function getDebug(opt: UUDebugConfig): DebugConfig;
