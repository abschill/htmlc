
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
import { hclFS, LoaderContext, hclInternal, _DEFAULTS } from './render/internals';
import { stampLog } from './util/stamp';
import compile from './render/compile';

export declare namespace Runtime {
    export type Options = {
        pathRoot ?: string
        templates ?: string
        partials ?: string
        partialInput ?: hclInternal._insertMap
        templateInput ?: hclInternal._insertMap
        watch ?: boolean
        debug ?: boolean
    };

    export type Context = {
        config: Options
        partials: hclFS.FileInputMeta[]
        templates: hclFS.FileInputMeta[]
    };
    
    export type template = string;
    
    export type StaticOptions = {
        load_options: Options
        static_options: {
            cleanup: boolean
            outPath: string
            loaderFile: string | string[]
        }
    };
}

/**
 * @function Loader
 * @description Rendering Context for templates
 * @param {Loader.Options} 
 * @returns Loader for application
 */
export const Loader = ( config ?: Runtime.Options ):
LoaderContext => {

    let conf = context( config ?? _DEFAULTS );

    if( config.watch ) {
        conf.partials.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    if( config.debug ) stampLog( `Modified ${filename}, refresh browser to apply changes`, 'watch::partials|loader.ts#L63' )
                    conf = context( config );
                }
            });
        } );
        conf.templates.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    if( config.debug ) stampLog( `Modified ${filename}, refresh browser to apply changes`, 'watch::templates|loader.ts#L71' )
                    conf = context( config );
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
    function template( name: string, data ?: hclInternal._insertMap ): 
    Runtime.template {
        return compile( name, conf, data );
    };  

    return { conf, template };
}
