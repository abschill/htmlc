//
import Partial from "../partials";
import Template from '../template';
export default class Parser {
    segment: Partial|Template
    constructor( segment: Partial|Template ){
        console.log( segment.asObject() );
    }
}