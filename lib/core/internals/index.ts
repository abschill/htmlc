
import { Entity, Options } from './types';

export const _DEFAULTS: Entity<Options> = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    watch: false,
	debug: false
};

export const DEFAULTS = {
	..._DEFAULTS,
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
