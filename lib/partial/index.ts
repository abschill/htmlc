import fs from 'fs';
export default class Partial {
    
    name: string;
    raw: string;
    path: string;
    parsed: string|null;
    _toInsert?: object;
    constructor(  name:string, path:string, toInsert: object ) {
        this.name = name;
        this._toInsert = toInsert;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.parsed = null;
        this.render();
    }
    
    render() {
        if( !this.parsed ) {
            if( this._toInsert ) {
                try {
                    let _copy = this.raw;
                    Object.entries( this._toInsert ).forEach( arg => {
                        _copy = _copy.replace( `<!--@render=${arg[0]}-->`, arg[1] );
                    } );
                    this.parsed = _copy;
                    return _copy;
                }
                catch( e ) {
                    throw e;
                }
            }
            else {
                this.parsed = this.raw;
                return this.raw;
            }
        }
        else {
            return this.parsed;
        }
        
    }
}