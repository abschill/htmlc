"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const hasLoop = (chunk) => chunk.includes(constants_1.AST_LOOP_SIGNATURE);
const hasPartial = (chunk) => chunk.includes(constants_1.AST_PARTIAL_SIGNATURE);
const hasKey = (chunk) => chunk.includes(constants_1.AST_RENDER_SIGNATURE);
function matchKeys(chunk) {
    var _a;
    return (_a = chunk.match(constants_1.AST_RENDER_REGGIE)) !== null && _a !== void 0 ? _a : [];
}
function matchPartial(chunk) {
    var _a;
    return (_a = chunk.match(constants_1.AST_PARTIAL_REGGIE)) !== null && _a !== void 0 ? _a : [];
}
function matchLoops(chunk) {
    const out = [];
    const _opener = constants_1.AST_LOOP_OPEN_REGGIE;
    const opener = chunk.match(_opener);
    if (opener && (opener === null || opener === void 0 ? void 0 : opener.length) > 0) {
        opener.forEach((match) => {
            const chopBottom = chunk.slice(chunk.indexOf(match), chunk.length);
            if (chopBottom) {
                const ret = chopBottom === null || chopBottom === void 0 ? void 0 : chopBottom.slice(0, chopBottom.indexOf(constants_1.AST_CLOSE_SCOPE) + 4);
                if (ret)
                    out.push(ret);
            }
        });
    }
    return out;
}
const ABT = [
    {
        signature: constants_1.AST_PARTIAL_SIGNATURE,
        exists: hasPartial,
        asList: matchPartial
    },
    {
        signature: constants_1.AST_RENDER_SIGNATURE,
        exists: hasKey,
        asList: matchKeys
    },
    {
        signature: constants_1.AST_LOOP_SIGNATURE,
        exists: hasLoop,
        asList: matchLoops
    },
];
exports.default = ABT;
//# sourceMappingURL=tokens.js.map