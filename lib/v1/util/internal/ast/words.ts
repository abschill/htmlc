import {
    hasLoop,
    matchLoop,
    loopIndex,
    hasPartial,
    matchPartial,
    hasKey,
    matchKey,
    translateKeyName
} from '.';
/**
 * @module RESERVED_WORDS
 * @returns Dictionary with typed callbacks for AST
 */
const RESERVED_WORDS = {
    '@for': { 
        'boolean': hasLoop,
        'array': matchLoop,
        'head|tail': loopIndex
    },
    '@render': {
        'boolean': hasKey,
        'array': matchKey,
        'translate': translateKeyName
    },
    '@render-partial': {
        'boolean': hasPartial,
        'array': matchPartial
    }
}

export default RESERVED_WORDS;