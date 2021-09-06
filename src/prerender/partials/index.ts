import fs from 'fs';
export enum PARTIAL_TYPE {
    header = 0,
    heading = 1,
    content = 2,
    footer = 4,
    scripts = 5,
    lazy = 6
}
export default class Partial {
    
    path: string
    type: PARTIAL_TYPE
    
    constructor( path: string, type:PARTIAL_TYPE ){
        this.path = path;
        this.type = type;
    }
    asObject(){
        return {
            type: this.type, 
            html: fs.readFileSync( this.path ).toString( 'utf-8' )
        };
    }
}