import fs from 'fs';
import Controller  from '../config';
import replaceVar from '../util/parse';
export default class Partial {
    
    config: Controller
    name: string
    path: string
    raw: string
    parsed: string|null
    toInsert?: Object[]
    isParsed: boolean

    constructor( config: Controller, name:string, path:string, toInsert?: Object[] ) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.toInsert = toInsert;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.isParsed = false;
        this.parsed = null;

    }

    parse( _varList:Object[] ) {
        if( this.raw.includes(`@render=` ) ) {
            let _copy = this.raw;
            this.parsed = replaceVar( _copy, _varList );
            this.isParsed = true;
        }
        else {
            return;
        }
        
    }

    asObject() {
        return {
          //  type: this.type, 
            name: this.name,
            path: this.path,
            args : this.toInsert,
            raw: this.raw,
            parsed: this.parsed
        };
    }
}