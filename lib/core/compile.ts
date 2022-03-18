/* eslint-disable no-case-declarations */

import { 
	FileInputMeta,
	RenderMap,
	Args,
	RTemplate,
	UINSERT_MAP,
	compiledMap,
	Resolved,
	StackItem,
} from './internals/types';
import render from '.';
import Debugger from './internals/debugger';
import RESERVED_WORDS from './abt';
import Parser from './parser';

export default class Compiler {
	
	static scanTemplate( args: Args ) {
		try {
			const fileData = args.ctx.templates.filter( ( temp: FileInputMeta ) => temp.name === args.template_name )[0];
			return fileData.rawFile
		}
		catch( e ) {
			Debugger.raise( `Template '${args.template_name} not found'` );
		}	
	}

	static __renderMap( content: string ) {
		const __map__: RenderMap = {
			todo_keys: [],
			todo_loops: [],
			todo_partials: []
		};

		RESERVED_WORDS.forEach( token => {
			const keymap = token.array( content );
			switch( token.key ) {
				case Parser.__renderKey__:
					keymap ? __map__.todo_keys = keymap: __map__.todo_keys = [];
					break;
				case Parser.__loopKey__:
					keymap ? __map__.todo_loops = keymap: __map__.todo_loops = [];
					break;
				case Parser.__partialKey__:
					keymap ? __map__.todo_partials = keymap: __map__.todo_partials = [];
					break;
				default:
					break;
			}
		} );
	
		return __map__;
	}

	static compile ( 
		args: Args 
	): RTemplate {
		/**
		 * If any data was keyed with the template name in the constructor, we will use as a secondary priority load value
		 * these objects will default to {} if not entered
		 */
		const {templateInput = {}, partialInput = {}} = args.ctx.config;
		// unset null data if applicable
		if( !args.data ) args.data = {};
	
		Debugger._registerEvent( 'init', args.ctx, arguments );
	
		//if no data, load default input for template
		const globalInsertions:
		UINSERT_MAP = templateInput;
		if( Object.keys( args.data ).length === 0 ) {
			const insertions:
			compiledMap = {...globalInsertions, partialInput};
			Debugger._registerEvent( 'template::insert:args', args.ctx, arguments );
			return render( args.ctx.partials, Compiler.scanTemplate( args ), insertions, args.ctx.config.debug !== null );
		}
		else {
			const scopedInsertions:
			UINSERT_MAP = {...templateInput, ...args.data};
			const insertions:
			compiledMap = {...globalInsertions, ...scopedInsertions,
				partialInput: {
					...partialInput,
					...args.data['partialInput']
				}
			};
	
			Debugger._registerEvent( 'insert', args.ctx, arguments );
			return render( args.ctx.partials, Compiler.scanTemplate( args ), insertions, args.ctx.config.debug !== null );
		}
	}
	
	static resolve (
		file: string,
		renderMap: RenderMap,
		insertionMap: UINSERT_MAP,
		debug ?: boolean
	): Resolved<RenderMap> {
		let copy = file;
		const outVal: StackItem[] = [];
		const outObj: StackItem[] = [];
	
		if( debug ) Debugger._registerMap( renderMap, insertionMap );
		Object.entries( renderMap ).forEach( ( itemlist : [key: string, value: string[] | string[][]] ) => {
			if ( !itemlist[1] ) {
				if( debug ) Debugger.raise( `Passing ${itemlist[0]}` );
			}
			else {
				itemlist[1].forEach( r => {
					switch( itemlist[0] ) {
						case 'todo_keys':
							const name = r.split( `${Parser.__renderKey__}=` )[1].split( Parser.__CLOSE__ )[0];
							const globals = insertionMap;
							let replaceVal = insertionMap[name];
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
							const loopName = r.split( '(' )[1]?.split( ')' )[0];
							const toInsert = insertionMap[loopName];
							const elChild: string = r.replace( Parser.LOOP_OPEN( loopName ), '' ).replace( Parser.LOOP_CLOSE, '' )
							.trimStart().replace( /\s\s+/gi, '' );
	
							toInsert?.forEach( ( insertion ?: string | UINSERT_MAP ) => {
								if( typeof( insertion ) === 'string' ) {
									//1d array
									outVal.push( { 
										replacer: r, 
										insertion: Parser.replaceAnonLoopBuf( {target: elChild, key: insertion as string} ) 
									} );
								}
								else if ( typeof( insertion ) === 'object' ) {
									//key/val
									const entries = Object.entries( insertion );
									if ( entries.length > 0  ) outObj.push( { 
										replacer: r, 
										insertion: Parser.replacedNamedLoopBuf( elChild, entries ) 
									} );
								}
								else {
									Debugger.raise( `warning: insertion ${loopName} has an unrecognized value of:\n` );
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
		} );
	
		const valStr = outVal.map( ( val: StackItem ) => val.insertion ).join( '' );
		const objStr = outObj.map( ( obj: StackItem ) => obj.insertion ).join( '' );
		outVal.forEach( ( _out: StackItem ) => copy = copy.replace( _out.replacer, valStr ) );
		outObj.forEach( ( _out: StackItem ) => copy = copy.replace( _out.replacer, objStr ) );

		return {
			raw: file, 
			renderMap, 
			insertionMap, 
			render: copy
		};
	}
}