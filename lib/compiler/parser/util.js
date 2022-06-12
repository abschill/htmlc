"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoopOpenScope = exports.useInlineScope = void 0;
const constants_1 = require("./constants");
const useInlineScope = (input) => `${constants_1.AST_OPEN_SCOPE}${input}${constants_1.AST_CLOSE_SCOPE}`;
exports.useInlineScope = useInlineScope;
const useLoopOpenScope = (name) => `${constants_1.AST_OPEN_SCOPE}${constants_1.AST_LOOP_SIGNATURE}${constants_1.AST_KNO}${name}${constants_1.AST_KNC}${constants_1.AST_TNO}`;
exports.useLoopOpenScope = useLoopOpenScope;
//# sourceMappingURL=util.js.map