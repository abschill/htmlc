
import { E_SSROptions } from './types';

export const __PATHS__ = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials'
};

export const HCL_DEFAULTS: E_SSROptions = {
    ...__PATHS__,
    templateInput: {},
    partialInput: {},
    watch: false,
    discoverPaths: false,
    intlCode: 'en',
	debug: {
		logMode: 'silent',
		logStrategy: 'none',
        logFile: null
	},
    cache: {
        ttl: 0 
    }
};

export const STATIC_DEFAULTS = {
	...__PATHS__,
    outPath: 'public',
    loaderFile: 'loader.js',
    cleanup: true
};

export const FULL_DEFAULTS = {
    base_config: HCL_DEFAULTS,
    static_config: STATIC_DEFAULTS,
    fallbacks: {}
};