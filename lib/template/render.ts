import Loader from '../loader';
import iterator from '../util/iterator';
import configPartials from '../util/config_partial';
import countItr from '../util/create_itr_map';
import parsable from '../util/parsable';
import insertValue from '../util/insert';
import renderVals from '../util/render_vals';
import renderItr from '../util/render_itr';
export default function render( _varList:Object, inp: string, config: Loader ) {
    let _copy = inp;
    _copy = configPartials( config, _copy );
    if( Object.keys( _varList ).length > 0 ) {
        const num_iterables = countItr( _varList );
        const iterators = iterator( _copy );
        if( num_iterables === iterators?.length ) {
            const _dom = _copy;
            const _parser = parsable( _varList, _dom );
            let outVal = [];
            let outObj = [];
            _parser.forEach( ( p, idx ) => {
                const _iterator = iterators[idx - 1];
                const match = Object.entries( _varList )[ idx ];
                if( p && p.includes( 'render' ) ) {
                    if( config.verbose ) {
                        console.log( 'To Insert: \n' );
                        console.log( match[1] );
                        console.log( '\nAt:' );
                        console.log( p );
                    }
                    _copy = insertValue( _copy, p, match[1] );
                }
                else{ 
                    if( p && p.includes( 'for' ) ) {
                        renderItr( _copy, match, _iterator, outVal, outObj );
                    }
                }
            } );
            if( config.verbose ) {
                console.log( 'Out Values:\n' );
                console.log( outVal );
                console.log( 'Out Objects:\n' );
                console.log( outObj );
            }
            const elArr:string = outVal.map( x => x.child ).join( '' );
            const valArr:string = outObj.map( x => x.child ).join( '' );
            
            if( config.verbose ) {
                console.log( 'Element Array:\n' );
                console.log( elArr );
                console.log( '\nValue Array:\n' );
                console.log( valArr );
            }
            outVal.forEach( ( _out ) => _copy = insertValue( _copy,  _out.parent, elArr ) );
            outObj.forEach( ( _out ) => _copy = insertValue( _copy,  _out.parent, valArr ) );
        } else if( iterators?.length === ( 0 || null || undefined) ) {
            _copy = renderVals( _copy, _varList, config );
        }
    }
    return _copy;
}