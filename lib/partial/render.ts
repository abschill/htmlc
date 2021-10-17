import iterator from "../util/iterator";
import countItr from "../util/create_itr_map";
import loopAST from '../util/loop_ast';
import renderVals from "../util/render_vals";
import insertValue from "../util/insert";
export default function render( toInsert, copy ) {
    let clone = copy;
    const num_iterables = countItr( toInsert );
    const iterators = iterator( clone );
    clone = renderVals( clone, toInsert ); 
    if( Object.keys( toInsert ).length > 0 ) {
        if( num_iterables === iterators?.length ) {
            const ret = loopAST( clone, toInsert );
            // console.log( ret );
            const { outVal, outObj } = ret;
            const valStr:string = outVal.map( x => x.child ).join( '' );
            const objStr:string = outObj.map( x => x.child ).join( '' );
            outVal.forEach( ( _out ) => clone = insertValue( clone,  _out.parent, valStr ) )
            outObj.forEach( ( _out ) => clone = insertValue( clone, _out.parent, objStr ) );
        }
    } 
    return clone;
}