import fs from 'fs';
import Config from '../config';
import parse from '../util/parse';
export default class Template {

    config: Config;
    name: string
    path: string
    raw: string
    parsed?: string;
    
    constructor( config:Config, name:string, path:string ) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.parsed = null;
    }
    parse( _varList:Object[] ) {
        let _copy = this.raw;
        if ( _copy.indexOf( `@render-partial=` ) ) {
            this.config.getPartials().forEach( p => {
                const qry = `<!--@render-partial=${p.name}-->`;
                if( _copy.includes( qry ) ) {
                   _copy = _copy.replace( qry, p.parsed  );
          
                }
            } );
            this.parsed = parse( _copy, _varList );  
            
        }

        
    }

}