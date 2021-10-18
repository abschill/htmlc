import iterateObj from "./iterate_object";
export default function renderItr( _copy: string, match: String[][], _iterator, outVal: Object[], outObj: Object[] ) {
    // const iterators = iterator( _copy );
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