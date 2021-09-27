import fs from 'fs';
import Loader from '../loader';
export default class Template {

    config: Loader;
    name: string;
    path: string;
    raw: string;
    preload?: string;
    parsed?: string;
    
    constructor( config:Loader, name:string, path:string ) {
        this.config = config; 
        this.name = name;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.parsed = null;
        this.preload = null;
        this._preload();
    }
    _preload() {
        let _copy = this.raw;
        this.config.partials.forEach( p => {
            if( p.isParsed ) {
                _copy = p.parsed;
            }
            else {
                _copy = _copy.replace( `<!--@render-partial=${p.name}-->`, p.parse() );
            }
        } );
        this.preload = _copy;
        return _copy;
    }

    _hasPartial( lbl ) {
        const qry = `<!--@render-partial=${lbl}-->`;
        const _existsRaw = this.raw.indexOf( qry ) !== -1;
        const _existsPre = this.preload.indexOf( qry ) !== -1;
        return { _existsRaw, _existsPre };
    }
    _getIterator ( txt ) {
        const _reggie = /<!--@for\(\w+\){([\s|\w|<|=|"|:|/|\.({})>]+)-->/gi;
        return txt.match( _reggie );
    }

    render( _varList:Object ) {
        let _copy = this.parsed ?? this.raw;
        this.config.partials.forEach( p => {
            _copy = _copy.replace( `<!--@render-partial=${p.name}-->`, p.parsed );
        } );
        
        if( _varList ) {
            const iterable_map = Object.values( _varList ).map( Array.isArray );
            const _iterable_map = iterable_map.filter( _ => _ === true );
            const num_iterables = _iterable_map?.length;
            const iterators = this._getIterator( _copy );
            if( num_iterables === iterators?.length ) {
                //input matches declarations
                const _dom = _copy;
                const _parser = Object.keys( _varList ).map( x => {
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
                function iterateObj( segment, entries ) {
                    let shallow = segment;
                    Object.entries( entries ).map( ent => {
                        shallow = shallow.replace( `{${ent[0]}}`, ent[1] );
                    } );
                    return shallow;
                }
                let outVal = [];
                let outObj = [];
                _parser.forEach( ( p, idx ) => {
                    const _iterator = iterators[idx - 1];
                    const match = Object.entries( _varList )[ idx ];
                    if( p && p.includes( 'render' ) ) {
                        _copy = _copy.replace( p, match[1] );
                    }
                    else{ 
                        if( p && p.includes( 'for' ) ) {
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
                    }
                } );
                const elArr = outVal.map( x => x.child ).join( '' );
                const valArr = outObj.map( x => x.child ).join( '' );
                
                outVal.forEach( ( _out ) => _copy = _copy.replace( _out.parent, elArr ) );
                outObj.forEach( ( _out ) => _copy = _copy.replace( _out.parent, valArr ) );
            }
             this.parsed = _copy;
             return this.parsed;
        }
        else {
            return this.preload
        }

    }
}