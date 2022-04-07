/* eslint-disable no-case-declarations */
import {
	HTMLChunk,
	RenderMap,
	CompilerArgs,
	MapWithPartial,
	ResolvedMap,
	ResolvedMapItem,
	MappedEntry,
	MappedValue,
	LoaderContext
} from '../../types';
import Parser from './parser';
import { cleanHTML } from '../../internal/util/html';

export default class Compiler {

	static scanTemplateV1(
		args: CompilerArgs
	) {
		try {
			const fileData = args.caller_ctx.chunks.filter( chunk => chunk.type === 'template' && chunk.name === args.template_name )[0];
			return fileData.rawFile;
		}
		catch( e ) {
			console.warn( 'todo: handle scan template error - raw error: \n' );
			console.error( e );
		}
	}

	static compileTemplateV1(
		args: CompilerArgs
	): string {
		/**
		 * If any data was keyed with the template name in the constructor, we will use as a secondary priority load value
		 * these objects will default to {} if not entered
		 */
		const {templateInput = {}, partialInput = {}} = args.caller_ctx.config;
		// unset null data if applicable
		if( !args.caller_data ) args.caller_data = {};

		//if no data, load default input for template
		const globalInsertions:
		object = templateInput;
		if( Object.keys( args.caller_data ).length === 0 ) {
			const insertions:
			MapWithPartial = {...globalInsertions, partialInput};
			args.debug.event( 'template:load', {
				template_name: args.template_name,
				u_insert_map: args.caller_data,
				c_insert_map: insertions
			} );
			return Compiler.renderV1( args.caller_ctx.chunks.filter( chunk => chunk.type === 'partial' ), Compiler.scanTemplateV1( args ), insertions );
		}
		else {
			const scopedInsertions:
			object = {...templateInput, ...args.caller_data};
			const insertions:
			MapWithPartial = {...globalInsertions, ...scopedInsertions,
				partialInput: {
					...partialInput,
					...args.caller_data['partialInput']
				}
			};
			args.debug.event( 'template:load', {
				template_name: args.template_name,
				u_insert_map: args.caller_data,
				c_insert_map: insertions
			} );
			return Compiler.renderV1( args.caller_ctx.chunks.filter( chunk => chunk.type === 'partial' ), Compiler.scanTemplateV1( args ), insertions, args.caller_ctx.config.intlCode );
		}
	}

	static renderV1 (
		declaredPartials: HTMLChunk[],
		rawFile: string,
		insertMap: object,
		lang ?: string
	): string {
		const renMap = Parser.renderMap( rawFile );
		try {
			if( renMap.todo_partials && renMap.todo_partials.length > 0 ) rawFile = Compiler.shimPartialsV1( rawFile, declaredPartials, insertMap );
			if( renMap.todo_keys && renMap.todo_keys.length > 0 ) rawFile = Compiler.shimKeysV1( rawFile, insertMap );
			if( renMap.todo_loops && renMap.todo_loops.length > 0 ) rawFile = Compiler.shimLoopsV1( rawFile, insertMap );
			return cleanHTML( rawFile, lang );
		}
		catch( e ) {
			return rawFile;
		}
	}

