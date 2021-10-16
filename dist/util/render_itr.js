"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iterate_object_1 = __importDefault(require("./iterate_object"));
function renderItr(_copy, match, _iterator, outVal, outObj) {
    const _hLen = `<!--@for(${match[0]}){`;
    const _tLen = '}-->';
    match[1].forEach(matcher => {
        let newIterator = _iterator;
        newIterator = newIterator.replace(_hLen, '');
        newIterator = newIterator.replace(_tLen, '');
        const _el = newIterator.trim();
        if (typeof (matcher) === 'string') {
            outVal.push({ 'child': _el.replace('{_}', matcher), parent: _iterator });
        }
        else {
            outObj.push({ 'child': (0, iterate_object_1.default)(_el, matcher), parent: _iterator });
        }
    });
}
exports.default = renderItr;
//# sourceMappingURL=render_itr.js.map