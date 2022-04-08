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
    static replacedNamedLoopBuf(copy, insert) {
        insert.forEach((insertion) => copy = copy.replace(`{${insertion[0]}}`, insertion[1]));
        return copy;
    }
    static hasSymbols(chunk) {
        return (chunk.includes('@render') || chunk.includes('@loop') || chunk.includes('@partial') || chunk.includes('@pgroup'));
    }
    static renderMap(content) {
        const rmap = {
            todo_keys: [],
            todo_loops: [],
            todo_partials: []
        };
        Parser.ABT.forEach(token => {
            const keymap = token.array(content);
            switch (token.key) {
                case Parser.__renderKey__:
                    keymap ? rmap.todo_keys = keymap : rmap.todo_keys = [];
                    break;
                case Parser.__loopKey__:
                    keymap ? rmap.todo_loops = keymap : rmap.todo_loops = [];
                    break;
                case Parser.__partialKey__:
                    keymap ? rmap.todo_partials = keymap : rmap.todo_partials = [];
                    break;
                default:
                    break;
            }
        });
        return rmap;
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
Parser._loopKey = 'loop';
Parser.__loopKey__ = `@${Parser._loopKey}`;
Parser._renderKey = 'render';
Parser._partialKey = 'partial';
Parser.__renderKey__ = `@${Parser._renderKey}`;
Parser.__partialKey__ = `@${Parser._partialKey}`;
Parser.keyReggie = /<!--@render=[\w|\d]+-->/gi;
Parser.partialReggie = /<!--@partial=[\w|\d|//\\]+-->/gi;
Parser.partialGroupReggie = /<!--@pgroup=[\w|\d|//\\|,]+-->/gi;
Parser.__CLOSE__ = '-->';
Parser.LOOP_CLOSE = `}${Parser.__CLOSE__}`;
Parser.LOOP_OPEN = (key) => `<!--${Parser.__loopKey__}(${key}){`;
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
Parser._loopSignature = `<!--${Parser.__loopKey__}(${Parser._delim}){}${Parser.__CLOSE__}`;
Parser._keySignature = `<!--${Parser.__renderKey__}=${Parser._delim}${Parser.__CLOSE__}`;
Parser._partialSignature = `<!--${Parser.__partialKey__}=${Parser._delim}${Parser.__CLOSE__}`;
Parser.hasPartial = (a) => a.target.includes(Parser._replaceSignature(Parser._partialKey, a.key));
Parser.partialIndex = (a) => a.target.indexOf(Parser._replaceSignature(Parser._partialKey, a.key));
Parser.matchPartials = (target) => target.match(Parser.partialReggie);
Parser.replacePartial = (a) => a.target.replace(Parser._replaceSignature(Parser._partialKey, a.key), a.value);
Parser.hasKey = (a) => a.target.includes(Parser._replaceSignature(Parser._renderKey, a.key));
Parser.matchKeys = (target) => target.match(Parser.keyReggie);
Parser.hasLoop = (a) => a.target.includes(`<!--${Parser.__loopKey__}(${a.key}){`);
Parser.replaceAnonLoopBuf = (a) => a.target.replace(Parser._delim, a.key);
Parser.ABT = [
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
//# sourceMappingURL=parser.js.map