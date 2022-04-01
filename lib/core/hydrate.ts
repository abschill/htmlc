/**
 *
 * @param { LoaderContext } config configuration file for loader
 * @returns runtime context for loader
 */
 import { resolvePartials, resolveTemplates } from './internals/util/fs';
 import { HCL_DEFAULTS } from './internals';
 import { 
    LoaderOptions,
    LoaderContext, 
    E_SSROptions
} from './internals/types';

const clean = ( config: LoaderOptions ):
E_SSROptions =>
    Object.keys( config ) === Object.keys( HCL_DEFAULTS ) ?
        config as E_SSROptions:
        {...HCL_DEFAULTS, ...config} as E_SSROptions;

export default ( config: LoaderOptions ):
    LoaderContext => {
    const hydrated = clean( config );
    const partials = resolvePartials( config as E_SSROptions );
    const templates = resolveTemplates( config as E_SSROptions );
    return ( partials && templates ) ? {
        config: hydrated,
        partials,
        templates
    } : {
        config: hydrated,
        partials: [],
        templates: []
    };
};
 
