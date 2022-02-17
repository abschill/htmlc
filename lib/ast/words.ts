/**
 * @module RESERVED_WORDS
 * @description Maps reserved keywords in syntax to callbacks for the rendering engine
 * @returns Dictionary with typed callbacks for AST
 */
import { ReservedWord, Dictionary } from '../internals';
import {
    hasLoop,
    matchLoop,
    hasPartial,
    matchPartial,
    hasKey,
    matchKey
} from '.';

export const FOR_H = ( key: string ): string => `<!--@for(${key}){`;
export const FOR_T = (): string => `}-->`;

const RESERVED_WORDS: Dictionary<ReservedWord> = [
    { 
        key: '@for',
        boolean: hasLoop,
        array: matchLoop
    },
    {
        key: '@render',
        boolean: hasKey,
        array: matchKey
    },
    {
        key: '@render-partial',
        boolean: hasPartial,
        array: matchPartial
    }
];

export default RESERVED_WORDS;