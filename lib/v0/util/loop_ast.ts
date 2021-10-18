
import iterator from "./iterator";
export default function loopAST( clone, toInsert ) {
    const outVal = [];
    const outObj = [];
    let _dom = clone;
    const entries: any[] = Object.entries( toInsert ).filter( i => typeof( i[1] ) !== 'string' );
    const _iterator = iterator( _dom );
   //each entry: [key, value]
   entries.forEach( ( match, idx ) => {
     const _itrCopy = _iterator[idx];
     const _hLen = `<!--@for(${match[0]}){`;
     const _tLen = '}-->';
    match[1].forEach( item => {
        let _copy = _itrCopy;
        _copy = _copy.replace( _hLen, '' );
        _copy = _copy.replace( _tLen, '' );
        //if its an array of objects
        if( typeof( item ) === 'object' ) {
            const mapper = Object.entries( item );
            mapper.forEach( i => {
                //put each value 
                if( typeof( i[1]) === 'string' ) {
                   _copy = _copy.replace( `{${i[0]}}`, i[1] );
                }
            });
            if( !_copy.includes( '<pre>' ) ) {
                 _copy = _copy.trimStart().replace(/\s\s+/gi, '' );
            }
            outObj.push( {child: _copy, parent: _itrCopy } );
        }
        else {
            //its an array of raw values
            _copy = _copy.replace( `{_}`, item );
            if( !_copy.includes( '<pre>' ) ) {
                _copy = _copy.trimStart().replace(/\s\s+/gi, '' );
           }
            outVal.push( { child: _copy, parent: _itrCopy } );
        }
    } );
   } );
    return { outObj, outVal };
}