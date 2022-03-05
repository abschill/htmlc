/**
 * @module render
 * @description Handles Lexical Render Process for Internal Engine
 */

import RESERVED_WORDS from './abt';
import { FOR_H, FOR_T } from './ast';
import { cleanHTML } from '../util/cleanHTML';
import { core } from '../loader';
import { internals, compiler } from './internals';
import { Debugger } from './internals';
const { warn } = console;

const rmap = (
    content: string
): compiler.RenderMap => {
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

const r1d_iterable = ( clone: string, insert: string ):
core.template => clone.replace( '{_}', insert );

const rxd_iterable = (
    clone: string,
    insert: internals.Insertion | internals.Entry
): core.template => {
    let copy = clone;
    insert.forEach( ( insertion: string | compiler.UINSERT_MAP ) => {
        copy = copy.replace( `{${insertion[0]}}`, insertion[1] );
    } );
    return copy;
}


function resolve(
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
                        const globalVals = insertionMap;
                        let replaceVal = insertionMap[ name ];
                        if( !replaceVal ) {
                            try {
                                replaceVal = globalVals[name];
                            }
                            catch( e ) {
                                warn( `Failed to find ${name} to insert into ${file}`);
                                replaceVal = '';
                            }
                        }
                        copy = copy.replace( r, replaceVal );
                        break;
                    case 'todo_loops':
                        const loopName = r.split( '(' )[1].split( ')' )[0];
                        let toInsert = insertionMap[loopName]
                        // if( debug ) stampLog( toInsert, 'toInsert::frommap|render/index.ts#L104' );

                        let elChild = r.replace( FOR_H( loopName ), '' ).replace( FOR_T(), '' )
                                        .trimStart().replace( /\s\s+/gi, '');
                        toInsert?.forEach( ( insertion ?: string | compiler.UINSERT_MAP ) => {
                            if( typeof( insertion ) === 'string' ) {
                                //1d array
                                outVal.push( { replacer: r, insertion: r1d_iterable( elChild, insertion as string ) } );
                            }
                            else if ( typeof( insertion ) === 'object' ) {
                                //key/val
                                const entries = Object.entries( insertion );
                                if( entries.length > 0  ) outObj.push( { replacer: r, insertion: rxd_iterable( elChild, entries ) } );
                            }
                            else {
                                warn( `warning: insertion ${loopName} has an unrecognized value of` );
                                warn( insertion );
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
            warn( `Warning: key ${itemlist} is missing a value to insert` );
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
/**
 *
 * @param {Partial[]} declaredPartials array of partials declared in loader context
 * @param {string} rawFile raw file contents to insert to
 * @param {object} insertMap map to insert values into templates from
 * @returns {string} The rendered template
 */
const render = (
    declaredPartials: internals.FileInputMeta[],
    rawFile: internals.fileUTF8,
    insertMap: compiler.UINSERT_MAP,
    debug?: boolean
): core.template => {
    let rootCopy = rawFile;
    const renMap = rmap( rootCopy );
    if( debug ) Debugger._registerMap( renMap, insertMap );

    if( renMap.todo_partials && renMap.todo_partials.length > 0 ) {
        renMap.todo_partials.forEach( ( partialSeg: string ) => {
            const p_name = partialSeg.split( '@partial=' )[1].split( '-->' )[0];
            const matchPartials = declaredPartials.filter( n => n.name === p_name );
            if( matchPartials.length > 0 ) {
                matchPartials.forEach( partial => {
                    const renderMap = rmap( partial.rawFile );

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
            const renderMap = rmap( rootCopy );
            const resolved = resolve( rootCopy, renderMap, insertMap );
			if( debug ) Debugger._registerMap( renderMap, insertMap );

            rootCopy = resolved.render;
        } );
    }

    if( renMap.todo_loops && renMap.todo_loops.length > 0 ) {
        renMap.todo_loops.forEach( _ => {
            const renderMap = rmap( rootCopy );
            const resolved = resolve( rootCopy, renderMap, insertMap );
            if( debug ) Debugger._registerMap( renderMap, insertMap );
            rootCopy = resolved.render;
        } );
    }

    try {
        return cleanHTML( rootCopy );
    }
    catch( e ) {
        warn( 'Failed to Clean HTML' );
        warn( e );
        return rootCopy;
    }

}
export default render;