/**
 * 
 * @param { Loader.Options } config configuration file for engine
 * @returns context for engine
 */
import { Loader } from '../..';
import { resolvePartials, resolveTemplates } from './file'; 
export default ( config: Loader.Options ) => ({
    config, 
    partials: resolvePartials( config ),
    templates: resolveTemplates( config )
});