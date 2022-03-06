import { core } from '../loader';
import {compiler, internals} from './internals';
import render from '.';
import { Debugger } from './internals';
import RESERVED_WORDS from "./abt";
import Parser from "./parser";

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
export function __renderMap (
	content: string
): compiler.RenderMap {
	const _map: compiler.RenderMap = {
		todo_keys: [],
		todo_loops: [],
		todo_partials: []
	};
	RESERVED_WORDS.forEach( token => {
		const keymap = token.array( content );
		switch( token.key ) {
			case '@render':
				keymap ? _map.todo_keys = keymap: _map.todo_keys = [];
				break;
			case '@for':
				keymap ? _map.todo_loops = keymap: _map.todo_loops = [];
				break;
			case '@partial':
				keymap ?_map.todo_partials = keymap: _map.todo_partials = [];
				break;
			default:
				break;
		}
	} );

	return _map;
}

export function resolve(
	file: string,
	renderMap: compiler.RenderMap,
	insertionMap: compiler.UINSERT_MAP,
	debug ?: boolean
): internals.Resolved<compiler.RenderMap> {
	let copy = file;
	const outVal: compiler.StackItem[] = [];
	const outObj: compiler.StackItem[] = [];

	// if( debug ) stampLog( renderMap, 'rendermap::map|render/index.ts#L78' );

	Debugger._registerMap( renderMap, insertionMap );

	Object.entries( renderMap ).forEach( ( itemlist : [ key: string, value: string[]|string[][] ] )  => {
		// if( debug ) stampLog( itemlist, 'rendermap::itemlist|render/index.ts#L81' );
		if ( itemlist[1] ) {
			itemlist[1].forEach( r => {
				switch( itemlist[0] ) {
					case 'todo_keys':
						const name = r.split( 'render=' )[1].split( '-->')[0];
						const globals = insertionMap;
						let replaceVal = insertionMap[ name ];
						if( !replaceVal ) {
							try {
								replaceVal = globals[name];
							}
							catch( e ) {
								Debugger.raise( `Failed to find ${name} to insert into ${file}`);
								replaceVal = '';
							}
						}
						copy = copy.replace( r, replaceVal );
						break;
					case 'todo_loops':
						const loopName = r.split( '(' )[1].split( ')' )[0];
						let toInsert = insertionMap[loopName];
						// if( debug ) stampLog( toInsert, 'toInsert::frommap|render/index.ts#L104' );

						let elChild = r.replace( Parser.FOR_H( loopName ), '' ).replace( Parser.FOR_T(), '' )
							.trimStart().replace( /\s\s+/gi, '');

						toInsert?.forEach( ( insertion ?: string | compiler.UINSERT_MAP ) => {
							if( typeof( insertion ) === 'string' ) {
								//1d array
								outVal.push( { replacer: r, insertion: Parser.replaceAnonLoopBuf( { target: elChild, key: insertion as string } ) } );
							}
							else if ( typeof( insertion ) === 'object' ) {
								//key/val
								const entries = Object.entries( insertion );
								if( entries.length > 0  ) outObj.push( { replacer: r, insertion: Parser.replacedNamedLoopBuf( elChild, entries ) } );
							}
							else {
								Debugger.raise( `warning: insertion ${loopName} has an unrecognized value of` );
								Debugger.raise( insertion );
							}
						} );
						break;
					case 'todo_partials':
						//for partials nested in partials - WIP feature
						break;
					default:
						break;
				}
			} );
		}
		else {
			Debugger.raise( `Warning: key ${itemlist} is missing a value to insert` );
			// if( debug ) stampLog( itemlist, 'rendermap::error|render/index.ts#L134' );
		}
	} );

	if( debug ) {
		// stampLog( outVal, 'outval::prejoin|render/index.ts#L139' );
		// stampLog( outObj, 'outobj::prejoin|render/index.ts#L140' );
	}

	const valStr = outVal.map( ( val: compiler.StackItem ) => val.insertion ).join( '' );
	const objStr = outObj.map( ( obj: compiler.StackItem ) => obj.insertion ).join( '' );
	outVal.forEach( ( _out: compiler.StackItem ) => copy = copy.replace( _out.replacer, valStr ) );
	outObj.forEach( ( _out: compiler.StackItem ) => copy = copy.replace( _out.replacer, objStr ) );

	if( debug ) {
		// stampLog( valStr, 'valstr::postjoin|render/index.ts#L149' );
		// stampLog( objStr, 'objstr::postjoin|render/index.ts#L150' );
	}
	return { raw: file, renderMap, insertionMap, render: copy };
}
