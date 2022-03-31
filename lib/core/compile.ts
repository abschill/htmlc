/* eslint-disable no-case-declarations */
import { 
	ResolvedFile,
	RenderMap,
	CompilerArgs,
	RMap,
	ResolvedMap,
	ResolvedMapItem,
	MappedEntry, 
	MappedValue,
} from './internals/types';
import Parser from './parser';
import { cleanHTML } from './internals/util/html';

export default class Compiler {

	static scanTemplate( 
		args: CompilerArgs 
	) {
		const fileData = args.template_ctx.templates.filter( ( temp: ResolvedFile ) => temp.name === args.template_name )[0];
		return fileData.rawFile;
	}

	static compile( 
		args: CompilerArgs 
	): string {
		/**
		 * If any data was keyed with the template name in the constructor, we will use as a secondary priority load value
		 * these objects will default to {} if not entered
		 */
		const {templateInput = {}, partialInput = {}} = args.template_ctx.config;
		// unset null data if applicable
		if( !args.template_data ) args.template_data = {};
	
	
		//if no data, load default input for template
		const globalInsertions:
		object = templateInput;
		if( Object.keys( args.template_data ).length === 0 ) {
			const insertions:
			RMap = {...globalInsertions, partialInput};
			args._debugger.event( 'template:load', {
				template_name: args.template_name, 
				u_insert_map: args.template_data, 
				c_insert_map: insertions 
			} );
			return Compiler.render( args.template_ctx.partials, Compiler.scanTemplate( args ), insertions );
		}
		else {
			const scopedInsertions:
			object = {...templateInput, ...args.template_data};
			const insertions:
			RMap = {...globalInsertions, ...scopedInsertions,
				partialInput: {
					...partialInput,
					...args.template_data['partialInput']
				}
			};
			args._debugger.event( 'template:load', { 
				template_name: args.template_name, 
				u_insert_map: args.template_data, 
				c_insert_map: insertions 
			} );
			return Compiler.render( args.template_ctx.partials, Compiler.scanTemplate( args ), insertions );
		}
	}

	static render (
		declaredPartials: ResolvedFile[],
		rawFile: string,
		insertMap: object
	): string {
		const renMap = Parser.renderMap( rawFile );
		try {
			if( renMap.todo_partials && renMap.todo_partials.length > 0 ) rawFile = Compiler.shimPartials( rawFile, declaredPartials, insertMap );
			if( renMap.todo_keys && renMap.todo_keys.length > 0 ) rawFile = Compiler.shimKeys( rawFile, insertMap );
			if( renMap.todo_loops && renMap.todo_loops.length > 0 ) rawFile = Compiler.shimLoops( rawFile, insertMap );
			return cleanHTML( rawFile );
		}
		catch( e ) {
			return rawFile;
		}
	}
	
	static resolve (
		file: string,
		renderMap: RenderMap,
		insertionMap: object
	): ResolvedMap {
		let render = file;
		const outVal: ResolvedMapItem[] = [];
		const outObj: ResolvedMapItem[] = [];

		/**  this is an entry in render map, as a tuple in the form of
		 * [ ENTRY_TYPE, ENTRY_LIST ]
		 * ENTRY_TYPE will be either todo_keys, todo_loops, todo_partials
		**/
		for( const [ key, value ] of Object.entries( renderMap ) ) {
			const itemlist = [ key, value ] as MappedEntry;
			itemlist[1].forEach( ( r: MappedValue ) => {
				switch( itemlist[0] ) {
					case 'todo_keys':
						r = r as string;
						const name = r.split( `${Parser.__renderKey__}=` )[1].split( Parser.__CLOSE__ )[0];
						const globals = insertionMap;
						let replaceVal = insertionMap[name];
						if( !replaceVal ) {
							try {
								replaceVal = globals[name];
							}
							catch( e ) {
								replaceVal = '';
							}
						}
						render = render.replace( r, replaceVal );
						break;
					case 'todo_loops':
						r = r as string;
						const loopName = r.split( '(' )[1]?.split( ')' )[0];
						const toInsert = insertionMap[loopName];
						const elChild: string = r.replace( Parser.LOOP_OPEN( loopName ), '' ).replace( Parser.LOOP_CLOSE, '' )
						.trimStart().replace( /\s\s+/gi, '' );

						toInsert?.forEach( ( insertion ?: string | object ) => {
							r = r as string;
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

		const valStr: string = outVal.map( ( val: ResolvedMapItem ) => val.insertion ).join( '' );
		const objStr: string = outObj.map( ( obj: ResolvedMapItem ) => obj.insertion ).join( '' );

		outVal.forEach( ( _out: ResolvedMapItem ) => render = render.replace( _out.replacer, valStr ) );
		outObj.forEach( ( _out: ResolvedMapItem ) => render = render.replace( _out.replacer, objStr ) );

		Parser.checkDeprecation( render );

		return {
			raw: file, 
			render
		};
	}

	static resolvePartials( 
		renMap: RenderMap, 
		declaredPartials: ResolvedFile[], 
		insertMap: object,
		rootCopy: string
	): string {
		renMap.todo_partials.forEach( ( partialSeg: string ) => {
            const p_name = partialSeg.split( `${Parser.__partialKey__}=` )[1].split( Parser.__CLOSE__ )[0];
            const matchPartials = declaredPartials.filter( n => n.name === p_name );
            if( matchPartials.length > 0 ) {
                matchPartials.forEach( partial => {
                    const scoped_insertion = insertMap['partialInput'] ?? {};
                    const insertion = {...insertMap, ...scoped_insertion};
                    rootCopy = rootCopy.replace( 
						partialSeg, 
						Compiler.resolve( partial.rawFile, Parser.renderMap( partial.rawFile ), insertion ).render 
					);
                } );
            }
        } );
		return rootCopy;
	}

	static resolveKeys(
		renMap: RenderMap, 
		insertMap: object,
		rootCopy: string
	): string {
		renMap.todo_keys.forEach( _ => rootCopy = Compiler.resolve( rootCopy, Parser.renderMap( rootCopy ), insertMap ).render );
		return rootCopy;
	}

	static resolveLoops(
		renMap: RenderMap,
		insertMap: object,
		rootCopy: string
	): string {
		renMap.todo_loops.forEach( _ => rootCopy = Compiler.resolve( rootCopy, Parser.renderMap( rootCopy ), insertMap ).render );
		return rootCopy;
	}

	/**
	 * @param 
	 * @param {object} insertMap map to insert values into templates from
	 * @returns {string} The processing template
	 */
	static shimKeys = ( 
		copy: string,
		insertMap: object
	): string => Compiler.resolveKeys( Parser.renderMap( copy ), insertMap, copy );

	/**
	 * @param copy - process template
	 * @param declaredPartials - partial set from the initializer ff
	 * @param insertMap - map to insert values into templates from
	 * @returns {string} process template
	 */
	static shimPartials = (
		copy: string,
		declaredPartials: ResolvedFile[],
		insertMap: object
	): string => Compiler.resolvePartials( Parser.renderMap( copy ), declaredPartials, insertMap, copy );

	/**
	 * @param copy - process template
	 * @param insertMap - map to insert values from
	 * @returns {string} The rendered template
	 */
	static shimLoops = (
		copy: string,
		insertMap: object
	): string => Compiler.resolveLoops( Parser.renderMap( copy ), insertMap, copy );
}