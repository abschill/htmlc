import ABT from './abt';
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
    return ( chunk.includes( '@render' ) || chunk.includes( '@loop' ) || chunk.includes( '@partial' ) || chunk.includes( '@pgroup' ) );
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
            case '@partial':
                return {...acc, partials: matches.map( tokenizeMatch )};
            case '@render':
                return {...acc, keys: matches.map( tokenizeMatch )};
            case '@loop':
                return {...acc, loops: matches.map( tokenizeMatch )};
            default:
                return acc;
        }
    }, EMPTY_MAP );
}

export * as ABT from './abt';