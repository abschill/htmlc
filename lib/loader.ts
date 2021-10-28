
/**
 * @module loader
 *  @example Initialization
 * ```javascript
 * const myLoader = loader( { pathRoot: 'views', templates: 'pages', partials: 'partials', partialInput: {}, templateInput: {} } );
 * ```
 * @example Render
     * ```javascript
     * myLoader.template( 'home', {...homeData} );
     * ```
 */

import engine from './util/engine';
import { LoaderOptions, Loader } from './options';
import { watch } from 'fs';

import render from './util/ast/render';

/**
 * @function loader
 * @description Rendering Context 
 * @param {LoaderOptions} config config object for loader 
 * @returns Loader for application
 */
export const loader = ( { ...config }: LoaderOptions ): Loader => {
    // console.log( config );
    let conf = engine( config );
    // console.log( conf );
    if( config.watch ) {
        conf.partials.forEach( file => {
            watch(file.path, (eventType, filename) => {
                if( eventType === 'change' ) {
                    conf = engine( config );
                }
            });
        } );
        conf.templates.forEach( file => {
            watch(file.path, (eventType, filename) => {
                if( eventType === 'change' ) {
                    conf = engine( config );
                }
            });
        } );
    }
    /**
     * @function template
     * @param {string} name Name of Template to Load
     * @param {object} data data to override fallback data for given template
     * @returns {string} the template's rendered content
     * 
     * @example
     * ```javascript
     * myLoader.template( 'home', {...homeData} );
     * ```
     */
    function template( name: string, {...data } ) {
        const { templateInput = {}, partialInput = {} } = config;
        // console.log( data );
        //if no data, load default input for template
        if( Object.keys( data ).length === 0 ) {
            const namedInsertions = templateInput[ name ] ?? {};
            const globalInsertions = templateInput[ '*' ] ?? {};
            const spreadInsertions = {...namedInsertions, ...globalInsertions, partialInput };
            const fileMeta = conf.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions );
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
            const fileMeta = conf.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions );
            return out;
        }
    }   
    return { template }
}
