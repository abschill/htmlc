/**
 * 
 * @module ABT
 * Abstract binding tree for template directives with typed callbacks
 */
import { 
    ABT_RENDER_SIGNATURE, 
    ABT_PARTIAL_SIGNATURE,
    ABT_LOOP_SIGNATURE,
    ABT_PGROUP_SIGNATURE,
    ABT_RENDER_REGGIE,
    ABT_PARTIAL_REGGIE,
    ABT_LOOP_OPEN_REGGIE,
    ABT_PGROUP_REGGIE
} from './constants';

const hasLoop = (
    chunk: string
): boolean => chunk.includes( ABT_LOOP_SIGNATURE );

const hasPartial = (
    chunk: string
) => chunk.includes( ABT_PARTIAL_SIGNATURE );

const hasPGroup = (
    chunk: string
) => chunk.includes( ABT_PGROUP_SIGNATURE );

const hasKey = (
    chunk: string
): boolean => chunk.includes( ABT_RENDER_SIGNATURE );

function matchKeys (
    chunk: string
): string[] {
    return chunk.match( ABT_RENDER_REGGIE );
}

function matchPartial (
    chunk: string
): string[] {
    return chunk.match( ABT_PARTIAL_REGGIE );
}

function matchPGroup (
    chunk: string
): string[] {
    return chunk.match( ABT_PGROUP_REGGIE );
}

function matchLoops (
    chunk: string
): string[] {
    const out: Array<string> = [];
    const _opener = ABT_LOOP_OPEN_REGGIE;
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
        signature: '@partials',
        exists: hasPGroup,
        asList: matchPGroup
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