import Partial from '../partial';
import { Mode } from '../types/template';
import fs from 'fs';
import Config from '../config';
export default class Template{
    config: Config;
    name: string
    path: string
    raw: string
    constructor( config:Config, name:string, path:string) {
        // this.partials = [...new Set(partials) ];
        this.config = config;
        this.name = name;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
    }
    parse( _varList:Object[] ) {
        console.log( this.raw.indexOf( `${this.config._config._internals.delimiter}=` ) );
    }
 
    render() {
        // let out = '';
        // this.partials.forEach( part =>{
        //     out += part.content;
        // } );

        // return out;
    }

}