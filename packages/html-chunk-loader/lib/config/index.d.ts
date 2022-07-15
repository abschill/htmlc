import { SSROptions, USSROptions, USSGOptions, SSGOptions, ConfigStringType, ConfigType, LoaderContext, UUDebugConfig, DebugConfig } from '../types';
export declare function genTypedFallbacks(type: ConfigStringType, args: ConfigType): ConfigType;
export declare function useConfig(type: ConfigStringType): ConfigType;
export declare function tryHCL(type: ConfigStringType): ConfigType;
export declare function tryPackage(type: ConfigStringType): ConfigType;
export declare function useSSRConfig(conf?: USSROptions): SSROptions;
export declare function useSSGConfig(conf?: USSGOptions): SSGOptions;
export declare function hydrateRuntimeConfig(config: SSROptions | USSROptions): LoaderContext;
export declare function useDebug(opt: UUDebugConfig): DebugConfig;
