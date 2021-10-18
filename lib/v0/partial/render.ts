import iterator from "../util/iterator";
import countItr from "../util/create_itr_map";
import loopAST from '../util/loop_ast';
import renderVals from "../util/render_vals";
import insertValue from "../util/insert";
export default function render( name: string, toInsert:object, copy:string, verbose:boolean ) {
    let clone = copy;
    const num_iterables = countItr( toInsert );
    const iterators = iterator( clone );
    clone = renderVals( name, clone, toInsert, verbose );
    if( verbose ) {
        console.log( 'Num Iterables: \n' + num_iterables );
        console.log( 'Iterators: \n ' + iterators );
    } 
    
    if( Object.keys( toInsert ).length > 0 ) {
        if( iterators && ( num_iterables == iterators?.length ) ) {
            if( verbose ) {
                console.log( 'condition matched, rendering:\n' + toInsert );
            }
            const ret = loopAST( clone, toInsert );
            // console.log( ret );
            const { outVal, outObj } = ret;
            const valStr:string = outVal.map( x => x.child ).join( '' );
            const objStr:string = outObj.map( x => x.child ).join( '' );
            outVal.forEach( ( _out ) => clone = insertValue( clone,  _out.parent, valStr ) )
            outObj.forEach( ( _out ) => clone = insertValue( clone, _out.parent, objStr ) );
        }
        else {
            if( verbose ) {
                if( !iterators ) {
                    console.log( 'no iterators submitted' );
                    console.log( toInsert );
                }
                else {
                    console.warn( 'iterators dont match' );
                }
            }
        }
    } 
    return clone;
}