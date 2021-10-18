import parsable from './parsable';
import Loader from '../loader';
import insertValue from './insert';
export default function renderVals( name: string, _copy: string, _varList: Object, verbose: boolean ) {
    let _dom = _copy;
    
    const theRenderObj = _varList[ name ];
    const _parser = parsable( name,  theRenderObj, _dom );
    // if( verbose ) {
    //     console.log( 'render: ' );
    //     console.log( theRenderObj );
    //     console.log( 'into:' );
    //     console.log( _parser );
    // }
    _parser.forEach( ( p, idx ) => {
        console.log( 'in parser ' );
        console.log( p );
         const match = Object.entries( _varList )[ idx ];
         if( match && match.length === 2 ) {
             console.log( 'match' );
             console.log( match );
            const match_match = match[1]
            if( typeof( p ) === 'string' ) {
                const  _key = p.split( '=' )[1].split( '-->')[0];
                console.log( 'render ' +_key );
                console.log( match_match[_key] );
            }
            
            // console.log( match_match[] );
         }
         
        // if( p && p.includes( 'render' ) ) {
        //     if( verbose ) {
        //         console.log( 'To Insert: \n' );
        //         console.log( match[1] );
        //         console.log( '\nAt:' );
        //         console.log( p );
        //     }
        //     _dom = insertValue( _dom, p, match[1] );
        // }
    });
    return _dom;
}