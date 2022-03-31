
import { CoreOptions } from './types';

export const DEFAULTS: CoreOptions = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    watch: false,
	debug: {
		logMode: 'silent',
		logStrategy: 'none',
        logFile: null
	},
    cacheExpiration: 0
};

export const __DEFAULTS = {
	...DEFAULTS,
    _publishDefault : 'dist',
    outDefault: 'public',
    static_config: {
        pathRoot: 'views',
        partials: 'partials',
        templates: 'pages',
        outPath: 'public',
        loaderFile: 'loader.js',
        cleanup: true
    }
};

