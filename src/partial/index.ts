import fs from 'fs';
import path from 'path';
import { PARTIAL_TYPE } from '../types/partials';
export default class Partial {
    
   // type: PARTIAL_TYPE
    path: string
    raw: string
    varList?: Object[]

    constructor( path:string, varList?: Object[] ){
      //  this.type = type;
        this.path= path;
        this.varList = varList;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
    }


    asObject(){
        return {
          //  type: this.type, 
            args : this.varList,
            raw: this.raw
        };
    }
}