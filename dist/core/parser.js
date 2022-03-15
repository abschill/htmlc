"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class Parser {
    static _replaceSignature(type, val) {
        switch (type) {
            case Parser._partialKey:
                return Parser._partialSignature.replace(Parser._delim, val);
            case Parser._loopKey:
                return Parser._loopSignature.replace(Parser._delim, val);
            default:
                return Parser._keySignature.replace(Parser._delim, val);
        }
    }
    static hasPartial(a) {
        return a.target.includes(Parser._replaceSignature(Parser._partialKey, a.key));
    }
    static partialIndex(a) {
        return a.target.indexOf(Parser._replaceSignature(Parser._partialKey, a.key));
    }
    static matchPartials(target) {
        return target.match(/<!--@partial=[\w|\d]+-->/gi);
    }
    static replacePartial(a) {
        return a.target.replace(Parser._replaceSignature(Parser._partialKey, a.key), a.value);
    }
    static hasKey(a) {
        return a.target.includes(Parser._replaceSignature(Parser._renderKey, a.key));
    }
    static matchKeys(target) {
        return target.match(/<!--@render=[\w|\d]+-->/gi);
    }
    static hasLoop(a) {
        return a.target.includes(`<!--${Parser.__loopKey__}(${a.key}){`);
    }
    static matchLoops(target) {
        const out = [];
        const _opener = /<!--@loop\(\w+\){/gi;
        const opener = target.match(_opener);
        if (opener && (opener === null || opener === void 0 ? void 0 : opener.length) > 0) {
            opener.forEach((match) => {
                const chopBottom = target.slice(target.indexOf(match), target.length);
                if (chopBottom) {
                    const ret = chopBottom === null || chopBottom === void 0 ? void 0 : chopBottom.slice(0, chopBottom.indexOf(Parser.LOOP_CLOSE) + Parser.LOOP_CLOSE.length);
                    if (ret)
                        out.push(ret);
                }
            });
        }
        return out;
    }
    static replaceAnonLoopBuf(a) {
        return a.target.replace(Parser._delim, a.key);
    }
    static replacedNamedLoopBuf(clone, insert) {
        let copy = clone;
        insert.forEach((insertion) => {
            copy = copy.replace(`{${insertion[0]}}`, insertion[1]);
        });
        return copy;
    }
}
exports.default = Parser;
_a = Parser;
Parser._delim = '{_}';
Parser.__CLOSE__ = '-->';
Parser.LOOP_CLOSE = `}${_a.__CLOSE__}`;
Parser.LOOP_OPEN = (key) => `<!--${_a.__loopKey__}(${key}){`;
Parser._renderKey = 'render';
Parser.__renderKey__ = `@${_a._renderKey}`;
Parser._partialKey = 'partial';
Parser.__partialKey__ = `@${_a._partialKey}`;
Parser._loopKey = 'loop';
Parser.__loopKey__ = `@${_a._loopKey}`;
Parser._loopSignature = `<!--${_a.__loopKey__}(${_a._delim}){}${_a.__CLOSE__}`;
Parser._keySignature = `<!--${_a.__renderKey__}=${_a._delim}${_a.__CLOSE__}`;
Parser._partialSignature = `<!--${_a.__partialKey__}=${_a._delim}${_a.__CLOSE__}`;
//# sourceMappingURL=parser.js.map