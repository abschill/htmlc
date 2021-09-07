//
import Partial from "../partials";
import Template from '../template';
import { getType, renderVars } from './util';
export default class Parser {

    segment: Partial|Template
    type: string

    constructor( segment: Partial|Template ){
        this.segment = segment;
        this.type = getType(this.segment);
    }

    setVars() {
        if( this.type ===  'template' ) {
            //@ts-ignore
            this.segment.partials.forEach( part => {
                if( part.varList ){
                    const final = renderVars( part.content, part.varList );
                    console.log( final );
                }
                else {

                }
                
            });
        }
        else {
            console.log( this.segment );
        }
        
    }
}