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
    USSROptions,
    USSGOptions,
    LoaderContext,
    SSROptions,
    HTMLPage
} from './core/types';
import { hydrateConfig, hydrateChunks } from './core/hydrate';
import { watch } from 'fs';
import createDebugger from './core/internals/debugger';
import Compiler from './core/compile';
import { createSSRConfig } from './core/config';
export {
    Loader,
    LoaderContext,
    DebugConfig
} from './core/types';
/**
 * @function createLoader
 * @description Rendering Context for templates
 * @returns Factory function for runtime context
 * @param u_config user config options
 */
export function createLoader( u_config ?: USSROptions | USSGOptions ):
Loader {
    const hcl_config: SSROptions = createSSRConfig( u_config );
    const dbg = createDebugger( hcl_config );

    let ctx: LoaderContext = hydrateConfig( hcl_config );
    if( ctx.config.watch ) {
        dbg.event( 'watch:init', 'watch enabled' );
        ctx.chunks.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    dbg.event( 'file:change', filename );
					ctx = hydrateConfig( hcl_config );
                }
            } );
        } );
    }

	// new 0.5.11 - preload template to minimize execution time for ssr if there are any renderable chunks
    if( hcl_config.preload ) ctx.chunks = Compiler.preloadChunksV5( ctx );

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
        return Compiler.compileTemplateV1( {
            template_name: name,
            caller_ctx: ctx,
            caller_data: data,
            debug: dbg
        } );
    }
    return {
		ctx,
		template
	};
}
