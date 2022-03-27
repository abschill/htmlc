/**
 *
 * @param { coreContext } config configuration file for engine
 * @returns context for engine
 */
 import { fsUtil } from './internals/util/file';
 import { DEFAULTS } from './internals';
 import { 
    LoaderOptions,
    CoreContext, 
    CoreOptions
} from './internals/types';

const clean = ( config: LoaderOptions ):
    CoreOptions =>
    Object.keys( config ) === Object.keys( DEFAULTS ) ?
        config as CoreOptions:
        {...DEFAULTS, ...config} as CoreOptions;

export default ( config: LoaderOptions ):
    CoreContext => {
    const hydrated = clean( config );
    const partials = fsUtil.resolvePartials( config as CoreOptions );
    const templates = fsUtil.resolveTemplates( config as CoreOptions );
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
 
