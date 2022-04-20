import { SSROptions, USSROptions, USSGOptions, SSGOptions, ConfigStringType, ConfigType } from '../types';
export declare function genTypedFallbacks(type: ConfigStringType, args: ConfigType): ConfigType;
export declare function findConfig(type: ConfigStringType): ConfigType;
export declare function tryHCL(type: ConfigStringType): ConfigType;
export declare function tryPackage(type: ConfigStringType): ConfigType;
export declare function createSSRConfig(conf?: USSROptions): SSROptions;
export declare function createSSGConfig(conf?: USSGOptions): SSGOptions;
export * from './hydrate';
export * from './check-debug';
