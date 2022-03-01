import { core } from '../loader';
import { internals } from './internals';
import { stampLog } from '../util/stamp';
import render from '.';
import { hclDebugger } from './internals';

export default function compile( args: internals.CompilerArgs ):
core.template {
    /**
     * If any data was keyed with the template name in the constructor, we will use as a secondary priority load value
     * these objects will default to {} if not entered
     */
    const { templateInput = {}, partialInput = {} } = args.ctx.config;
    // unset null data if applicable
    if( !args.data ) args.data = {};

    hclDebugger._registerEvent( 'init', args.ctx, arguments );
    /**
         * steps
         * 1: if no data, grab template with constructor data
         * 2: if data, compile data and grab template
         * 3:
    */
    //if no data, load default input for template
    const globalInsertions:
    internals.UINSERT_MAP = templateInput;
    if( Object.keys( args.data ).length === 0 ) {
        if( Object.keys( templateInput ).includes( args.template_name ) ) {
            const insertions:
            internals.compiledMap = { ...globalInsertions, partialInput };
            hclDebugger._registerEvent( 'insert', args.ctx, arguments );
            const fileMeta = args.ctx.templates.filter( temp => temp.name === args.template_name )[0];
            const { rawFile } = fileMeta;
            const out = render( args.ctx.partials, rawFile, insertions, args.ctx.config.debug );
            return out;
        }
        else {
            const insertions:
            internals.compiledMap = { ...globalInsertions, partialInput };
            if( args.ctx.config.debug ) stampLog( insertions, 'insertion::args|compile.ts#L44' );
            const fileMeta = args.ctx.templates.filter( temp => temp.name === args.template_name )[0];
            const { rawFile } = fileMeta;
            const out = render( args.ctx.partials, rawFile, insertions, args.ctx.config.debug );
            return out;
        }
    }
    else {
        const scopedInsertions:
        internals.UINSERT_MAP = { ...templateInput, ...args.data };

        const insertions:
        internals.compiledMap = {
            ...globalInsertions, ...scopedInsertions,
            partialInput: {
                ...partialInput,
                ...args.data[ 'partialInput' ]
            }
        };
        hclDebugger._registerEvent( 'insert', args.ctx, arguments );
        const fileMeta = args.ctx.templates.filter( temp => temp.name === args.template_name )[0];
        const { rawFile } = fileMeta;
        const out = render( args.ctx.partials, rawFile, insertions, args.ctx.config.debug );
        return out;
    }
}
