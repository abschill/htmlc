/**
 * @module render
 * @description Handles Lexical Render Process for Internal Engine
 */

import RESERVED_WORDS from './words';
import { FOR_H, FOR_T } from './words';
import { RenderMap, ResolvedRender } from '../internals';
import { cleanHTML } from '../util/cleanHTML';
import { Runtime } from '../loader';
import { FileInputMeta, StackItem } from '../internals';
const { log, warn } = console;

/**
 * 
 * @param {string} rawFile The File to generate Render Map on 
 * @returns {RenderMap} The todo loops for the map
 */

const genRenderMap = ( rawFile: string ): 
RenderMap => {
    let todo_partials: string[] = [];
    let todo_keys: string[] = [];
    let todo_loops: string[] = [];
    Object.entries( RESERVED_WORDS ).forEach( token => {
        switch( token[0] ) {
            case '@render':
                todo_keys = token[1]?.array( rawFile ) ?? [];
                break;
            case '@for':
                todo_loops = token[1]?.array( rawFile )  ?? [];
                break;
            case '@render-partial':
                todo_partials = token[1]?.array( rawFile ) ?? [];
                break;
            default:
                break;
        }
    } );
    todo_partials = todo_partials.filter( i => i );
    todo_keys = todo_keys.filter( i => i );
    todo_loops = todo_loops.filter( i => i );

    return { todo_partials, todo_keys, todo_loops };
}
const handle1DIterable = ( clone: string, insert: string ): Runtime.template => clone.replace( '{_}', insert );

const handleXDIterable = ( clone: string, insert: string[][] ): Runtime.template => {
    let copy = clone;
    insert.forEach( ( insertion: string[] ) => {
        copy = copy.replace( `{${insertion[0]}}`, insertion[1] );
    } );
    return copy;
}

/**
 * 
 * @param {string} file utf8 encoded file string to render into 
 * @param {RenderMap} renderMap Matched tags taken from file
 * @param {object} insertionMap map of values to render into template 
 * @returns {ResolvedRender} The Object Representing the rendered map with given insertions
 */
const resolveRender = ( file: string, renderMap: RenderMap, insertionMap: object ): 
ResolvedRender => {
    let copy = file;
    let outVal = [];
    let outObj = [];
    Object.entries( renderMap ).forEach( ( render: [ key: string, value: string[] ] )  => {
        if ( render[1] ) {
            render[1].forEach( r => {
                switch( render[0] ) {
                    case 'todo_keys':
                        const name = r.split( 'render=' )[1].split( '-->')[0];
                        const globalVals = insertionMap[ '*' ];
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
                        let toInsert = insertionMap[ loopName ];
                        let elChild = r.replace( FOR_H( loopName ), '' ).replace( FOR_T(), '' )
                                        .trimStart().replace( /\s\s+/gi, '');
                        toInsert?.forEach( ( insertion: string | object ) => {
                            if( typeof( insertion ) === 'string' ) {
                                //1d array
                                outVal.push( { replacer: r, insertion: handle1DIterable( elChild, insertion ) } );
                            }
                            else if( typeof( insertion ) === 'object' ) {
                                //key/val
                                outObj.push( { replacer: r, insertion: handleXDIterable( elChild, Object.entries( insertion ) ) } );
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
    return { raw: file, renderMap, insertionMap, render: copy };
}
/**
 * 
 * @param {Partial[]} declaredPartials array of partials declared in loader context
 * @param {string} rawFile raw file contents to insert to 
 * @param {object} insertMap map to insert values into templates from
 * @returns {string} The rendered template
 */
const template = ( declaredPartials: FileInputMeta[], rawFile: string, insertMap: object, debug?: boolean ): 
Runtime.template => {
    let rootCopy = rawFile;
    const { todo_partials, todo_keys, todo_loops } = genRenderMap( rootCopy );
    if( debug ) {
        log( 'Render Map:' );
        log( todo_partials );
        log( todo_keys );
        log( todo_loops );
    }
    todo_partials?.forEach( partialSeg => {
        //@ts-ignore
        const p_name = partialSeg.split( '@render-partial=' )[1].split( '-->' )[0];
        const matchPartials = declaredPartials.filter( n => n.name === p_name );
        if( matchPartials.length > 0 ) {
            matchPartials.forEach( partial => {
                const renderMap = genRenderMap( partial.rawFile );
                const global_insertion = {...insertMap['partialInput']['*'], ...insertMap['*']};
                const named_insertion = insertMap['partialInput'][p_name]; 
                const insertion = {...global_insertion, ...named_insertion };
                const resolved = resolveRender( partial.rawFile, renderMap, insertion );
                if( debug ) {
                    log( 'Resolved Partial:' );
                    log( resolved );
                }
                rootCopy = rootCopy.replace( partialSeg, resolved.render );
            } );
            
        }
    } );
    todo_keys?.forEach( _ => {
        const renderMap = genRenderMap( rootCopy );
        const resolved = resolveRender( rootCopy, renderMap, insertMap );
        if( debug ) {
            log( 'Resolved Key:' );
            log( resolved );
        }
        rootCopy = resolved.render;

    } ); 
    todo_loops?.forEach( _ => {
        const renderMap = genRenderMap( rootCopy );
        const resolved = resolveRender( rootCopy, renderMap, insertMap );
        if( debug ) {
            log( 'Resolved Loop:' );
            log( resolved );
        }
        rootCopy = resolved.render;
    } );

    try {
        return cleanHTML( rootCopy ); 
    }
    catch( e ) {
        warn( 'Failed to Clean HTML' );
        warn( e );
        return rootCopy;
    }
    
}
export default template;