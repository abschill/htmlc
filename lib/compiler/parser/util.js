"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genLoopOpenScope = exports.genInlineScope = void 0;
const constants_1 = require("./constants");
const genInlineScope = (input) => `${constants_1.AST_OPEN_SCOPE}${input}${constants_1.AST_CLOSE_SCOPE}`;
exports.genInlineScope = genInlineScope;
const genLoopOpenScope = (name) => `${constants_1.AST_OPEN_SCOPE}${constants_1.AST_LOOP_SIGNATURE}${constants_1.AST_KNO}${name}${constants_1.AST_KNC}${constants_1.AST_TNO}`;
exports.genLoopOpenScope = genLoopOpenScope;
//# sourceMappingURL=util.js.map