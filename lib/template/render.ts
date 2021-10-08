import Loader from '../loader';
import iterator from '../util/iterator';
import iterateObj from '../util/iterate_object';
import configPartials from '../util/config_partial';
import countItr from '../util/create_itr_map';
import parsable from '../util/parsable';
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
                    _copy = _copy.replace( p, match[1] );
                }
                else{ 
                    if( p && p.includes( 'for' ) ) {
                        const _hLen = `<!--@for(${match[0]}){`;
                        const _tLen = '}-->';
                        match[1].forEach( matcher => {
                            let newIterator = _iterator;
                            //loop each submitted array item and create new element
                            newIterator = newIterator.replace( _hLen, '' );
                            newIterator = newIterator.replace( _tLen, '' );
                            const _el = newIterator.trim();
                            if( typeof( matcher ) === 'string' ) {
                                outVal.push( { 'child': _el.replace( '{_}', matcher ), parent: _iterator } );
                            }
                            else {
                                outObj.push( { 'child': iterateObj( _el, matcher ), parent: _iterator } );
                            } 
                        } );
                    }
                }
            } );
            const elArr = outVal.map( x => x.child ).join( '' );
            const valArr = outObj.map( x => x.child ).join( '' );
            outVal.forEach( ( _out ) => _copy = _copy.replace( _out.parent, elArr ) );
            outObj.forEach( ( _out ) => _copy = _copy.replace( _out.parent, valArr ) );
        }
    }
    return _copy;
}