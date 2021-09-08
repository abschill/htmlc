import Partial from '../partial';
import { Mode } from '../types/template';
export default class Template{

    partials: Partial[]
    mode: Mode
    constructor( partials: Partial[], mode: Mode) {
        this.partials = [...new Set(partials) ];
        this.mode = mode;
    }

    asObject() {
        return {'partials':this.partials, mode: this.mode };
    }
    render() {
        let out = '';
        this.partials.forEach( part =>{
            out += part.content;
        } );

        return out;
    }

}