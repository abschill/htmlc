export default function parsable( key: string, _varList:object, _dom: string ) {
    const _match = _varList[key];
    // console.log( 'match:' );
    // console.log( _match );
    if( _match ) {
        return Object.keys( _varList[key] ).map( x => {
            // console.log( x );
            const render_val = `<!--@render=${x}-->`;
            const loop_val = `<!--@for(${x}){`;
            if( _dom.includes( render_val ) ) {
                return render_val;
            }
            if( _dom.includes( loop_val ) ) {
                return loop_val;
            }
            return false;
        } );
    }
    else {
        return [];
    }
    
}