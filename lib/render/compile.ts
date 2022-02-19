import { Runtime } from '../loader';
import { hclInternal } from './internals';
import { stampLog } from '../util/stamp';
import render from '.';

export default function compileArgs( template_name: string, conf: Runtime.Context, data ?: hclInternal._insertMap ):
Runtime.template {
    /**
     * If any data was keyed with the template name in the constructor, we will use as a secondary priority load value
     * these objects will default to {} if not entered
     */
    const { templateInput = {}, partialInput = {} } = conf.config;
    // unset null data if applicable
    if( !data ) data = {};

    if( conf.config.debug ) {
        stampLog( conf.config, 'fn::conf' );
        stampLog( data, 'fn::args' );
    }

    /**
         * steps
         * 1: if no data, grab template with constructor data
         * 2: if data, compile data and grab template
         * 3: 
    */
    //if no data, load default input for template

    if( Object.keys( data ).length === 0 ) {
        const globalInsertions: 
        hclInternal._insertMap = Object.keys( templateInput ).includes( '*' ) ? templateInput[ '*' ] : {};
        if( Object.keys( templateInput ).includes( template_name ) ) {
            const namedInsertions: 
            hclInternal._insertMap = templateInput[ template_name ];
            const spreadInsertions: 
            hclInternal.compiledMap = { ...namedInsertions, ...globalInsertions, partialInput };

            if( conf.config.debug ) stampLog( spreadInsertions, 'spread::args', true );
            const fileMeta = conf.templates.filter( temp => temp.name === template_name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions, conf.config.debug );
            return out;
        }
        else {
            const spreadInsertions: 
            hclInternal.compiledMap = { ...globalInsertions, partialInput };
            if( conf.config.debug ) stampLog( spreadInsertions, 'spread::args', true );
            const fileMeta = conf.templates.filter( temp => temp.name === template_name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions, conf.config.debug );
            return out;
        }
    }
    else {
        const namedInsertions: 
            hclInternal._insertMap = { ...templateInput[ template_name ], ...data };
            const globalInsertions: 
            hclInternal._insertMap = Object.keys( templateInput ).includes( '*' ) ? templateInput[ '*' ] : {};

            const spreadInsertions: 
            hclInternal.compiledMap = {
                ...globalInsertions, ...namedInsertions,
                partialInput: {
                    ...partialInput, 
                    '*': {
                        ...partialInput[ '*' ], ...data[ 'partialInput' ]  
                    } 
                } 
            };

            if( conf.config.debug ) stampLog( spreadInsertions, 'spread::args', true );
            const fileMeta = conf.templates.filter( temp => temp.name === template_name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, spreadInsertions, conf.config.debug );
            return out;
    }
}