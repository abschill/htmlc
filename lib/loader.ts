
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
import render from './render';
import { FileInputMeta } from './internals';

export declare namespace Runtime {
    export type Options = {
        pathRoot ?: string
        templates ?: string
        partials ?: string
        partialInput ?: object
        templateInput ?: object
        watch ?: boolean
        debug ?: boolean
    };

    export type Context = {
        config: Options
        partials: FileInputMeta[]
        templates: FileInputMeta[]
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
export const Loader = ( { ...config }: Runtime.Options ):
{  template: ( name: string, data ?: object ) => Runtime.template } => {
    let conf = context( config );
    if( config.watch ) {
        conf.partials.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    if( config.debug ) {
                        console.log( `Modified ${filename}, refresh browser to apply changes`)
                    }
                    conf = context( config );
                }
            });
        } );
        conf.templates.forEach( file => {
            watch( file.path, ( eventType, filename ) => {
                if( eventType === 'change' ) {
                    if( config.debug ) {
                        console.log( `Modified ${filename}, refresh browser to apply changes`)
                    }
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
    function template( name: string, data ?: object ): 
    Runtime.template {
        const { templateInput = {}, partialInput = {} } = config;
        data = { ...data } ?? {};
        //if no data, load default input for template
        if( Object.keys( data ).length === 0 ) {
            const namedInsertions = templateInput[ name ] ?? {};
            const globalInsertions = templateInput[ '*' ] ?? {};
            const spreadInsertions = {...namedInsertions, ...globalInsertions, partialInput };
            const fileMeta = conf.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions, config.debug );
            return out;
        } 
        else {
            const namedInsertions = { ...templateInput[name], ...data };
            const globalInsertions = templateInput[ '*' ] ?? {};
            const spreadInsertions = {
                ...globalInsertions, ...namedInsertions,
                partialInput: {
                    ...partialInput, 
                    "*": {
                        ...partialInput['*'], ...data['partialInput']  
                    } 
                } 
            };
            if( config.debug ) {
                console.log( 'Spread Insertions: ' );
                console.log( spreadInsertions );
            }
            const fileMeta = conf.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions, config.debug );
            return out;
        }
    };  

    return { template };
}
