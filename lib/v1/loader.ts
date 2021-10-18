import engine from './util/engine';
import { LoaderOptions } from '../..';
import { statusObj } from './util/logger';
import render from './util/internal/ast/render';

const loader = ( { ...config }: LoaderOptions ) => {
    if( config.debug ) {
        statusObj( 'Initial Args: ', config );
    }
    const conf = engine( config );
    if( config.debug ) {
       statusObj( 'Config:', conf );
    }
    function loadTemplate( name: string, {...data } ) {
        //if no data, load default input for template
        const namedInsertions = config.templateInput[ name ];
        const { partialInput } = config;
        const globalInsertions = config.templateInput[ '*' ];
        const spreadInsertions = {...namedInsertions, ...globalInsertions, ...data, partialInput }
        const fileMeta = conf.ctx.templates.filter( temp => temp.name === name )[0];
        const { rawFile } = fileMeta;
        const out = render( conf.ctx.partials, rawFile, spreadInsertions );
        return out;
    }   

    return {
        loadTemplate
    }
    
    

    
}
export default loader;