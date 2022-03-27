
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
		logStrategy: 'none'
	}
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

export enum FG_COLOR_ESCAPES {
	black = '\x1b[30m%s\x1b[0m',
	red = '\u001b[31m%s\x1b[0m',
	green = '\x1b[32m%s\x1b[0m',
	yellow = '\x1b[33m%s\x1b[0m',
	blue = '\x1b[34m%s\x1b[0m',
	magenta = '\x1b[35m%s\x1b[0m',
	cyan = '\x1b[36m%s\x1b[0m',
	white = '\x1b[37m%s\x1b[0m'
}

export enum BG_COLOR_ESCAPES {
	black = '\x1b[40m%s\x1b[0m',
	red = '\x1b[41m%s\x1b[0m',
	green = '\x1b[42m%s\x1b[0m',
	yellow = '\x1b[43m%s\x1b[0m',
	blue = '\x1b[44m%s\x1b[0m',
	magenta = '\x1b[45m%s\x1b[0m',
	cyan = '\x1b[46m%s\x1b[0m',
	white = '\x1b[47m%s\x1b[0m',
}