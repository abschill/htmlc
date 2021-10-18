"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
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