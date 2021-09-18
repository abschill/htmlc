import fs from 'fs';
import Loader  from '../loader';
interface partialObject {
    name: string,
    path: string,
    args: Object[],
    raw: string,
    parsed: string | null
}
export default class Partial {
    
    config: Loader;
    name: string;
    path: string;
    raw: string;
    parsed: string|null;
    toInsert?: Object[];
    isParsed: boolean;

    constructor( config: Loader, name:string, path:string, toInsert?: Object[] ) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.toInsert = toInsert;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.isParsed = false;
        this.parsed = null;
    }

    parse( _varList:Object ) {
        
        if( !this.isParsed ) {
            let _copy = this.raw;
            if( this.raw.includes( `@render=` ) && _varList ) {
                Object.entries( _varList ).forEach( vr => {
                    const _replace = `<!--@render=${vr[0]}-->`;
                    if( _copy.indexOf( _replace ) !== -1 ) {
                        _copy = _copy.replace( _replace , vr[1])
                    }
                     
                } );
                this.parsed = _copy;
                this.isParsed = true;
                return this;
            }
            else {
                console.log( 'no var list' );
            }
        }
        else {
            return this.parsed;
        }
        
    }

    asObject():partialObject {
        return {
            name: this.name,
            path: this.path,
            args : this.toInsert,
            raw: this.raw,
            parsed: this.parsed
        };
    }
}