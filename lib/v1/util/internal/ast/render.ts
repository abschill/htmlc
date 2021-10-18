import RESERVED_WORDS from './words';

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
    return { todo_partials, todo_keys, todo_loops, rawFile };
}
const resolveRender = ( file, renderMap, insertionMap ) => {
    let copy = file;
    return { raw: file, renderMap, insertionMap, render: copy };
}

const template = ( declaredPartials, rawFile: string, insertMap: object ) => {
    let rootCopy = rawFile;
    const { todo_partials, todo_keys, todo_loops } = genRenderMap( rootCopy );
    //partials first 
    todo_partials.forEach( partialSeg => {
        //@ts-ignore
        const p_name = partialSeg.split( '=' )[1].split( '-->' )[0];
        
        // console.log( rawFile );
        const matchPartials = declaredPartials.filter( n => n.name === p_name );
        if( matchPartials.length > 0 ) {
            matchPartials.forEach( partial => {
                const renderMap = genRenderMap( partial.rawFile );
                const resolved = resolveRender( partial.rawFile, renderMap, insertMap['partialInput'][p_name] );
                console.log( 'Partial: ');
                console.log( partial );
                console.log( resolved );
            } );
            
        }
        // console.log( p_name );
    } );
    const keys = Object.keys( insertMap );
    const values = Object.values( insertMap );

}
export default template;