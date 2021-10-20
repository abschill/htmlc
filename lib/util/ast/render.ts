import RESERVED_WORDS from './words';
import { FOR_H, FOR_T } from './words';
import { RenderMap, RenderTemplateArgs } from '../../../';
const genRenderMap = ( rawFile: string ): RenderMap => {
    let todo_partials: string[];
    let todo_keys: string[];
    let todo_loops: string[];
    Object.entries( RESERVED_WORDS ).forEach( token => {
        switch( token[0] ) {
            case '@render':
                todo_keys = token[1].array( rawFile );
                break;
            case '@for':
                todo_loops = token[1].array( rawFile );
                break;
            case '@render-partial':
                todo_partials = token[1].array( rawFile );
                break;
            default:
                break;
        }
    } );
    return { todo_partials, todo_keys, todo_loops };
}
const handle1DIterable = ( clone, insert ): string => clone.replace( '{_}', insert );

const handleXDIterable = ( clone, insert ): string => {
    let copy = clone;
    insert.forEach( insertion => {
        copy = copy.replace( `{${insertion[0]}}`, insertion[1] );
    } );
    return copy;
}

/**
 * 
 * @param {string} file utf8 encoded file string to render into 
 * @param {RenderMap} renderMap Matched tags taken from file
 * @param {object} insertionMap map of values to render into template 
 * @returns 
 */
const resolveRender = ( file: string, renderMap: RenderMap, insertionMap: object ) => {
    let copy = file;
    let outVal = [];
    let outObj = [];
    //console.log( 'insertion map: ')
    //console.log( insertionMap )
    // console.log( 'render map: ' );
    // console.log( renderMap );
    Object.entries( renderMap ).forEach( ( render: [key: string, value: any], itr )  => {
        // console.log( itr );
        // console.log( render[0] );
        if ( render[1] ) {
            //console.log( 'render[1]:')
            //console.log( render[1] );
            render[1].forEach( r => {
                // console.log( render[0] );
                switch( render[0] ) {
                    case 'todo_keys':
                        const name = r.split( 'render=' )[1].split( '-->')[0];
                        const globalVals = insertionMap['*'];
                        // console.log( globalVals );
                        let replaceVal = insertionMap[ name ];
                        //console.log( r );
                        //console.log( 'replaceVal: ' );
                        //console.log( replaceVal );
                        if( !replaceVal ) {
                            try {
                                replaceVal = globalVals[name];
                            }
                            catch( e ) {
                                console.warn( `Failed to find ${name} to insert into ${file}`);
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
                        toInsert?.forEach( insertion => {
                            if( typeof( insertion ) === 'string' ) {
                                //1d array
                                // console.log()
                                outVal.push( { replacer: r, insertion: handle1DIterable( elChild, insertion ) } );
                            }
                            else if( typeof( insertion ) === 'object' ) {
                                //key/val
                                outObj.push( { replacer: r, insertion: handleXDIterable( elChild, Object.entries( insertion ) ) } );
                            }
                            
                        } );
                        break;
                    case 'todo_partials':
                        //console.log( 'todo partial case' );
                         //console.log( r );
                        break;
                    default:
                        break;
                }
            } );
            // console.log( '~~~~~~~~~~~~~~~~~' )
            // console.log( outVal );
            // console.log( outObj );
           
           // console.log( { key: render[0], value: render[1] } );
        }
    } );
    const valStr = outVal.map( val => val.insertion ).join( '' );
    const objStr = outObj.map( obj => obj.insertion ).join( '' );
    outVal.forEach( ( _out ) => copy = copy.replace( _out.replacer, valStr ) );
    outObj.forEach( ( _out ) => copy = copy.replace( _out.replacer, objStr ) );
    return { raw: file, renderMap, insertionMap, render: copy };
}
/**
 * 
 * @param {Partial[]} declaredPartials array of partials declared in loader context
 * @param {string} rawFile raw file contents to insert to 
 * @param {object} insertMap map to insert values into templates from
 * @returns {void}
 */
const template = ( declaredPartials, rawFile: string, insertMap: object ) => {
    let rootCopy = rawFile;
    const { todo_partials, todo_keys, todo_loops } = genRenderMap( rootCopy );
    //console.log( insertMap );
    //partials first 
    todo_partials.forEach( partialSeg => {
        //@ts-ignore
        const p_name = partialSeg.split( '@render-partial=' )[1].split( '-->' )[0];
        
        // console.log( rawFile );
        const matchPartials = declaredPartials.filter( n => n.name === p_name );
        if( matchPartials.length > 0 ) {
            matchPartials.forEach( partial => {
                const renderMap = genRenderMap( partial.rawFile );
                const global_insertion = {...insertMap['partialInput']['*'], ...insertMap['*']};
                const named_insertion = insertMap['partialInput'][p_name]; 
                const insertion = {...global_insertion, ...named_insertion };
                const resolved = resolveRender( partial.rawFile, renderMap, insertion );
                rootCopy = rootCopy.replace( partialSeg, resolved.render );
            } );
            
        }
        // console.log( p_name );
    } );
    todo_keys.forEach( keySeg => {
        //const k_name = keySeg.split( '@render=' )[1].split( '-->' )[0];
        const renderMap = genRenderMap( rootCopy );
        const resolved = resolveRender( rootCopy, renderMap, insertMap );
        rootCopy = resolved.render;
        // const k_val = insertMap[ k_name ];
        // rootCopy = rootCopy.replace( keySeg, k_val ); 
    } ); 
    return rootCopy;

}
export default template;