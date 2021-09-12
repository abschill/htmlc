"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceVar(raw, _varList) {
    let _copy = raw;
    const out = _varList.map(item => Object.entries(item));
    const _vrs = out.flat();
    _vrs.forEach(vr => {
        const _replace = `<!--@render=${vr[0]}-->`;
        _copy = _copy.replace(_replace, vr[1]);
    });
    return _copy;
}
exports.default = replaceVar;
//# sourceMappingURL=replaceVar.js.map