import parsable from './parsable';
import Loader from '../loader';
import insertValue from './insert';
export default function renderVals( _copy: string, _varList: Object, config: Loader ) {
    let _dom = _copy;
    const _parser = parsable( _varList, _dom );
    _parser.forEach( ( p, idx ) => {
        const match = Object.entries( _varList )[ idx ];
        if( p && p.includes( 'render' ) ) {
            if( config.verbose ) {
                console.log( 'To Insert: \n' );
                console.log( match[1] );
                console.log( '\nAt:' );
                console.log( p );
            }
            _dom = insertValue( _dom, p, match[1] );
        }
    });
    return _dom;
}