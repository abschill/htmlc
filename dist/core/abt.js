"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("./parser"));
const RESERVED_WORDS = [
    {
        key: parser_1.default.__loopKey__,
        boolean: parser_1.default.hasLoop,
        array: parser_1.default.matchLoops
    },
    {
        key: parser_1.default.__renderKey__,
        boolean: parser_1.default.hasKey,
        array: parser_1.default.matchKeys
    },
    {
        key: parser_1.default.__partialKey__,
        boolean: parser_1.default.hasPartial,
        array: parser_1.default.matchPartials
    }
];
exports.default = RESERVED_WORDS;
//# sourceMappingURL=abt.js.map