import fs from 'fs';
import path from 'path';
import Config from '../config';
import replaceVar from '../util/replaceVar';
export default class Partial {
    
    config: Config
    name: string
    path: string
    raw: string
    parsed: string|null
    varList?: Object[]
    isParsed: boolean

    constructor( config: Config, name:string, path:string, varList?: Object[] ) {
        this.config = config;
        this.name = name;
        this.path= path;
        this.varList = varList;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.isParsed = false;
        this.parsed = null;

    }

    parse( _varList:Object[] ) {
        if( this.raw.includes(`${this.config._config._internals.delimiter}=` ) ){
            let _copy = this.raw;
            this.parsed = replaceVar( this.config, _copy, _varList );
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
            args : this.varList,
            raw: this.raw,
            parsed: this.parsed
        };
    }
}