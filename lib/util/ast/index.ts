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
export const matchLoop = ( target: string ) => {
    let out = [];
    const _opener = /<!--@for\(\w+\){/gi;
    const opener = target.match( _opener );
    if( opener?.length > 0 ) {
        opener.forEach( ( match, idx ) => {
            const openIdx = target.indexOf( match );
            const chopBottom = target.slice( openIdx, target.length );
            const ret = chopBottom.slice( 0, chopBottom.indexOf( '}-->' ) + 4 );
            out.push( ret );
        })
    }
    
    //const _reggie = /<!--@for\(\w+\){[\s|\w|\W|<|=|"|:|/|\.({})>]+-->/gmi;
    return out;
}
/**<!--@for\(\w+\){[\n|\r|\w|\t]*.*[\n|\r|\w|\t]*.*
 * 
 * @param {string} target the DOM to match against
 * @param {string} key the key of the iterable to match 
 * @returns {boolean} If the DOM has the render key
 */
export const hasKey = ( target: string, key: string ) => target.includes( `<!--@render=${key}-->` );
export const keyIndex = ( target: string, key: string ) => target.indexOf( `<!--@render=${key}-->` );
export const translateKeyName = ( templated_key: string ) => templated_key.split( 'render=' )[1].split( '-->' )[0];
export const replaceKey = ( target: string, key: string, value: string ) => {
    let _copy = target;
    _copy = _copy.replace( key, value );
    return _copy;
}
/**
 * 
 * @param {string} target The Partial/Template to match render key against
 * @returns {Array} matched segments from input
 */
export const matchKey = ( target: string ) => {
    const _reggie = /<!--@render=.*-->/gi;
    return target.match( _reggie );
}
/**
 * 
 * @param {string} target the DOM to match against
 * @param {string} key the key of the iterable to match 
 * @returns {boolean} If the DOM has the partial key
 */
export const hasPartial = ( target: string, key: string ) => target.includes( `<!--@render-partial=${key}-->` );
export const partialIndex = ( target: string, key: string ) => target.indexOf( `<!--@render-partial=${key}-->` );
export const replacePartial = ( target: string, key: string, value: string ) => {
    let _copy = target;
    _copy = _copy.replace( key, value );
    return _copy;
}
/**
 * 
 * @param {string} target The Partial/Template to match partial key against
 * @returns {Array} matched segments from input
 */
export const matchPartial = ( target: string ) => {
    const _reggie = /<!--@render-partial=.*-->/gi;
    return target.match( _reggie );
}
