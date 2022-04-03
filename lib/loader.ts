/**
 * @module createLoader
 *  @example Calling the imported Loader module factory function
 * ```javascript
 * const myLoader = createLoader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
 * ```
 * @example Render templates by name from the loader, and optionally apply / override data from the constructor
     * ```javascript
     * myLoader.template( 'home', { ...homeData } );
     * ```
 */
 import { 
    Loader, 
    LoaderOptions,
    LoaderContext,
    HTMLPage
} from './core/internals/types';
import hydrateContext from './core/hydrate';
import { watch } from 'fs';
import createDebugger from './core/internals/debugger';
import Compiler from './core/compile';
import findConfig from './config';

export {  
    Loader, 
    LoaderContext, 
    LoaderOptions,
    DebugConfig 
} from './core/internals/types';
/**
 * @function createLoader
 * @description Rendering Context for templates
 * @returns Factory function for runtime context
 * @param u_config user config options
 */
export function createLoader( u_config ?: LoaderOptions ):
Loader {
    const hcl_config = u_config ?? findConfig();

    const dbg = createDebugger( hcl_config );

    let ctx: LoaderContext = hydrateContext( hcl_config );
    if( ctx.config.watch ) {
        dbg.event( 'watch:init', 'watch enabled' );
        ctx.chunks.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    dbg.event( 'file:change', filename );
					ctx = hydrateContext( hcl_config );
                }
            } );
        } );
    }

    // todo - reserved
    // function preload( args ?: object ) {
    //     //
    // }

    /**
	 * @function template
	 * Name of Template to Load
	 * data to override fallback data for given template
	 * @returns {HTMLPage} the template's rendered content
	 * @example
	 * ```javascript
	 * Loader.template( 'home', {...homeData} );
	 * ```
	 * @param name
	 * @param data
	 */
    function template( name: string, data ?: object ):
    HTMLPage {
        return Compiler.compile( {
            template_name: name, 
            template_ctx: ctx, 
            template_data: data,
            _debugger: dbg
        } );
    }

    return {ctx, template};
}