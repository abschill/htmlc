import fs from 'fs';
import Controller from '../config';

export default class Template {

    config: Controller;
    name: string;
    path: string;
    raw: string;
    preload?: string;
    parsed?: string;
    
    constructor( config:Controller, name:string, path:string ) {
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
            const qry = `<!--@render-partial=${p.name}-->`;
            if( _copy.includes( qry ) ) {
                _copy = _copy.replace( qry, p.raw  );
            }
            else {
                console.log( 'no match' );
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

    render( _varList:Object[] ) {
        let _copy = this._preload();
        Object.entries( this.config._partialInput ).forEach( i => _copy = _copy.replace( `<!--@render=${i[0]}-->`, i[1] ));
        if( _varList ) {
            _varList.forEach( _ => {
                const _e = Object.entries( _ );
                const e = _e.flat();
                //@ts-ignore
                 _copy = _copy.replace( `<!--@render=${e[0]}-->`, e[1]);
            } );
            this.parsed = _copy;
             return this.parsed;
        }
        else {
            return this.preload
        }

    }
}