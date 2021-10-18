import fs from 'fs';
import Loader from '../loader';
import render from './render';
export default class Template {
    config: Loader;
    name: string;
    path: string;
    raw: string;
    parsed?: string;
    constructor( config:Loader, name:string, path:string ) {
        this.config = config; 
        this.name = name;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.parsed = null;
    }
    render( _varList:Object ) {
        let _copy:string = this.raw;
        this.parsed = render( this.name, _varList, _copy, this.config );
        return this.parsed;
    }
}