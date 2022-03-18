import { kBUF, vBUF, Insertion, AST_TARGET, Entry } from './internals/types';
export default class Parser {
    static _delim: string;
    static __CLOSE__: string;
    static LOOP_CLOSE: string;
    static LOOP_OPEN: (key: string) => string;
    static _renderKey: string;
    static __renderKey__: string;
    static _partialKey: string;
    static __partialKey__: string;
    static _loopKey: string;
    static __loopKey__: string;
    static _loopSignature: string;
    static _keySignature: string;
    static _partialSignature: string;
    static _keyReggie: RegExp;
    static _partialReggie: RegExp;
    private static _replaceSignature;
    static hasPartial(a: kBUF): boolean;
    static partialIndex(a: kBUF): number;
    static matchPartials(target: AST_TARGET): RegExpMatchArray;
    static replacePartial(a: vBUF): string;
    static hasKey(a: kBUF): boolean;
    static matchKeys(target: AST_TARGET): RegExpMatchArray;
    static hasLoop(a: kBUF): boolean;
    static matchLoops(target: AST_TARGET): string[];
    static replaceAnonLoopBuf(a: kBUF): string;
    static replacedNamedLoopBuf(clone: string, insert: Insertion | Entry): string;
}
