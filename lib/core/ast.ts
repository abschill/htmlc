/**
 *
 * @module ast
 * @description The callbacks for the Reserved Words
 *
 */
export const FOR_H = ( key: string ): string => `<!--@for(${key}){`;
export const FOR_T = (): string => `}-->`;

/**
 *
 * @param {string} target the DOM to match against
 * @param {string} k the key of the iterable to match
 * @returns {boolean} If the DOM String has the render loop
 */
export const hasLoop = ( target: string, k: string ):
boolean => target.includes( `<!--@for(${k}){` );

export const loopIndex = ( target: string, k: string ) => ( { 'head':target.indexOf( `<!--@for(${k}){` ), 'tail': target.indexOf( '}-->') } );
/**
 *
 * @param {string} target The Partial/Template to match render loop against
 * @returns {Array} matched segments from input
 */
export const matchLoop = ( target: string ):
Array<string> => {
    const out: Array<string> = [];
    const _opener = /<!--@for\(\w+\){/gi;
    const opener = target.match( _opener );
    if( opener && opener?.length > 0 ) {
        opener.forEach( match => {
            const openIdx = target?.indexOf( match );
            const chopBottom = target?.slice( openIdx, target.length );
            const ret = chopBottom?.slice( 0, chopBottom.indexOf( '}-->' ) + 4 );
            if ( ret ) out.push( ret );
        } );
    }
    return out;
}

/**
 *
 * @param {string} target the DOM to match against
 * @param {string} k the key of the iterable to match
 * @returns {boolean} If the DOM has the render key
 */
export const hasKey = ( target: string, k: string ):
boolean => target.includes( `<!--@render=${k}-->` );

export const keyIndex = ( target: string, k: string ):
number => target.indexOf( `<!--@render=${k}-->` );

export const translateKeyName = ( t_k: string ):
string => t_k.split( 'render=' )[1].split( '-->' )[0];

export const replaceKey = ( target: string, k: string, v: string ):
string => target.replace( k, v );

/**
 *
 * @param {string} target The Partial/Template to match render key against
 * @returns {RegExpMatchArray} matched segments from input
 */
export const matchKey = ( target: string ):
RegExpMatchArray | null => target.match( /<!--@render=[\w|\d]+-->/gi );

/**
 *
 * @param {string} target the DOM to match against
 * @param {string} k the key of the iterable to match
 * @returns {boolean} If the DOM has the partial key
 */
export const hasPartial = ( target: string, k: string ):
boolean => target.includes( `<!--@render-partial=${k}-->` );

export const partialIndex = ( target: string, k: string ):
number => target.indexOf( `<!--@render-partial=${k}-->` );

export const replacePartial = ( target: string, k: string, value: string ):
string => target.replace( k, value );
/**
 *
 * @param {string} target The Partial/Template to match partial key against
 * @returns {Array} matched segments from input
 */
export const matchPartial = ( target: string ):
RegExpMatchArray | null => target.match( /<!--@render-partial=[\w|\d]+-->/gi );
