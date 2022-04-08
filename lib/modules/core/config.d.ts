import { SSROptions, USSROptions, USSGOptions, SSGOptions, ConfigType, ConfigArgType } from '../../types';
export declare function genTypedFallbacks(type: ConfigType, args: ConfigArgType): ConfigArgType;
export declare function findConfig(type: ConfigType): ConfigArgType;
export declare function tryHCL(type: ConfigType): ConfigArgType;
export declare function tryPackage(type: ConfigType): ConfigArgType;
export declare function createSSRConfig(conf?: USSROptions): SSROptions;
export declare function createSSGConfig(conf?: USSGOptions): SSGOptions;
