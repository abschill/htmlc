
/**
 * @module loader
 *  @example Initialization
 * ```javascript
 * const myLoader = Loader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
 * ```
 * @example Render
     * ```javascript
     * myLoader.template( 'home', { ...homeData } );
     * ```
 */
 import { 
    RuntimeState, 
    Options, 
    coreContext, 
    FTemplate,
    UINSERT_MAP
} from './core/internals/types';
import hydrate from './core/hydrate';
import { watch } from 'fs';
import { _DEFAULTS } from './core/internals';
import Debugger from './core/internals/debugger';
import Compiler from './core/compile';
export * from './core/internals/types';
/**
 * @function Loader
 * @description Rendering Context for templates
 * @returns Factory function for runtime context
 * @param config
 */
export function Loader ( config ?: Options ):
RuntimeState {

    let ctx: coreContext = hydrate( config ?? _DEFAULTS );

    if( ctx.config.watch ) {
        ctx.partials.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    // eslint-disable-next-line prefer-rest-params
                    Debugger._registerEvent( `Modified ${filename}, refresh browser to apply changes`, ctx );
					ctx = hydrate( config ?? _DEFAULTS );
                }
            } );
        } );
        ctx.templates.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
					Debugger._registerEvent( `Modified ${filename}, refresh browser to apply changes`, ctx );
					ctx = hydrate( config ?? _DEFAULTS );
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
    function template( name: string, data ?: UINSERT_MAP ):
    FTemplate {
        return Compiler.compile( {template_name: name, ctx, data} );
    }

    return {ctx, template};
}
