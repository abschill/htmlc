
import { SSROptions, SSGOptions, LogMode, LogStrategy } from '../types';

export const DEFAULT_PATHS = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials'
};

export const RT_DEFAULTS = {
    templateInput: {},
    partialInput: {},
    preload: true,
    discoverPaths: false,
    intlCode: 'en',
	debug: {
		logMode: <LogMode>'silent',
		logStrategy: <LogStrategy>'none'
	}
};

export const HCL_DEFAULTS: SSROptions = {
    ...DEFAULT_PATHS,
    ...RT_DEFAULTS,
    watch: false,
    
};

export const STATIC_DEFAULTS: SSGOptions = {
	...DEFAULT_PATHS,
    ...RT_DEFAULTS,
    outPath: 'public',
    loaderFile: 'hcl-config.js',
    cleanup: true
};

export const FULL_DEFAULTS = {
    base_config: HCL_DEFAULTS,
    static_config: STATIC_DEFAULTS,
    fallbacks: {}
};