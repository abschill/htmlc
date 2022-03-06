"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = exports.replaceKey = exports.translateKeyName = exports.keyIndex = exports.loopIndex = exports.FOR_T = exports.FOR_H = void 0;
const FOR_H = (key) => `<!--@for(${key}){`;
exports.FOR_H = FOR_H;
const FOR_T = () => `}-->`;
exports.FOR_T = FOR_T;
const loopIndex = (a) => ({
    head: a.target.indexOf((0, exports.FOR_H)(a.key)),
    tail: a.target.indexOf((0, exports.FOR_T)())
});
exports.loopIndex = loopIndex;
const keyIndex = (a) => a.target.indexOf(`<!--@render=${a.key}-->`);
exports.keyIndex = keyIndex;
const translateKeyName = (t_k) => t_k.split('render=')[1].split('-->')[0];
exports.translateKeyName = translateKeyName;
const replaceKey = (a) => a.target.replace(a.key, a.value);
exports.replaceKey = replaceKey;
class Parser {
    static _replaceSignature(type, val) {
        switch (type) {
            case 'partial':
                return this._partialSignature.replace(this._delim, val);
            case 'loop':
                return this._loopSignature.replace(this._delim, val);
            default:
                return this._keySignature.replace(this._delim, val);
        }
    }
    static hasPartial(a) {
        return a.target.includes(this._replaceSignature(this._partialKey, a.key));
    }
    static partialIndex(a) {
        return a.target.indexOf(this._replaceSignature(this._partialKey, a.key));
    }
    static matchPartials(target) {
        return target.match(/<!--@partial=[\w|\d]+-->/gi);
    }
    static replacePartial(a) {
        return a.target.replace(this._replaceSignature(this._partialKey, a.key), a.value);
    }
    static hasKey(a) {
        return a.target.includes(this._replaceSignature(this._renderKey, a.key));
    }
    static matchKeys(target) {
        return target.match(/<!--@render=[\w|\d]+-->/gi);
    }
    static hasLoop(a) {
        return a.target.includes(`<!--@for(${a.key}){`);
    }
    static matchLoops(target) {
        const out = [];
        const _opener = /<!--@for\(\w+\){/gi;
        const opener = target.match(_opener);
        if (opener && (opener === null || opener === void 0 ? void 0 : opener.length) > 0) {
            opener.forEach(match => {
                const chopBottom = target.slice(target.indexOf(match), target.length);
                if (chopBottom) {
                    const ret = chopBottom === null || chopBottom === void 0 ? void 0 : chopBottom.slice(0, chopBottom.indexOf('}-->') + 4);
                    if (ret)
                        out.push(ret);
                }
            });
        }
        return out;
    }
    static replaceAnonLoopBuf(a) {
        return a.target.replace(this._delim, a.key);
    }
    static replacedNamedLoopBuf(clone, insert) {
        let copy = clone;
        insert.forEach((insertion) => {
            copy = copy.replace(`{${insertion[0]}}`, insertion[1]);
        });
        return copy;
    }
}
exports.Parser = Parser;
_a = Parser;
Parser._delim = '{_}';
Parser._renderKey = 'render';
Parser.__renderKey__ = `@${_a._renderKey}`;
Parser._partialKey = 'partial';
Parser.__partialKey__ = `@${_a._partialKey}`;
Parser._loopKey = 'for';
Parser.__loopKey__ = `@${_a._loopKey}`;
Parser.FOR_T = () => `}-->`;
Parser.FOR_H = (key) => `<!--@for(${key}){`;
Parser._loopSignature = `<!--${_a.__loopKey__}(${_a._delim}){}-->`;
Parser._keySignature = `<!--${_a.__renderKey__}=${_a._delim}->`;
Parser._partialSignature = `<!--${_a.__partialKey__}=${_a._delim}-->`;
//# sourceMappingURL=ast.js.map