	static resolveV1 (
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
	/**
	 * @function renderPartialsV5
	 * @description a reworked module in 0.5.9
	 * @param chunkData {HTMLChunk} the chunk contents to render
	 * @param insertMap {object} the map from which to pull values
	 * @returns List of preloaded chunks for runtime
	 */
	public static renderPartialV5(
		chunkData: HTMLChunk,
		insertMap: object
	): string {
		let renderedChunk = chunkData.rawFile;

		const scoped_insertion = insertMap['partialInput'] ?? {};
		const insertion = {...insertMap, ...scoped_insertion};

		const toReplaceChunks = Parser.ABT.map( word => {
			const buffer = word.array( chunkData.rawFile );
			if( !buffer || buffer.length === 0 ) return null;
			return { buffer, keyname: word.key };
		} ).filter( e => e ).flat();

		if( !toReplaceChunks || toReplaceChunks.length === 0 ) return;
		toReplaceChunks.map( chunk => {
			chunk.buffer.forEach( buf => {
				const keyname = buf.replace( `<!--${chunk.keyname}=`, '' ).replace( '-->', '' );
				renderedChunk = renderedChunk.replace( buf, insertion[keyname] );
			} );
		} );
		return renderedChunk;
	}

	/**
	 * @function preloadChunksV5
	 * @description a reworked module in 0.5.9 to minimize runtime execution speed of preloadable modules that don't require / have sufficient data from constructor/fallbacks
	 * @param ctx Context of chunks to Preload
	 * @returns List of preloaded chunks for runtime
	 */
	public static preloadChunksV5(
		ctx: LoaderContext
	): HTMLChunk[] {
		//todo - setup partial signature resolution for templates if the called partials don't have needsRehydrate
		return ctx.chunks.map( ( fd: HTMLChunk ) => {
			if( !Parser.hasSymbols( fd.rawFile ) ) {
				fd.renderedChunk = fd.rawFile;
				return fd;
			}
			return fd;
		} );
	}

	static resolvePartialsV1(
		renMap: RenderMap, //map of things to be rendered into template
		declaredPartials: HTMLChunk[], //map of declared partials in runtime
		insertMap: object,
		rootCopy: string
	): string {
		// this will be an optional strategy soon to hydrate on load rather than prerender, which will be the new default
		renMap.todo_partials.forEach( ( partialSeg: string ) => {
            const p_name = partialSeg.split( `${Parser.__partialKey__}=` )[1].split( Parser.__CLOSE__ )[0];
            const matchPartials = declaredPartials.filter( n => n.name === p_name );
            if( matchPartials.length > 0 ) {
                matchPartials.forEach( partial => {
					if( partial.renderedChunk && !partial.needsRehydrate ) {
						rootCopy = rootCopy.replace( partialSeg, partial.renderedChunk );
					}
					else {
						const scoped_insertion = insertMap['partialInput'] ?? {};
						const insertion = {...insertMap, ...scoped_insertion};
						// todo - @0.5.9 - set up prerender for partials instead of putting the raw file into the template here
						rootCopy = rootCopy.replace(
							partialSeg,
							Compiler.resolveV1( partial.rawFile, Parser.renderMap( partial.rawFile ), insertion ).render
						);
					}
                } );
            }
		} );
		return rootCopy;
	}

	static resolveKeysV1(
		renMap: RenderMap,
		insertMap: object,
		rootCopy: string
	): string {
		renMap.todo_keys.forEach( _ => rootCopy = Compiler.resolveV1( rootCopy, Parser.renderMap( rootCopy ), insertMap ).render );
		return rootCopy;
	}

	static resolveLoopsV1(
		renMap: RenderMap,
		insertMap: object,
		rootCopy: string
	): string {
		renMap.todo_loops.forEach( _ => rootCopy = Compiler.resolveV1( rootCopy, Parser.renderMap( rootCopy ), insertMap ).render );
		return rootCopy;
	}

	/**
	 * @param {string} copy the processing template
	 * @param {object} insertMap map to insert values into templates from
	 * @returns {string} The processing template
	 */
	static shimKeysV1 = (
		copy: string,
		insertMap: object
	): string => Compiler.resolveKeysV1( Parser.renderMap( copy ), insertMap, copy );

	/**
	 * @param copy - process template
	 * @param declaredPartials - partial set from the initializer ff
	 * @param insertMap - map to insert values into templates from
	 * @returns {string} process template
	 */
	static shimPartialsV1 = (
		copy: string,
		declaredPartials: HTMLChunk[],
		insertMap: object
	): string => Compiler.resolvePartialsV1( Parser.renderMap( copy ), declaredPartials, insertMap, copy );

	/**
	 * @param copy - process template
	 * @param insertMap - map to insert values from
	 * @returns {string} The rendered template
	 */
	static shimLoopsV1 = (
		copy: string,
		insertMap: object
	): string => Compiler.resolveLoopsV1( Parser.renderMap( copy ), insertMap, copy );
}
