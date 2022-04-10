import { ParsableToken } from '../../../types';

function hasLoop(
    chunk: string
): boolean {
    return chunk.includes( '@loop' );
}

function hasPartial(
    chunk: string
): boolean {
    return chunk.includes( '@partial' );
}

function hasKey(
    chunk: string
): boolean {
    return chunk.includes( '@render' );
}

function matchKeys(
    chunk: string
): string[] {
    return chunk.match( /<!--@render=\w+.?[\w|\d]+-->/gi );
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
