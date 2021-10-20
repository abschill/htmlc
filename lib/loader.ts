import engine from './util/engine';
import { LoaderOptions, Loader } from '..';
import { statusObj } from './util/logger';
import render from './util/ast/render';
import check_keys from './util/config';

/**
 * @constructor
 * @param {LoaderOptions} config config object for loader 
 * @returns Loader for application
 */
const loader = ( { ...config }: LoaderOptions ): Loader => {
    if( config.debug ) {
        statusObj( 'Initial Args: ', config );
    }
    const conf = engine( config );
    if( config.debug ) {
       statusObj( 'Config:', conf );
    }
    function template( name: string, {...data } ) {
        //if no data, load default input for template
        if( Object.keys( data ).length === 0 ) {
            const namedInsertions = config.templateInput[ name ];
            const { partialInput } = config;
            const globalInsertions = config.templateInput[ '*' ];
            const spreadInsertions = {...namedInsertions, ...globalInsertions, partialInput };
            const fileMeta = conf.ctx.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.ctx.partials, rawFile, spreadInsertions );
            return out;
        } 
        else {
            const namedInsertions = data;
            const { partialInput } = config;
            const globalInsertions = config.templateInput['*'];
            const spreadInsertions = check_keys( {...namedInsertions, ...globalInsertions, partialInput } );
            const fileMeta = conf.ctx.templates.filter( temp => temp.name === name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.ctx.partials, rawFile, spreadInsertions );
            return out;
        }
        
    }   

    return { template }
}
export default loader;