import { internals } from "./internals";
export default class Parser {
    static _delim: string;
    static _renderKey: string;
    static __renderKey__: string;
    static _partialKey: string;
    static __partialKey__: string;
    static _loopKey: string;
    static __loopKey__: string;
    static FOR_T: () => string;
    static FOR_H: (key: string) => string;
    static _loopSignature: string;
    static _keySignature: string;
    static _partialSignature: string;
    private static _replaceSignature;
    static hasPartial(a: internals.kBUF): boolean;
    static partialIndex(a: internals.kBUF): number;
    static matchPartials(target: internals.AST_TARGET): RegExpMatchArray;
    static replacePartial(a: internals.vBUF): string;
    static hasKey(a: internals.kBUF): boolean;
    static matchKeys(target: internals.AST_TARGET): RegExpMatchArray;
    static hasLoop(a: internals.kBUF): boolean;
    static matchLoops(target: internals.AST_TARGET): string[];
    static replaceAnonLoopBuf(a: internals.kBUF): string;
    static replacedNamedLoopBuf(clone: string, insert: internals.Insertion | internals.Entry): string;
}
