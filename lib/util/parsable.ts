export default function parsable( _varList:object, _dom: string ) {
    return Object.keys( _varList ).map( x => {
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