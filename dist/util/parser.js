"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const insert_1 = __importDefault(require("./insert"));
const iterate_object_1 = __importDefault(require("./iterate_object"));
function parser(parsables, iterators, _copy, _varList) {
    let outVal = [];
    let outObj = [];
    parsables.forEach((p, idx) => {
        const _iterator = iterators[idx - 1];
        const match = Object.entries(_varList)[idx];
        if (p && p.includes('render')) {
            _copy = (0, insert_1.default)(_copy, p, match[1]);
        }
        else {
            if (p && p.includes('for')) {
                const _hLen = `<!--@for(${match[0]}){`;
                const _tLen = '}-->';
                match[1].forEach(matcher => {
                    // console.log( matcher );
                    let newIterator = _iterator;
                    //loop each submitted array item and create new element
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
        }
    });
    return { outVal, outObj };
}
exports.default = parser;
//# sourceMappingURL=parser.js.map