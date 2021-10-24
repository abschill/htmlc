/**
 * 
 * @param { LoaderOptions } config configuration file for engine
 * @returns context for engine
 */
import { LoaderOptions } from '../options';
import { resolvePartials, resolveTemplates } from './dirTree';

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