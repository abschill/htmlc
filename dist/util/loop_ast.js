"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_1 = __importDefault(require("./iterator"));
function loopAST(clone, toInsert) {
    const outVal = [];
    const outObj = [];
    let _dom = clone;
    const entries = Object.entries(toInsert).filter(i => typeof (i[1]) !== 'string');
    const _iterator = (0, iterator_1.default)(_dom);
    entries.forEach((match, idx) => {
        const _itrCopy = _iterator[idx];
        const _hLen = `<!--@for(${match[0]}){`;
        const _tLen = '}-->';
        match[1].forEach(item => {
            let _copy = _itrCopy;
            _copy = _copy.replace(_hLen, '');
            _copy = _copy.replace(_tLen, '');
            if (typeof (item) === 'object') {
                const mapper = Object.entries(item);
                mapper.forEach(i => {
                    if (typeof (i[1]) === 'string') {
                        _copy = _copy.replace(`{${i[0]}}`, i[1]);
                    }
                });
                if (!_copy.includes('<pre>')) {
                    _copy = _copy.trimStart().replace(/\s\s+/gi, '');
                }
                outObj.push({ child: _copy, parent: _itrCopy });
            }
            else {
                _copy = _copy.replace(`{_}`, item);
                if (!_copy.includes('<pre>')) {
                    _copy = _copy.trimStart().replace(/\s\s+/gi, '');
                }
                outVal.push({ child: _copy, parent: _itrCopy });
            }
        });
    });
    return { outObj, outVal };
}
exports.default = loopAST;
//# sourceMappingURL=loop_ast.js.map