import { core } from '../loader';
import { compiler } from './internals';
import render from '.';
import { Debugger } from './internals';

export default function compile( args: compiler.Args ):
core.template {
    /**
     * If any data was keyed with the template name in the constructor, we will use as a secondary priority load value
     * these objects will default to {} if not entered
     */
    const { templateInput = {}, partialInput = {} } = args.ctx.config;
    // unset null data if applicable
    if( !args.data ) args.data = {};

    Debugger._registerEvent( 'init', args.ctx, arguments );

    //if no data, load default input for template
    const globalInsertions:
    compiler.UINSERT_MAP = templateInput;
    if( Object.keys( args.data ).length === 0 ) {
        if( Object.keys( templateInput ).includes( args.template_name ) ) {
            const insertions:
            compiler.compiledMap = { ...globalInsertions, partialInput };
            Debugger._registerEvent( 'insert', args.ctx, arguments );
            const { rawFile } = args.ctx.templates.filter( temp => temp.name === args.template_name )[0];
            return render( args.ctx.partials, rawFile, insertions, args.ctx.config.debug );
        }
        else {
            const insertions:
            compiler.compiledMap = { ...globalInsertions, partialInput };
			Debugger._registerEvent( 'template::insert:args', args.ctx, arguments );
            const { rawFile } = args.ctx.templates.filter( temp => temp.name === args.template_name )[0];
            return render( args.ctx.partials, rawFile, insertions, args.ctx.config.debug );
        }
    }
    else {
        const scopedInsertions:
        compiler.UINSERT_MAP = { ...templateInput, ...args.data };

        const insertions:
        compiler.compiledMap = {
            ...globalInsertions, ...scopedInsertions,
            partialInput: {
                ...partialInput,
                ...args.data[ 'partialInput' ]
            }
        };

        Debugger._registerEvent( 'insert', args.ctx, arguments );
        const { rawFile } = args.ctx.templates.filter( temp => temp.name === args.template_name )[0];
        return render( args.ctx.partials, rawFile, insertions, args.ctx.config.debug );
    }
}