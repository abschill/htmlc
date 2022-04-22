import ABT from './abt';
import {
    AST_LOOP_SIGNATURE,
    AST_PARTIAL_SIGNATURE,
    AST_RENDER_SIGNATURE,
    AST_CLOSE_SCOPE,
	AST_NESTED_KEYPARSE,
	AST_EQ,
	AST_KNC,
	AST_KNO,
	AST_TNO,
	AST_TNC
} from './constants';
import {
    Token, AST_MAP
} from '../../types';

/**
* @constant EMPTY_MAP The initial reducer input for tokenize function
**/
export const EMPTY_MAP: AST_MAP = {
    keys: [],
    loops: [],
    partials: []
};

/**
 *
 * @param chunk the chunk to check for any parser symbols
 * @returns boolean to indicate there are parsable symbols
 */
export function hasSymbols (
    chunk: string
): boolean {
    return ( chunk.includes( AST_RENDER_SIGNATURE ) || chunk.includes( AST_LOOP_SIGNATURE ) || chunk.includes( AST_PARTIAL_SIGNATURE ) );
}

/**
 * @param mask the masked string
 * @param input
 * @returns
 */
export function mask (
    mask: string,
    input: object
): string {
    const resolvedKeys = parseKeys( mask );
    resolvedKeys.forEach( key => mask = mask.replace( key.token, input[key.key] ) );
    return mask;
}

/**
 * @param key the key to remove the braces from
 * @returns string of key
 */
export function unmask (
    key: string
): string {
    return key.replace( AST_TNO, '' ).replace( AST_TNC, '' );
}

/**
 *
 * @param chunk the chunk of dom to parse the keys from
 * @returns the matched tokens mapped to { token: <matched_string>, key: <unmasked_match> }
 */
export function parseKeys (
    chunk: string
) {
    return chunk.match( AST_NESTED_KEYPARSE ).map( matcher => ( { token: matcher, key: unmask( matcher )} ) );
}

/**
 *
 * @param token the matched pattern in the domstring, this gets the name and applies the input to the raw property
 * @returns tokenized string of the pattern match
 */
export function tokenizeMatch (
    token: string
): Token {
    if( token.includes( AST_LOOP_SIGNATURE ) ) {
		//handle it as a block-level token such as
		/**
		 * <!--@loop(foo){
		 * 		some content
		 * }-->
		 */
        const name = token.split( AST_KNO ).pop().split( AST_KNC ).shift();
        return {
            name,
            raw: token
        };
    }
	// handle it as an inline (non-loop) token such as <!--@partial=foo-->
    const name = token.split( AST_EQ ).pop().split( AST_CLOSE_SCOPE ).shift();
    return {
        name,
        raw: token
    };
}

/**
 *
 * @param chunk the unparsed domstring to find the symbols in
 * @returns AST_MAP an object with a list of each token type to be rendered based on arbitrary input
 */
export function tokenize (
    chunk: string
): AST_MAP {
    return ABT.reduce( ( acc, curr ) => {
        const matches = curr.asList( chunk );
        if( !matches || matches.length === 0 ) return acc;
        switch( curr.signature ) {
            case AST_PARTIAL_SIGNATURE:
                return {...acc, partials: [...acc.partials, ...matches.map( tokenizeMatch )]};
            case AST_RENDER_SIGNATURE:
                return {...acc, keys: matches.map( tokenizeMatch )};
            case AST_LOOP_SIGNATURE:
                return {...acc, loops: matches.map( tokenizeMatch )};
            default:
                return acc;
        }
    }, EMPTY_MAP );
}

export * as ABT from './abt';
export * as Constants from './constants';
export * as Util from './util';
