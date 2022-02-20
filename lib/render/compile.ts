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
        stampLog( conf.config, 'fn::conf|compile.ts#L17' );
        stampLog( data, 'fn::args|compile.ts#L18' );
    }

    /**
         * steps
         * 1: if no data, grab template with constructor data
         * 2: if data, compile data and grab template
         * 3:
    */
    //if no data, load default input for template
    const globalInsertions:
    hclInternal._insertMap = templateInput;
    if( Object.keys( data ).length === 0 ) {
        if( Object.keys( templateInput ).includes( template_name ) ) {
            const insertions:
            hclInternal.compiledMap = { ...globalInsertions, partialInput };

            if( conf.config.debug ) stampLog( insertions, 'spread::args|compile.ts#L35' );
            const fileMeta = conf.templates.filter( temp => temp.name === template_name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, insertions, conf.config.debug );
            return out;
        }
        else {
            const insertions:
            hclInternal.compiledMap = { ...globalInsertions, partialInput };
            if( conf.config.debug ) stampLog( insertions, 'insertion::args|compile.ts#L44' );
            const fileMeta = conf.templates.filter( temp => temp.name === template_name )[0];
            const { rawFile } = fileMeta;
            const out = render( conf.partials, rawFile, insertions, conf.config.debug );
            return out;
        }
    }
    else {
        const scopedInsertions:
        hclInternal._insertMap = { ...templateInput, ...data };

        const insertions:
        hclInternal.compiledMap = {
            ...globalInsertions, ...scopedInsertions,
            partialInput: {
                ...partialInput,
                ...data[ 'partialInput' ]
            }
        };

        if( conf.config.debug ) stampLog( insertions, 'insertion::args|compile.ts#L67' );
        const fileMeta = conf.templates.filter( temp => temp.name === template_name )[0];
        const { rawFile } = fileMeta;
        const out = render( conf.partials, rawFile, insertions, conf.config.debug );
        return out;
    }
}
