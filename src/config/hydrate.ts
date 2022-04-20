/**
 *
 * @param { LoaderContext } config configuration file for loader
 * @returns runtime context for loader
 */
import {
    findPartials,
    findTemplates,
    __DEFAULTS__
} from '../util';
import {
    USSROptions,
    LoaderContext,
    SSROptions
} from '../types';

/**
 * @function cleanConfig
 * @description Clean configuration input from user and add defaults for unassigned values
 * @param config SSROptions | USSROptions
 */
function cleanConfig (
    config: SSROptions | USSROptions
): SSROptions {
	return Object.keys( config ) === Object.keys( __DEFAULTS__ ) ?
		<SSROptions>config:
		<SSROptions>{...__DEFAULTS__, ...config};
}

/**
 * @function hydrateConfig
 * @description Hydrate loader context with chunks + config
 * @param config SSROptions | USSROptions
 */
export function hydrateConfig (
    config: SSROptions | USSROptions
): LoaderContext {
    const hydrated = cleanConfig( config );
    const partials = findPartials( hydrated );
    const templates = findTemplates( hydrated );
    return ( partials && templates ) ? {
        config: hydrated,
        chunks: [...partials, ...templates]
    } : {
        config: hydrated,
        chunks: []
    };
}
