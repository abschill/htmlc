
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
import { internals, compiler,  _DEFAULTS } from './core/internals';
import { Debugger } from './core/internals';
import compile from './core/compile';

export declare namespace core {

	export interface RuntimeState {
		ctx: core.Context;
		template: ( name: string, data ?: object ) => core.template;
	}

	type Entity<Type> = {
		[Property in keyof Type]-?: Type[Property];
	}

	export type Event<T> = {
		( args: T ): T;
	}

    export type Options = {
        pathRoot ?: string;
        templates ?: string;
        partials ?: string;
        partialInput ?: compiler.UINSERT_MAP;
        templateInput ?: compiler.UINSERT_MAP;
        watch ?: boolean;
        debug ?: boolean;
    };

	export type ROptions = Entity<Options>;

    export type Context = {
        config: ROptions;
        partials: internals.FileInputMeta[];
        templates: internals.FileInputMeta[];
    };

    export type template = string;

    export type StaticOptions = {
        load_options: ROptions;
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
 * @returns Factory function for runtime context
 * @param config
 */
export function Loader ( config ?: core.Options ):
core.RuntimeState {

    let ctx: core.Context = context( config ?? _DEFAULTS );

    if( ctx.config.watch ) {
        ctx.partials.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    //if( ctx.config.debug ) stampLog( `Modified ${filename}, refresh browser to apply changes`, 'watch::partials|loader.ts#L63' )
                    Debugger._registerEvent( `Modified ${filename}, refresh browser to apply changes`, ctx, arguments );
					ctx = context( config ?? _DEFAULTS );
                }
            });
        } );
        ctx.templates.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    //if( ctx.config.debug ) stampLog( `Modified ${filename}, refresh browser to apply changes`, 'watch::templates|loader.ts#L71' )
					Debugger._registerEvent( `Modified ${filename}, refresh browser to apply changes`, ctx, arguments );
					ctx = context( config ?? _DEFAULTS );
                }
            });
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
    function template( name: string, data ?: compiler.UINSERT_MAP ):
    core.template {
        return compile( { template_name: name, ctx, data } );
    }

    return { ctx, template };
}
