import fs from 'fs';
import path from 'path';
import { PARTIAL_TYPE } from '../types/partials';
export default class Partial {
    
    path: string
    type: PARTIAL_TYPE
    content: string
    varList?: Object[]

    constructor( _path: string, type:PARTIAL_TYPE, varList?: Object[] ){
        this.path = _path;
        this.type = type;
        this.varList = varList;
        this.content = fs.readFileSync( path.resolve( process.cwd(), this.path  ) ).toString( 'utf-8' );
    }

    parseVars(){
        //console.log( this.varList );
        const _vr = `<--<${this.varList[0]}>-->`;
        console.log( _vr );
    }

    asBuffer(){
        return fs.readFileSync( path.resolve( process.cwd(), this.path  ) );
    }

    asObject(){
        return {
            type: this.type, 
            html: this.content
        };
    }
}