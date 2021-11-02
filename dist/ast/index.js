"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchPartial = exports.replacePartial = exports.partialIndex = exports.hasPartial = exports.matchKey = exports.replaceKey = exports.translateKeyName = exports.keyIndex = exports.hasKey = exports.matchLoop = exports.loopIndex = exports.hasLoop = void 0;
const hasLoop = (target, arr) => target.includes(`<!--@for(${arr}){`);
exports.hasLoop = hasLoop;
const loopIndex = (target, arr) => ({ 'head': target.indexOf(`<!--@for(${arr}){`), 'tail': target.indexOf('}-->') });
exports.loopIndex = loopIndex;
const matchLoop = (target) => {
    let out = [];
    const _opener = /<!--@for\(\w+\){/gi;
    const opener = target.match(_opener);
    if ((opener === null || opener === void 0 ? void 0 : opener.length) > 0) {
        opener.forEach((match, idx) => {
            const openIdx = target.indexOf(match);
            const chopBottom = target.slice(openIdx, target.length);
            const ret = chopBottom.slice(0, chopBottom.indexOf('}-->') + 4);
            out.push(ret);
        });
    }
    return out;
};
exports.matchLoop = matchLoop;
const hasKey = (target, key) => target.includes(`<!--@render=${key}-->`);
exports.hasKey = hasKey;
const keyIndex = (target, key) => target.indexOf(`<!--@render=${key}-->`);
exports.keyIndex = keyIndex;
const translateKeyName = (templated_key) => templated_key.split('render=')[1].split('-->')[0];
exports.translateKeyName = translateKeyName;
const replaceKey = (target, key, value) => {
    let _copy = target;
    _copy = _copy.replace(key, value);
    return _copy;
};
exports.replaceKey = replaceKey;
const matchKey = (target) => {
    const _reggie = /<!--@render=[\w|\d]+-->/gi;
    return target.match(_reggie);
};
exports.matchKey = matchKey;
const hasPartial = (target, key) => target.includes(`<!--@render-partial=${key}-->`);
exports.hasPartial = hasPartial;
const partialIndex = (target, key) => target.indexOf(`<!--@render-partial=${key}-->`);
exports.partialIndex = partialIndex;
const replacePartial = (target, key, value) => {
    let _copy = target;
    _copy = _copy.replace(key, value);
    return _copy;
};
exports.replacePartial = replacePartial;
const matchPartial = (target) => {
    const _reggie = /<!--@render-partial=[\w|\d]+-->/gi;
    return target.match(_reggie);
};
exports.matchPartial = matchPartial;
//# sourceMappingURL=index.js.map