import Partial from '../partial';
import { Mode } from '../types/template';
import fs from 'fs';
export default class Template{

    name: string
    path: string
    raw: string
    constructor( name:string, path:string) {
        // this.partials = [...new Set(partials) ];
        this.name = name;
        this.path = path;
        this.raw = fs.readFileSync( path ).toString( 'utf-8' ); 
    }

 
    render() {
        // let out = '';
        // this.partials.forEach( part =>{
        //     out += part.content;
        // } );

        // return out;
    }

}