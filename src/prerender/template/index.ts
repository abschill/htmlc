import Partial from '../partials';
import { Mode } from '../types/template';
export default class Template {

    partials: Partial[]
    mode: Mode
    constructor( partials: Partial[], mode: Mode) {
        this.partials = partials;
        this.mode = mode;
    }

    asObject(){
        return {'partials':this.partials, mode: this.mode };
    }
    render(){
        let out = '';
        this.partials.forEach( part =>{
            console.log( part.asObject() );
            out += part.content;
        } );

        console.log( out );
    }

}