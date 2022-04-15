"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genLoopOpenScope = exports.genInlineScope = void 0;
const constants_1 = require("./constants");
function genInlineScope(input) {
    return `${constants_1.ABT_OPEN_SCOPE}${input}${constants_1.ABT_CLOSE_SCOPE}`;
}
exports.genInlineScope = genInlineScope;
function genLoopOpenScope(name) {
    return `${constants_1.ABT_OPEN_SCOPE}${constants_1.ABT_LOOP_SIGNATURE}(${name}){`;
}
exports.genLoopOpenScope = genLoopOpenScope;
//# sourceMappingURL=util.js.map