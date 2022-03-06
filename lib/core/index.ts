/**
 * @module render
 * @description Handles Lexical Render Process for Internal Engine
 */
import { cleanHTML } from '../util/cleanHTML';
import { core } from '../loader';
import { internals, compiler } from './internals';
import { Debugger } from './internals';
import { __renderMap, resolve } from './compile';
/**
 *
 * @param {Partial[]} declaredPartials array of partials declared in loader context
 * @param {string} rawFile raw file contents to insert to
 * @param {object} insertMap map to insert values into templates from
 * @param debug
 * @returns {string} The rendered template
 */
const render = (
    declaredPartials: internals.FileInputMeta[],
    rawFile: internals.fileUTF8,
    insertMap: compiler.UINSERT_MAP,
    debug ?: boolean
): core.template => {
    let rootCopy = rawFile;
    const renMap = __renderMap( rootCopy );
    if( debug ) Debugger._registerMap( renMap, insertMap );

    if( renMap.todo_partials && renMap.todo_partials.length > 0 ) {
        renMap.todo_partials.forEach( ( partialSeg: string ) => {
            const p_name = partialSeg.split( '@partial=' )[1].split( '-->' )[0];
            const matchPartials = declaredPartials.filter( n => n.name === p_name );
            if( matchPartials.length > 0 ) {
                matchPartials.forEach( partial => {
                    const renderMap = __renderMap( partial.rawFile );
                    const scoped_insertion = insertMap[ 'partialInput' ] ?? {};
                    const insertion = {...insertMap, ...scoped_insertion };
                    const resolved = resolve( partial.rawFile, renderMap, insertion, debug );
                    if( debug ) Debugger._registerMap( renderMap, insertMap );
                    rootCopy = rootCopy.replace( partialSeg, resolved.render );
                } );
            }
        } );
    }

    if( renMap.todo_keys && renMap.todo_keys.length > 0 ) {
        renMap.todo_keys.forEach( _ => {
            const renderMap = __renderMap( rootCopy );
            const resolved = resolve( rootCopy, renderMap, insertMap );
			if( debug ) Debugger._registerMap( renderMap, insertMap );

            rootCopy = resolved.render;
        } );
    }

    if( renMap.todo_loops && renMap.todo_loops.length > 0 ) {
        renMap.todo_loops.forEach( _ => {
            const renderMap = __renderMap( rootCopy );
            if( debug ) Debugger._registerMap( renderMap, insertMap );
            rootCopy = resolve( rootCopy, renderMap, insertMap ).render;
        } );
    }

    try {
        return cleanHTML( rootCopy );
    }
    catch( e ) {
		Debugger.raise( 'Failed to Clean HTML' );
		Debugger.raise( e );
        return rootCopy;
    }
}
export default render;
