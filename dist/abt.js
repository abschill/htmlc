"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ast_1 = require("./ast");
const RESERVED_WORDS = [
    {
        key: '@for',
        boolean: ast_1.hasLoop,
        array: ast_1.matchLoop
    },
    {
        key: '@render',
        boolean: ast_1.hasKey,
        array: ast_1.matchKey
    },
    {
        key: '@render-partial',
        boolean: ast_1.hasPartial,
        array: ast_1.matchPartial
    }
];
exports.default = RESERVED_WORDS;
//# sourceMappingURL=abt.js.map