import { LoaderOptions, LoaderEngine } from '../../..';
import defaults from '../default';
import { statusObj } from './logger';
import { resolvePartials, resolveTemplates } from './dirTree';
import path from 'path';
/**
 * 
 * @param { LoaderOptions } config configuration file for engine
 * @returns context for engine
 */
const engine = ( config: LoaderOptions ): LoaderEngine => {
    const verbose = config?.debug ?? false;
    if( verbose ) {
        statusObj( 'Config: ', config );
    }
    if( verbose ) {
        statusObj( 'Path Config: ', config );
    }
    const partialInput = config?.partialInput;
    const templateInput = config?.templateInput;
    if( partialInput && verbose ) {
        statusObj( 'Partial Initials: ', partialInput );
    }
    if( templateInput && verbose ) {
        statusObj( 'Template Initials: ', templateInput );
    }
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