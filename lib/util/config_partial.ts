import Loader from '../loader';
export default function configPartials( conf: Loader, cp: string ) {
    let _copy = cp;
    conf.partials.forEach( p => {
        _copy = _copy.replace( `<!--@render-partial=${p.name}-->`, p.parsed );
    } );
    return _copy;
}