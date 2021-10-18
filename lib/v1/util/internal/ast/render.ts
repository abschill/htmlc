import RESERVED_WORDS from './words';
import { FOR_H, FOR_T } from './words';
const genRenderMap = ( rawFile: string ) => {
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
const handle1DIterable = ( clone, insert ) => clone.replace( '{_}', insert );

const handleXDIterable = ( clone, insert ) => {
    let copy = clone;
    insert.forEach( insertion => {
        copy = copy.replace( `{${insertion[0]}}`, insertion[1] );
    } );
    return copy;
}


const resolveRender = ( file, renderMap, insertionMap ) => {
    let copy = file;
    let outVal = [];
    let outObj = [];
    // console.log( insertionMap )
    Object.entries( renderMap ).forEach( ( render: [key: string, value: any], itr )  => {
        // console.log( itr );
        // console.log( render[0] );
        if ( render[1] ) {
            // console.log( render[1] );
            render[1].forEach( r => {
                // console.log( render[0] );
                switch( render[0] ) {
                    case 'todo_keys':
                        const name = r.split( 'render=' )[1].split( '-->')[0];
                        const replaceVal = insertionMap[ name ]
                        copy = copy.replace( r, replaceVal );
                        break;
                    case 'todo_loops':
                        const loopName = r.split( '(' )[1].split( ')' )[0];
                        const toInsert = insertionMap[ loopName ];
                        //console.log( `Loop: ${loopName}` );
                        let elChild = r.replace( FOR_H( loopName ), '' ).replace( FOR_T(), '' )
                                        .trimStart().replace( /\s\s+/gi, '');
                        toInsert.forEach( insertion => {
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
                         console.log( r );
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

const template = ( declaredPartials, rawFile: string, insertMap: object ) => {
    let rootCopy = rawFile;
    const { todo_partials, todo_keys, todo_loops } = genRenderMap( rootCopy );
    //partials first 
    todo_partials.forEach( partialSeg => {
        //@ts-ignore
        const p_name = partialSeg.split( '@render-partial=' )[1].split( '-->' )[0];
        
        // console.log( rawFile );
        const matchPartials = declaredPartials.filter( n => n.name === p_name );
        if( matchPartials.length > 0 ) {
            matchPartials.forEach( partial => {
                const renderMap = genRenderMap( partial.rawFile );
                const resolved = resolveRender( partial.rawFile, renderMap, insertMap['partialInput'][p_name] );
                // console.log( 'Partial: ');
                // console.log( partial );
            //     console.log( 'Resolved: ')
            //    console.log( resolved );
            //    console.log( 'Insert into: ' );
            //    console.log( rootCopy );
               rootCopy = rootCopy.replace( partialSeg, resolved.render );
            //    console.log( partialSeg );
            } );
            
        }
        // console.log( p_name );
    } );
    todo_keys.forEach ( key => {
        const { todo_keys } = genRenderMap( rootCopy );
        todo_keys.forEach( keySeg => {
            const k_name = keySeg.split( '@render=' )[1].split( '-->' )[0];
            // const k_val = resolveRender( rawFile, renderMap );
            console.log( rootCopy );
            console.log( k_name );
            console.log( keySeg );
        } );
        
    } ); 
    console.log( rootCopy );
    const keys = Object.keys( insertMap );
    const values = Object.values( insertMap );

}
export default template;