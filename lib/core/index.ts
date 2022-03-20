/**
 * @module render
 * @description Handles Lexical Render Process for Internal Engine
 */
import { cleanHTML } from './internals/util/cleanHTML';
import Debugger from './internals/debugger';
import Compiler  from './compile';
import { 
    RTemplate,
    FileInputMeta,
    fileUTF8,
    UINSERT_MAP
} from './internals/types';

/**
 * @param 
 * @param {UINSERT_MAP} insertMap map to insert values into templates from
 * @returns {RTemplate} The processing template
 */
const shimKeys = ( 
    copy: RTemplate,
    insertMap: UINSERT_MAP
): RTemplate => Compiler.resolveDeclaredKeys( Compiler.__renderMap( copy ), insertMap, copy );

/**
 * @param copy - process template
 * @param declaredPartials - partial set from the initializer ff
 * @param insertMap - map to insert values into templates from
 * @returns {RTemplate} process template
 */
const shimPartials = (
    copy: RTemplate,
    declaredPartials: FileInputMeta[],
    insertMap: UINSERT_MAP
): RTemplate => Compiler.resolveDeclaredPartials( Compiler.__renderMap( copy ), declaredPartials, insertMap, copy );

/**
 * @param copy - process template
 * @param insertMap - map to insert values from
 * @returns {RTemplate} The rendered template
 */
const shimLoops = (
    copy: RTemplate,
    insertMap: UINSERT_MAP
): RTemplate => Compiler.resolveDeclaredLoops( Compiler.__renderMap( copy ), insertMap, copy );

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
    let rootCopy = rawFile;
    const renMap = Compiler.__renderMap( rootCopy );
    try {
        if( renMap.todo_partials && renMap.todo_partials.length > 0 ) {
            rootCopy = shimPartials( rootCopy, declaredPartials, insertMap );
        }
    
        if( renMap.todo_keys && renMap.todo_keys.length > 0 ) {
            rootCopy = shimKeys( rootCopy, insertMap );
        }
    
        if( renMap.todo_loops && renMap.todo_loops.length > 0 ) {
            // const renderMap = Compiler.__renderMap( rootCopy );
            rootCopy = shimLoops( rootCopy, insertMap );
        }
        return cleanHTML( rootCopy );
    }
    catch( e ) {
		//Debugger.raise( 'Failed in Runtime' );
		//Debugger.raise( e );
        return rootCopy;
    }
}

export default render;
