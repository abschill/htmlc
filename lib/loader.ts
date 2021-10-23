import engine from './util/engine';
import { LoaderOptions, Loader } from '..';
import render from './util/ast/render';
/**
 * @constructor
 * @param {LoaderOptions} config config object for loader 
 * @returns Loader for application
 */
const loader = ( { ...config }: LoaderOptions ): Loader => {
    // console.log( config );
    const conf = engine( config );
    // console.log( conf );
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
export default loader;