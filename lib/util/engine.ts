import { LoaderOptions, LoaderEngine } from '../..';
import { resolvePartials, resolveTemplates } from './dirTree';
/**
 * 
 * @param { LoaderOptions } config configuration file for engine
 * @returns context for engine
 */
const engine = ( config: LoaderOptions ): LoaderEngine => {
    const verbose = config?.debug ?? false;
    const partialInput = config?.partialInput;
    const templateInput = config?.templateInput;
    const partials = resolvePartials( config );
    const templates = resolveTemplates( config );
    const ctx = {
        config,
        partials,
        templates
    };
    const options = {
        partialInput,
        templateInput,
        debug: verbose
    }
    return { ctx, options };
    
}

export default engine;