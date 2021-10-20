"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FOR_T = exports.FOR_H = void 0;
const _1 = require(".");
const FOR_H = (key) => `<!--@for(${key}){`;
exports.FOR_H = FOR_H;
const FOR_T = () => `}-->`;
exports.FOR_T = FOR_T;
const RESERVED_WORDS = {
    '@for': {
        'boolean': _1.hasLoop,
        'array': _1.matchLoop,
        'head|tail': _1.loopIndex
    },
    '@render': {
        'boolean': _1.hasKey,
        'array': _1.matchKey,
        'translate': _1.translateKeyName
    },
    '@render-partial': {
        'boolean': _1.hasPartial,
        'array': _1.matchPartial
    }
};
exports.default = RESERVED_WORDS;
//# sourceMappingURL=words.js.map