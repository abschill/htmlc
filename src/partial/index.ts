import fs from 'fs';
import path from 'path';
import Parser from '../parser';
import Config from '../config';
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
            const out = _varList.map( item => Object.entries( item ) );
            const _vrs:Array<string>[] = out.flat();
            _vrs.forEach( vr => {
                const _replace = `<!--$${this.config._config._internals.delimiter}=${vr[0]}-->`;
                _copy = _copy.replace( _replace , vr[1])
            });
            this.parsed = _copy;
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