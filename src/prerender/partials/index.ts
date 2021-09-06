import fs from 'fs';
import { PARTIAL_TYPE } from '../types/partials';
export default class Partial {
    
    path: string
    type: PARTIAL_TYPE
    content: string

    constructor( path: string, type:PARTIAL_TYPE ){
        this.path = path;
        this.type = type;
        this.content = fs.readFileSync( this.path ).toString( 'utf-8' );
    }

    asBuffer(){
        return fs.readFileSync( this.path );
    }

    asObject(){
        //console.log( this.type );
        return {
            type: this.type, 
            html: this.content
        };
    }
}