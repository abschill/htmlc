/**
 *
 * @module ABT
 * Abstract binding tree for template directives with typed callbacks
 */
import {
    AST_CLOSE_SCOPE,
    AST_RENDER_SIGNATURE,
    AST_PARTIAL_SIGNATURE,
    AST_LOOP_SIGNATURE,
    // ABT_PGROUP_SIGNATURE,
    AST_RENDER_REGGIE,
    AST_PARTIAL_REGGIE,
    AST_LOOP_OPEN_REGGIE,
    // ABT_PGROUP_REGGIE
} from './constants';

const hasLoop = (
    chunk: string
): boolean => chunk.includes( AST_LOOP_SIGNATURE );

const hasPartial = (
    chunk: string
) => chunk.includes( AST_PARTIAL_SIGNATURE );

// const hasPGroup = (
//     chunk: string
// ) => chunk.includes( ABT_PGROUP_SIGNATURE );

const hasKey = (
    chunk: string
): boolean => chunk.includes( AST_RENDER_SIGNATURE );

function matchKeys (
    chunk: string
): string[] {
    return chunk.match( AST_RENDER_REGGIE );
}

function matchPartial (
    chunk: string
): string[] {
    return chunk.match( AST_PARTIAL_REGGIE );
}

// function matchPGroup (
//     chunk: string
// ): string[] {
//     return chunk.match( ABT_PGROUP_REGGIE );
// }

function matchLoops (
    chunk: string
): string[] {
    const out: Array<string> = [];
    const _opener = AST_LOOP_OPEN_REGGIE;
    const opener = chunk.match( _opener );
    if( opener && opener?.length > 0 ) {
        opener.forEach( ( match: string ) => {
            const chopBottom = chunk.slice( chunk.indexOf( match ), chunk.length );
            if( chopBottom ) {
                const ret = chopBottom?.slice( 0, chopBottom.indexOf( AST_CLOSE_SCOPE ) + 4 );
                if ( ret ) out.push( ret );
            }
        } );
    }
    return out;
}

const ABT: ParsableToken[] = [
    {
        signature: AST_PARTIAL_SIGNATURE,
        exists: hasPartial,
        asList: matchPartial
    },
    // {
    //     signature: '@partials',
    //     exists: hasPGroup,
    //     asList: matchPGroup
    // },
    {
        signature: AST_RENDER_SIGNATURE,
        exists: hasKey,
        asList: matchKeys
    },
    {
        signature: AST_LOOP_SIGNATURE,
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
