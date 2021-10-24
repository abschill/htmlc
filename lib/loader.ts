
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


import render from './util/ast/render';

/**
 * @function loader
 * @description Rendering Context 
 * @param {LoaderOptions} config config object for loader 
 * @returns Loader for application
 */
export const loader = ( { ...config }: LoaderOptions ): Loader => {
    // console.log( config );
    const conf = engine( config );
    // console.log( conf );
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
        // console.log( data );
        //if no data, load default input for template
        if( Object.keys( data ).length === 0 ) {
            const namedInsertions = config.templateInput[ name ];
            const { partialInput } = config;
            const globalInsertions = config.templateInput[ '*' ];
            const spreadInsertions = {...namedInsertions, ...globalInsertions, partialInput };
            
            const fileMeta = conf.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions );
            return out;
        } 
        else {
            const namedInsertions = {...data, ...config.templateInput[name] };
            const { partialInput } = config;
            const globalInsertions = config.templateInput[ '*' ];
            const spreadInsertions = {
                ...globalInsertions, ...namedInsertions,
                partialInput: {
                    ...partialInput, 
                    "*": {
                        ...partialInput['*'], ...data['partialInput']  
                    } 
                } 
            };
            // console.log( spreadInsertions );
            const fileMeta = conf.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions );
            return out;
        }
    }   
    return { template }
}
