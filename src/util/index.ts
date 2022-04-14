
import { 
    DebugConfig, 
    SSROptions, 
    SSGOptions, 
    LogMode,
    LogStrategy,
    GlobalOptions,
    UGlobalOptions 
} from '../types';
export const DEBUG_DEFAULTS: 
DebugConfig = {
    logMode: <LogMode>'silent',
    logStrategy: <LogStrategy>'silent',
    logFile: null
};

export const DEBUG_BOOLTRUE:
DebugConfig = {
    logMode: <LogMode>'verbose',
    logStrategy: <LogStrategy>'stdout',
    logFile: null
};

export const __DEFAULTS__:
UGlobalOptions = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    discoverPaths: true,
    intlCode: 'en',
    errorSuppression: false,
    debug: DEBUG_DEFAULTS
};

export const SSR_DEFAULTS: 
SSROptions = {
    ...<GlobalOptions>__DEFAULTS__,
    watch: false
};

export const SSG_DEFAULTS: 
SSGOptions = {
	...<GlobalOptions>__DEFAULTS__,
    outPath: 'public',
    loaderFile: 'hcl-config.js',
    cleanup: true
};

export const FULL_DEFAULTS = {
    ssr_config: SSR_DEFAULTS,
    ssg_config: SSG_DEFAULTS,
    fallbacks: {}
};


export * from './color-escape';
export * from './fs';
export * from './html';
export * from './event-map';