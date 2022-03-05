"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_MAP = void 0;
const ast_1 = require("./ast");
exports.KEY_MAP = ['@for', '@render', '@partial'];
const RESERVED_WORDS = [
    {
        key: ast_1.Parser.__loopKey__,
        boolean: ast_1.Parser.hasLoop,
        array: ast_1.Parser.matchLoops
    },
    {
        key: ast_1.Parser.__renderKey__,
        boolean: ast_1.Parser.hasKey,
        array: ast_1.Parser.matchKeys
    },
    {
        key: ast_1.Parser.__partialKey__,
        boolean: ast_1.Parser.hasPartial,
        array: ast_1.Parser.matchPartials
    }
];
exports.default = RESERVED_WORDS;
//# sourceMappingURL=abt.js.map