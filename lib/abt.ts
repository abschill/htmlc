import { Dictionary, ReservedWord } from "./internals";
import { hasLoop, matchLoop, hasKey, matchKey, hasPartial, matchPartial } from './ast';

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