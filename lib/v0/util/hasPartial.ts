export default function hasPartial( _target: string) {
    if( _target.includes( '<!--@render-partial' ) ) {
        return true;
    }
    else {
        return false;
    }
}