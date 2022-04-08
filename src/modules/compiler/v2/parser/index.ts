import ABT from './abt';
import {
    Token, AST_MAP
} from '../../../../types';

export function tokenizeMatch(
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

export function tokenize(
    input: string
): AST_MAP {
    return ABT.reduce( ( acc, curr ) => {
        const matches = curr.asList( input );
        if( !matches || matches.length === 0 ) {
            return acc;
        }
        switch( curr.signature ) {
            case '@partial':
                return {...acc, todo_partials: matches.map( tokenizeMatch )};
            case '@render':
                return {...acc, todo_keys: matches.map( tokenizeMatch )};
            case '@loop':
                return {...acc, todo_loops: matches.map( tokenizeMatch )};
            default:
                return acc;
        }
    }, { todo_loops: [], todo_keys: [], todo_partials: [] } );
}
