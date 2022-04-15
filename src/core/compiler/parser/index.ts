import ABT from './abt';

import { 
    ABT_LOOP_SIGNATURE,
    ABT_PARTIAL_SIGNATURE,
    ABT_RENDER_SIGNATURE
} from './constants';
import {
    Token, AST_MAP
} from '../../../types';

export const EMPTY_MAP: AST_MAP = {
    keys: [],
    loops: [],
    partials: []
};

export function hasSymbols (
    chunk: string
): boolean {
    return ( chunk.includes( ABT_RENDER_SIGNATURE ) 
            || chunk.includes( ABT_LOOP_SIGNATURE ) 
            || chunk.includes( ABT_PARTIAL_SIGNATURE )  );
}

export function mask (
    mask: string,
    input: object
): string {
    const resolvedKeys = parseKeys( mask );
    resolvedKeys.forEach( key => mask = mask.replace( key.token, input[key.key] ) );
    return mask;
}

export function unmaskKey (
    key: string
): string {
    return key.replace( '{', '' ).replace( '}', '' );
}

export function parseKeys (
    chunk: string
) {
    const reggie = /{\w+.?[\w|\d]*}/gi;
    return chunk.match( reggie ).map( matcher => ( { token: matcher, key: unmaskKey( matcher )} ) );
}

export function tokenizeMatch (
    token: string
): Token {
    if( token.includes( 'loop' ) ) {
        const name = token.split( '(' ).pop().split( ')' ).shift();
        return {
            name,
            raw: token
        };
    }
    const name = token.split( '=' ).pop().split( '-->' ).shift();
    return {
        name,
        raw: token
    };
}

export function tokenize (
    input: string
): AST_MAP {
    return ABT.reduce( ( acc, curr ) => {
        const matches = curr.asList( input );
        if( !matches || matches.length === 0 ) {
            return acc;
        }
        switch( curr.signature ) {
            case ABT_PARTIAL_SIGNATURE:
                return {...acc, partials: [...acc.partials, ...matches.map( tokenizeMatch )]};
            case ABT_RENDER_SIGNATURE:
                return {...acc, keys: matches.map( tokenizeMatch )};
            case ABT_LOOP_SIGNATURE:
                return {...acc, loops: matches.map( tokenizeMatch )};
            default:
                return acc;
        }
    }, EMPTY_MAP );
}

export * as ABT from './abt';
export * as Constants from './constants';
export * as Util from './util';