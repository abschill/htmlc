"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
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
    static replacedNamedLoopBuf(clone, insert) {
        let copy = clone;
        insert.forEach((insertion) => {
            copy = copy.replace(`{${insertion[0]}}`, insertion[1]);
        });
        return copy;
    }
    static checkDeprecation(clone) {
        for (const tag of Parser.DEPRECATED_TAGS) {
            if (clone.includes(tag.old)) {
                (0, process_1.emitWarning)(`Warning: ${tag.old} was deprecated in version ${tag.v_change}\n`);
                (0, process_1.emitWarning)(`Replace ${tag.old} with ${tag.new} if you are using a version later than ${tag.v_change}`);
            }
        }
    }
}
exports.default = Parser;
Parser.DEPRECATED_TAGS = [
    {
        old: '@render-partial',
        new: '@partial',
        v_change: '0.4.5'
    },
    {
        old: '@for',
        new: '@loop',
        v_change: '0.4.5'
    }
];
Parser._delim = '{_}';
Parser.__CLOSE__ = '-->';
Parser.LOOP_CLOSE = `}${Parser.__CLOSE__}`;
Parser.LOOP_OPEN = (key) => `<!--${Parser.__loopKey__}(${key}){`;
Parser._renderKey = 'render';
Parser.__renderKey__ = `@${Parser._renderKey}`;
Parser._partialKey = 'partial';
Parser.__partialKey__ = `@${Parser._partialKey}`;
Parser._loopKey = 'loop';
Parser.__loopKey__ = `@${Parser._loopKey}`;
Parser._loopSignature = `<!--${Parser.__loopKey__}(${Parser._delim}){}${Parser.__CLOSE__}`;
Parser._keySignature = `<!--${Parser.__renderKey__}=${Parser._delim}${Parser.__CLOSE__}`;
Parser._partialSignature = `<!--${Parser.__partialKey__}=${Parser._delim}${Parser.__CLOSE__}`;
Parser._keyReggie = /<!--@render=[\w|\d]+-->/gi;
Parser._partialReggie = /<!--@partial=[\w|\d]+-->/gi;
Parser.hasPartial = (a) => a.target.includes(Parser._replaceSignature(Parser._partialKey, a.key));
Parser.partialIndex = (a) => a.target.indexOf(Parser._replaceSignature(Parser._partialKey, a.key));
Parser.matchPartials = (target) => target.match(Parser._partialReggie);
Parser.replacePartial = (a) => a.target.replace(Parser._replaceSignature(Parser._partialKey, a.key), a.value);
Parser.hasKey = (a) => a.target.includes(Parser._replaceSignature(Parser._renderKey, a.key));
Parser.matchKeys = (target) => target.match(Parser._keyReggie);
Parser.hasLoop = (a) => a.target.includes(`<!--${Parser.__loopKey__}(${a.key}){`);
Parser.replaceAnonLoopBuf = (a) => a.target.replace(Parser._delim, a.key);
//# sourceMappingURL=parser.js.map