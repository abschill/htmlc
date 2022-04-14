/**
 * 
 * @module ABT
 * Abstract binding tree for template directives with typed callbacks
 */
import { 
    ABT_RENDER_SIGNATURE, 
    ABT_PARTIAL_SIGNATURE,
    ABT_LOOP_SIGNATURE 
} from './enums';

const hasLoop = (
    chunk: string
): boolean => chunk.includes( ABT_LOOP_SIGNATURE  );

const hasPartial = (
    chunk: string
) => chunk.includes( ABT_PARTIAL_SIGNATURE );

const hasKey = (
    chunk: string
): boolean => chunk.includes( ABT_RENDER_SIGNATURE );

function matchKeys(
    chunk: string
): string[] {
    return chunk.match( /<!--@render=\w+.?[\w|\d|.]+-->/gi );
}

function matchPartial(
    chunk: string
): string[] {
    return chunk.match( /<!--@partial=\w+[\w|\d|/\\]*-->/gi );
}

function matchLoops(
    chunk: string
): string[] {
    const out: Array<string> = [];
    const _opener = /<!--@loop\(\w+\){/gi;
    const opener = chunk.match( _opener );
    if( opener && opener?.length > 0 ) {
        opener.forEach( ( match: string ) => {
            const chopBottom = chunk.slice( chunk.indexOf( match ), chunk.length );
            if( chopBottom ) {
                const ret = chopBottom?.slice( 0, chopBottom.indexOf( '}-->' ) + 4 );
                if ( ret ) out.push( ret );
            }
        } );
    }
    return out;
}

const ABT: ParsableToken[] = [
    {
        signature: '@partial',
        exists: hasPartial,
        asList: matchPartial
    },
    {
        signature: '@render',
        exists: hasKey,
        asList: matchKeys
    },
    {
        signature: '@loop',
        exists: hasLoop,
        asList: matchLoops
    },
];

export default ABT;
export type ParsableToken = {
    signature: string;
    exists: ( chunk: string ) => boolean;
    asList: ( chunk: string ) => string[];
}