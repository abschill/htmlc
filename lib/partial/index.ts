import fs from 'fs';
import render from './render';
import Loader from '../loader';
export default class Partial {
    
    name: string;
    raw: string;
    path: string;
    parsed?: string;
    _toInsert?: object;
    config: Loader;
    constructor(  name:string, path:string, toInsert: object, config: Loader ) {
        this.name = name;
        this._toInsert = toInsert;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
        this.parsed = this.render();
        this.config = config;
    }
    render() {
        if( this._toInsert ) {
            try {
                let copy = this.raw;
                this.parsed = render( this._toInsert, copy );
                return this.parsed;
            }
            catch( e ) {
                throw e;
            }
        }
        else {
            return this.raw;
        }
    }
}