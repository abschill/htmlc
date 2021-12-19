/**
 * 
 * @module ast
 * @description The callbacks for the Reserved Words
 * 
 */
/**
 * 
 * @param {string} target the DOM to match against
 * @param {string} key the key of the iterable to match 
 * @returns {boolean} If the DOM has the render loop
 */
export const hasLoop = ( target: string, arr: string ) => target.includes( `<!--@for(${arr}){` );
export const loopIndex = ( target: string, arr: string ) => ( { 'head':target.indexOf( `<!--@for(${arr}){` ), 'tail': target.indexOf( '}-->') } );
/**
 * 
 * @param {string} target The Partial/Template to match render loop against
 * @returns {Array} matched segments from input
 */
export const matchLoop = ( target: string ): 
string[] => {
    let out = [];
    const _opener = /<!--@for\(\w+\){/gi;
    const opener = target.match( _opener );
    if( opener?.length > 0 ) {
        opener.forEach( match => {
            const openIdx = target.indexOf( match );
            const chopBottom = target.slice( openIdx, target.length );
            const ret = chopBottom.slice( 0, chopBottom.indexOf( '}-->' ) + 4 );
            out.push( ret );
        })
    }
    return out;
}
/**<!--@for\(\w+\){[\n|\r|\w|\t]*.*[\n|\r|\w|\t]*.*
 * 
 * @param {string} target the DOM to match against
 * @param {string} key the key of the iterable to match 
 * @returns {boolean} If the DOM has the render key
 */
export const hasKey = ( target: string, key: string ): 
boolean => target.includes( `<!--@render=${key}-->` );

export const keyIndex = ( target: string, key: string ): 
number => target.indexOf( `<!--@render=${key}-->` );

export const translateKeyName = ( templated_key: string ): 
string => templated_key.split( 'render=' )[1].split( '-->' )[0];

export const replaceKey = ( target: string, key: string, value: string ): 
string => target.replace( key, value );

/**
 * 
 * @param {string} target The Partial/Template to match render key against
 * @returns {RegExpMatchArray} matched segments from input
 */
export const matchKey = ( target: string ): 
RegExpMatchArray => target.match( /<!--@render=[\w|\d]+-->/gi );
/**
 * 
 * @param {string} target the DOM to match against
 * @param {string} key the key of the iterable to match 
 * @returns {boolean} If the DOM has the partial key
 */
export const hasPartial = ( target: string, key: string ): 
boolean => target.includes( `<!--@render-partial=${key}-->` );

export const partialIndex = ( target: string, key: string ): 
number => target.indexOf( `<!--@render-partial=${key}-->` );

export const replacePartial = ( target: string, key: string, value: string ): 
string => target.replace( key, value );
/**
 * 
 * @param {string} target The Partial/Template to match partial key against
 * @returns {Array} matched segments from input
 */
export const matchPartial = ( target: string ): 
RegExpMatchArray => target.match( /<!--@render-partial=[\w|\d]+-->/gi );
