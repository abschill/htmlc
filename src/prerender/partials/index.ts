import fs from 'fs';
import { PARTIAL_TYPE } from '../types/partials';
export default class Partial {
    
    path: string
    type: PARTIAL_TYPE
    content: string
    varList?: Object[]

    constructor( path: string, type:PARTIAL_TYPE, varList?: Object[] ){
        this.path = path;
        this.type = type;
        this.varList = varList;
        this.content = fs.readFileSync( this.path ).toString( 'utf-8' );
    }

    parseVars(){
        console.log( this.varList );
    }

    asBuffer(){
        return fs.readFileSync( this.path );
    }

    asObject(){
        return {
            type: this.type, 
            html: this.content
        };
    }
}