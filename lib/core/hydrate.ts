/**
 *
 * @param { coreContext } config configuration file for engine
 * @returns context for engine
 */
 import { fsUtil } from './internals/util/file';
 import { DEFAULTS } from './internals';
 import { 
    Options,
    LoadOptions, 
    CoreContext, 
    CoreOptions
} from './internals/types';

const clean = ( config: Options ):
    CoreOptions =>
    Object.keys( config ) === Object.keys( DEFAULTS ) ?
        config as CoreOptions:
        {...DEFAULTS, ...config} as CoreOptions;

export default ( config: Options ):
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
 
