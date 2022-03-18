/**
 *
 * @param { coreContext } config configuration file for engine
 * @returns context for engine
 */
 import { fsUtil } from './core/internals/util/file';
 import { _DEFAULTS } from './core/internals';
 import { 
    Options, 
    coreContext, 
    ROptions
} from './core/internals/types';

const clean = ( config: Options ):
    ROptions =>
    Object.keys( config ) === Object.keys( _DEFAULTS ) ?
        config as ROptions:
        {..._DEFAULTS, ...config} as ROptions;

export default ( config: Options ):
    coreContext => {
    const hydrated = clean( config );
    const partials = fsUtil.resolvePartials( config );
    const templates = fsUtil.resolveTemplates( config );
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
 
