import { Dictionary, ReservedWord } from './internals/types';
import Parser from './parser';

const RESERVED_WORDS:
Dictionary<ReservedWord> = [
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
