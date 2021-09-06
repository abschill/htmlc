//
import Partial from "../partials";
import Template from '../template';
export default class Parser {
    segment: Partial|Template
    constructor( segment: Partial|Template ){
        this.segment = segment;
    }

    setVars() {
        console.log( this.segment.asObject() );
    }
    _meta() {
        if(this.segment instanceof Partial){
            return 'partial';
        }
        else {
            return 'template';
        }
    }
}