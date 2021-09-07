//
import Partial from "../partial";
import Template from '../template';
import { getType, renderVars } from './util';
export default class Parser {

    segment: Partial|Template
    type: string
    varList?:Object[]
    _parsedSegment?: string

    constructor( segment: Partial|Template ){
        this.segment = segment;
        this.type = getType(this.segment);
        this._parsedSegment = null;
    }

    run() {
        if( this.type ===  'template' ) {
            //@ts-ignore
            this.segment.partials.forEach( part => {
                if( part.varList ){
                    const final = renderVars( part.content, part.varList );
                    part.content = final;
                }
            });
        }
        else {
            console.log( this.type );
            
        }
        
    }
}