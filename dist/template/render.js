"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_1 = __importDefault(require("../util/iterator"));
const iterate_object_1 = __importDefault(require("../util/iterate_object"));
const config_partial_1 = __importDefault(require("../util/config_partial"));
const create_itr_map_1 = __importDefault(require("../util/create_itr_map"));
const parsable_1 = __importDefault(require("../util/parsable"));
const insert_1 = __importDefault(require("../util/insert"));
function render(_varList, inp, config) {
    let _copy = inp;
    _copy = (0, config_partial_1.default)(config, _copy);
    if (Object.keys(_varList).length > 0) {
        const num_iterables = (0, create_itr_map_1.default)(_varList);
        const iterators = (0, iterator_1.default)(_copy);
        if (num_iterables === (iterators === null || iterators === void 0 ? void 0 : iterators.length)) {
            const _dom = _copy;
            const _parser = (0, parsable_1.default)(_varList, _dom);
            let outVal = [];
            let outObj = [];
            _parser.forEach((p, idx) => {
                const _iterator = iterators[idx - 1];
                const match = Object.entries(_varList)[idx];
                if (p && p.includes('render')) {
                    if (config.verbose) {
                        console.log('To Insert: \n');
                        console.log(match[1]);
                        console.log('\nAt:');
                        console.log(p);
                    }
                    _copy = (0, insert_1.default)(_copy, p, match[1]);
                }
                else {
                    if (p && p.includes('for')) {
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
                }
            });
            if (config.verbose) {
                console.log('Out Values:\n');
                console.log(outVal);
                console.log('Out Objects:\n');
                console.log(outObj);
            }
            const elArr = outVal.map(x => x.child).join('');
            const valArr = outObj.map(x => x.child).join('');
            if (config.verbose) {
                console.log('Element Array:\n');
                console.log(elArr);
                console.log('\nValue Array:\n');
                console.log(valArr);
            }
            outVal.forEach((_out) => _copy = (0, insert_1.default)(_copy, _out.parent, elArr));
            outObj.forEach((_out) => _copy = (0, insert_1.default)(_copy, _out.parent, valArr));
        }
    }
    return _copy;
}
exports.default = render;
//# sourceMappingURL=render.js.map