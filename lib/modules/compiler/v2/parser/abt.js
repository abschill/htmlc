"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function hasLoop(chunk) {
    return chunk.includes('@loop');
}
function hasPartial(chunk) {
    return chunk.includes('@partial');
}
function hasKey(chunk) {
    return chunk.includes('@render');
}
function matchKeys(chunk) {
    return chunk.match(/<!--@render=\w+.?[\w|\d]+-->/gi);
}
function matchPartial(chunk) {
    return chunk.match(/<!--@partial=[\w|\d|//\\]+-->/gi);
}
function matchLoops(chunk) {
    const out = [];
    const _opener = /<!--@loop\(\w+\){/gi;
    const opener = chunk.match(_opener);
    if (opener && (opener === null || opener === void 0 ? void 0 : opener.length) > 0) {
        opener.forEach((match) => {
            const chopBottom = chunk.slice(chunk.indexOf(match), chunk.length);
            if (chopBottom) {
                const ret = chopBottom === null || chopBottom === void 0 ? void 0 : chopBottom.slice(0, chopBottom.indexOf('}-->') + 4);
                if (ret)
                    out.push(ret);
            }
        });
    }
    return out;
}
const ABT = [
    {
        signature: '@partial',
        exists: hasPartial,
        asList: matchPartial
    },
    {
        signature: '@render',
        exists: hasKey,
        asList: matchKeys
    },
    {
        signature: '@loop',
        exists: hasLoop,
        asList: matchLoops
    },
];
exports.default = ABT;
//# sourceMappingURL=abt.js.map