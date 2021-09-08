import fs from 'fs';
import path from 'path';
export default class Partial {
    
    name: string
    path: string
    raw: string
    varList?: Object[]

    constructor( name:string, path:string, varList?: Object[] ){
        this.name = name;
        this.path= path;
        this.varList = varList;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
    }


    asObject(){
        return {
          //  type: this.type, 
            name: this.name,
            path: this.path,
            args : this.varList,
            raw: this.raw
        };
    }
}