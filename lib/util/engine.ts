import { LoaderOptions, LoaderEngine } from '../..';
import { resolvePartials, resolveTemplates } from './dirTree';
/**
 * 
 * @param { LoaderOptions } config configuration file for engine
 * @returns context for engine
 */
const engine = ( config: LoaderOptions ) => {
    const partials = resolvePartials( config );
    const templates = resolveTemplates( config );
    return {
        config,
        partials,
        templates
    };
}

export default engine;