/**
 * @module loader
 *  @example Calling the imported Loader module factory function
 * ```javascript
 * const myLoader = Loader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
 * ```
 * @example Render templates by name from the loader, and optionally apply / override data from the constructor
     * ```javascript
     * myLoader.template( 'home', { ...homeData } );
     * ```
 */
 import { 
    HCL_Runtime, 
    LoadOptions,
    CoreContext, 
    Template,
    DirtyMap
} from './core/internals/types';
import hydrate from './core/hydrate';
import { watch } from 'fs';
import { DEFAULTS } from './core/internals';
import Debugger from './core/internals/debugger';
import Compiler from './core/compile';
export {  
    HCL_Runtime, 
    CoreContext, 
    LoadOptions,
    CoreOptions,
    DebugOptions 
} from './core/internals/types';
/**
 * @function Loader
 * @description Rendering Context for templates
 * @returns Factory function for runtime context
 * @param config
 */
export function Loader ( config ?: LoadOptions ):
HCL_Runtime {
    config =  config ?? DEFAULTS;

    const dbg = new Debugger( config );

    let ctx: CoreContext = hydrate( config );

    if( ctx.config.watch ) {
        dbg.event( 'watch:init', 'watch enabled' );
        ctx.partials.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    dbg.event( 'file:change', filename );
					ctx = hydrate( config );
                }
            } );
        } );
        ctx.templates.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    dbg.event( 'file:change', filename );
					ctx = hydrate( config );
                }
            } );
        } );
    }

    /**
	 * @function template
	 * Name of Template to Load
	 * data to override fallback data for given template
	 * @returns {string} the template's rendered content
	 * @example
	 * ```javascript
	 * Loader.template( 'home', {...homeData} );
	 * ```
	 * @param name
	 * @param data
	 */
    function template( name: string, data ?: DirtyMap ):
    Template {
        return Compiler.compile( {
            template_name: name, 
            ctx, 
            data
        } );
    }

    return {ctx, template};
}
