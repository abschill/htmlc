import Partial from '../partial';
import { Mode } from '../types/template';
import fs from 'fs';
import Config from '../config';
import replaceVar from '../util/replaceVar';
export default class Template {

    config: Config;
    name: string
    path: string
    raw: string
    parsed?: string;
    
    constructor( config:Config, name:string, path:string) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.parsed = null;
    }
    parse( _varList:Object[] ) {
        let _copy = this.raw;
        if ( _copy.indexOf( `$${this.config._config._internals.delimiter}-partial=` ) ) {
            this.config.getPartials().forEach( p => {
                const qry = `<!--$${this.config._config._internals.delimiter}-partial=${p.name}-->`;
                if( _copy.includes( qry ) ) {
                   _copy = _copy.replace( qry, p.parsed  );
          
                }
            } );
            this.parsed = replaceVar( this.config, _copy, _varList );  
            
        }

        
    }

}