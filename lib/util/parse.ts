export default function replaceVar( raw: string, _varList: Object[] ) {
    let _copy = raw;
    const out = _varList.map( item => Object.entries( item ) );
    const _vrs:Array<string>[] = out.flat();
    _vrs.forEach( vr => {
        const _replace = `<!--@render=${vr[0]}-->`;
        _copy = _copy.replace( _replace , vr[1])
    } );
    return _copy;
}