/**
 * @module render
 * @description Handles Lexical Render Process for Internal Engine
 */
import { cleanHTML } from './internals/util/cleanHTML';
import Debugger from './internals/debugger';
import Compiler  from './compile';
import Parser from './parser';
import { 
    RTemplate,
    FileInputMeta,
    fileUTF8,
    UINSERT_MAP
} from './internals/types';
/**
 *
 * @param {Partial[]} declaredPartials array of partials declared in loader context
 * @param {string} rawFile raw file contents to insert to
 * @param {object} insertMap map to insert values into templates from
 * @param debug
 * @returns {string} The rendered template
 */
const render = (
    declaredPartials: FileInputMeta[],
    rawFile: fileUTF8,
    insertMap: UINSERT_MAP,
    debug ?: boolean
): RTemplate => {
    let rootCopy = rawFile;
    const renMap = Compiler.__renderMap( rootCopy );
    if( debug ) Debugger._registerMap( renMap, insertMap );

    if( renMap.todo_partials && renMap.todo_partials.length > 0 ) rootCopy = Compiler.resolveDeclaredPartials( renMap, declaredPartials, insertMap, rootCopy );

    if( renMap.todo_keys && renMap.todo_keys.length > 0 ) {
        const renderMap = Compiler.__renderMap( rootCopy );
        rootCopy = Compiler.resolveDeclaredKeys( renderMap, insertMap, rootCopy );
    }

    if( renMap.todo_loops && renMap.todo_loops.length > 0 ) {
        const renderMap = Compiler.__renderMap( rootCopy );
        rootCopy = Compiler.resolveDeclaredLoops( renderMap, insertMap, rootCopy );
    }

    try {
        const render = cleanHTML( rootCopy );
        if( debug ) Debugger._finalize( {raw: rawFile, render} );
        return render;
    }
    catch( e ) {
		Debugger.raise( 'Failed to Clean HTML' );
		Debugger.raise( e );
        return rootCopy;
    }
}
export default render;
