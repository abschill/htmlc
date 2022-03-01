/**
 *
 * @param { Runtime.Options } config configuration file for engine
 * @returns context for engine
 */
import { core } from '../loader';
import { resolvePartials, resolveTemplates } from './file';
export default ( config: core.Options ):
core.Context => ( {
    config,
    partials: resolvePartials( config ),
    templates: resolveTemplates( config )
} );
