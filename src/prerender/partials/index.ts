import fs from 'fs';
export enum PARTIAL_TYPE {
    '<head>' = 0,
    '<header>' = 1,
    '<main>' = 2,
    '<footer>' = 3,
    '<script>' = 5,
}
export default class Partial {
    
    path: string
    type: string
    content: string

    constructor( path: string, typeName:PARTIAL_TYPE ){
        this.path = path;
        this.type = PARTIAL_TYPE[typeName];
        this.content = fs.readFileSync( this.path ).toString( 'utf-8' );
    }
    asBuffer(){
        return fs.readFileSync( this.path );
    }
    asObject(){
        console.log( this.type );
        return {
            type: this.type, 
            html: this.content
        };
    }
}