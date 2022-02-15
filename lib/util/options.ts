/**
 * 
 * @param { Runtime.Options } config configuration file for engine
 * @returns context for engine
 */
import { Runtime } from '../loader';
import { resolvePartials, resolveTemplates } from './file'; 
export default ( config: Runtime.Options ): 
Runtime.Context => ({
    config, 
    partials: resolvePartials( config ),
    templates: resolveTemplates( config )
});