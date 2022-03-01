import { compiler } from "./internals";
import {
	hasLoop,
	matchLoop,
	hasKey,
	matchKey,
	hasPartial,
	matchPartial
} from './ast';

export const KEY_MAP = [ '@for', '@render', '@render-partial' ];

const RESERVED_WORDS:
compiler.Dictionary<compiler.ReservedWord> = [
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
