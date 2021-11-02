/**
 * @module RESERVED_WORDS
 * @description Maps reserved keywords in syntax to callbacks for the rendering engine
 * @returns Dictionary with typed callbacks for AST
 */
import {
    hasLoop,
    matchLoop,
    hasPartial,
    matchPartial,
    hasKey,
    matchKey
} from '.';

export const FOR_H = ( key ) => `<!--@for(${key}){`;
export const FOR_T = () => `}-->`;

const RESERVED_WORDS = {
    '@for': { 
        'boolean': hasLoop,
        'array': matchLoop
    },
    '@render': {
        'boolean': hasKey,
        'array': matchKey
    },
    '@render-partial': {
        'boolean': hasPartial,
        'array': matchPartial
    }
}

export default RESERVED_WORDS;