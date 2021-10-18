import Loader from '../loader';
import hasPartial from './hasPartial';
export default function configPartials( conf: Loader, cp: string ) {
    let _copy = cp;
    if( conf.verbose ) {
        console.log( 'Config Partials in: \n' );
        console.log( conf );
        console.log( 'Pre-Render Value: ' );
        console.log( cp );
    }
    conf.partials.forEach( p => {
        _copy = _copy.replace( `<!--@render-partial=${p.name}-->`, p.parsed );
    } );
    return _copy;
}