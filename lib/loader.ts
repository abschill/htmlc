
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
import context from './util/options';
import { watch } from 'fs';
import { internals, _DEFAULTS, hclDebugger } from './core/internals';
import { stampLog } from './util/stamp';
import compile from './core/compile';

export declare namespace core {

	export type Event<T> = {
		( args: T ): T;
	}

    export type Options = {
        pathRoot ?: string;
        templates ?: string;
        partials ?: string;
        partialInput ?: internals.UINSERT_MAP;
        templateInput ?: internals.UINSERT_MAP;
        watch ?: boolean;
        debug ?: boolean;
    };

	export type ROptions = {
        pathRoot : string;
        templates : string;
        partials : string;
        partialInput : internals.UINSERT_MAP;
        templateInput : internals.UINSERT_MAP;
        watch : boolean;
        debug : boolean;
    };

    export type Context = {
        config: Options;
        partials: internals.FileInputMeta[];
        templates: internals.FileInputMeta[];
    };

    export type template = string;

    export type StaticOptions = {
        load_options: Options;
        static_options: {
            cleanup: boolean;
            outPath: string;
            loaderFile: string | string[];
        };
    };
}

/**
 * @function Loader
 * @description Rendering Context for templates
 * @param {Loader.Options}
 * @returns Factory function for runtime context
 */
export const Loader = ( config ?: core.Options ):
internals.RuntimeState => {

    let ctx: core.Context = context( config ?? _DEFAULTS );

    if( ctx.config.watch ) {
        ctx.partials.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    if( ctx.config.debug ) stampLog( `Modified ${filename}, refresh browser to apply changes`, 'watch::partials|loader.ts#L63' )
                    ctx = context( config ?? _DEFAULTS );
                }
            });
        } );
        ctx.templates.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    if( ctx.config.debug ) stampLog( `Modified ${filename}, refresh browser to apply changes`, 'watch::templates|loader.ts#L71' )
                    ctx = context( config ?? _DEFAULTS );
                }
            });
        } );
    }

    /**
     * @function template
     * @param {string}
     * Name of Template to Load
     * @param {object}
     * data to override fallback data for given template
     * @returns {string} the template's rendered content
     * @example
     * ```javascript
     * Loader.template( 'home', {...homeData} );
     * ```
     */
    function template( name: string, data ?: internals.UINSERT_MAP ):
    core.template {
        return compile( { template_name: name, ctx, data } );
    };

    return { ctx, template };
}
