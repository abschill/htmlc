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

/**
 * @module RESERVED_WORDS
 * @returns Dictionary with typed callbacks for AST
 */
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