/**
 * @module render
 * @description Handles Lexical Render Process for Internal Engine
 */
import { cleanHTML } from './internals/util/cleanHTML';
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
 * @param {FileInputMeta[]} declaredPartials array of partials declared in loader context
 * @param {fileUTF8} rawFile raw file contents to insert to
 * @param {UINSERT_MAP} insertMap map to insert values into templates from
 * @returns {RTemplate} The rendered template
 */
function render (
    declaredPartials: FileInputMeta[],
    rawFile: fileUTF8,
    insertMap: UINSERT_MAP
): RTemplate {
    const renMap = Parser.__renderMap( rawFile );
    try {
        if( renMap.todo_partials && renMap.todo_partials.length > 0 ) {
            rawFile = Compiler.shimPartials( rawFile, declaredPartials, insertMap );
        }
    
        if( renMap.todo_keys && renMap.todo_keys.length > 0 ) {
            rawFile = Compiler.shimKeys( rawFile, insertMap );
        }
    
        if( renMap.todo_loops && renMap.todo_loops.length > 0 ) {
            rawFile = Compiler.shimLoops( rawFile, insertMap );
        }
        return cleanHTML( rawFile );
    }
    catch( e ) {
		//Debugger.raise( 'Failed in Runtime' );
		//Debugger.raise( e );
        return rawFile;
    }
}

export default render;
