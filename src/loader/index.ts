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
    HTMLChunkLoader,
    USSROptions,
    USSGOptions,
    LoaderContext,
    SSROptions,
    HTMLPage,
    Debugger,
    toLocale
} from '../types';
import { Config } from '../core';
import { watch } from 'fs';
import { createDebugger } from '../util/debugger';
import * as Compiler from '../core/compiler';
import { DEBUG_DEFAULTS, DEBUG_BOOLTRUE } from '../util';
import { checkIntlCode } from '../core/config/check-intl';
/**
 * @function createLoader factory function for Loader
 * @description Rendering Context for templates
 * @returns Loader from config options
 * @param u_config user config options
 */
export function createLoader ( 
    u_config ?: USSROptions | USSGOptions 
): HTMLChunkLoader {

    // if( u_config && u_config.intlCode ) {
    //     // validate user config options
    //     u_config.intlCode = checkIntlCode( u_config );
    // }

    const hcl_config: SSROptions = Config.createSSRConfig( u_config );
    let dbg: Debugger = null;

    if( typeof hcl_config.debug === 'boolean' && hcl_config.debug === true ) {
        const o = {...hcl_config, debug: DEBUG_BOOLTRUE };
        dbg = createDebugger( o );
    }
    else if ( !hcl_config.debug && typeof hcl_config.debug === 'object' ) {
        dbg = createDebugger( {debug: DEBUG_DEFAULTS, ...hcl_config} );
    }
    else if ( !hcl_config.debug ) {
        dbg = null;
    }

    let ctx: LoaderContext = Config.hydrateConfig( hcl_config );
    if( ctx.config.watch ) {
        ctx.chunks.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    if( ctx.config.debug === true 
                        || ctx.config.debug 
                        && ( typeof ctx.config.debug !== 'boolean' 
                        && ctx.config.debug.logMode !== 'silent' ) ) dbg.log( 'file:change', `Chunk Updated at: ${filename}` );
					ctx = Config.hydrateConfig( hcl_config );
                }
            } );
        } );
    }

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
    function template ( 
        name: string, data ?: object 
    ): HTMLPage {
        return Compiler.compile( {
            templateName: name,
            ctx: ctx,
            callData: data,
            debugger: dbg 
        } );
    }

    return {ctx, template};
}
