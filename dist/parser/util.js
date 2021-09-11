"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderVars = exports.getType = void 0;
const partial_1 = __importDefault(require("../partial"));
const index_1 = __importDefault(require("../config/index"));
function getType(seg) {
    if (seg instanceof partial_1.default) {
        return 'partial';
    }
    else {
        return 'template';
    }
}
exports.getType = getType;
function renderVars(pt, varList) {
    const { _config } = new index_1.default();
    let _copy = pt;
    const out = varList.map(item => Object.entries(item));
    const _vrs = out.flat();
    _vrs.forEach(vr => {
        const _replace = `<!--$${_config._internals.delimiter}=${vr[0]}-->`;
        _copy = _copy.replace(_replace, vr[1]);
    });
    return _copy;
}
exports.renderVars = renderVars;
//# sourceMappingURL=util.js.map