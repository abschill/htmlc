import fs from 'fs';
import Loader  from '../loader';
import partialObject from '../types/partial';
export default class Partial {
    
    name: string;
    raw: string;
    parsed: string|null;
    _toInsert?: Object;
    isParsed: boolean;

    constructor(  name:string, path:string, toInsert: Object ) {
        this.name = name;
        this._toInsert = toInsert;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.isParsed = false;
        this.parsed = null;
        this.parse();
    }
    
    parse(  ) {
        if( !this.isParsed ) {
            if( this._toInsert ) {
                try{
                    let _copy = this.raw;
                    Object.entries( this._toInsert ).forEach( arg => {
                        _copy = _copy.replace( `<!--@render=${arg[0]}-->`, arg[1] );
            
                    } );
                    this.isParsed = true;
                    this.parsed = _copy;
                    return _copy;
                }
                catch( e ) {
                    throw e;
                }
            }
            else {
                this.parsed = this.raw;
                this.isParsed = true;
                return this.raw;
            }
            
           
        }
        else {
            return this.parsed;
        }
        
    }
}