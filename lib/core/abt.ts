import { compiler } from "./internals";
import { Parser } from './ast';

export const KEY_MAP = [ '@for', '@render', '@partial' ];

const RESERVED_WORDS:
compiler.Dictionary<compiler.ReservedWord> = [
    {
        key: Parser.__loopKey__,
        boolean: Parser.hasLoop,
        array: Parser.matchLoops
    },
    {
        key: Parser.__renderKey__,
        boolean: Parser.hasKey,
        array: Parser.matchKeys
    },
    {
        key: Parser.__partialKey__,
        boolean: Parser.hasPartial,
        array: Parser.matchPartials
    }
];

export default RESERVED_WORDS;
