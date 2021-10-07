"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_1 = __importDefault(require("../util/iterator"));
function render(_varList, inp, config) {
    let _copy = inp;
    config.partials.forEach(p => {
        _copy = _copy.replace(`<!--@render-partial=${p.name}-->`, p.parsed);
    });
    if (Object.keys(_varList).length > 0) {
        const iterable_map = Object.values(_varList).map(Array.isArray);
        const _iterable_map = iterable_map.filter(_ => _ === true);
        const num_iterables = _iterable_map === null || _iterable_map === void 0 ? void 0 : _iterable_map.length;
        const iterators = (0, iterator_1.default)(_copy);
        if (num_iterables === (iterators === null || iterators === void 0 ? void 0 : iterators.length)) {
            const _dom = _copy;
            const _parser = Object.keys(_varList).map(x => {
                const render_val = `<!--@render=${x}-->`;
                const loop_val = `<!--@for(${x}){`;
                if (_dom.includes(render_val)) {
                    return render_val;
                }
                if (_dom.includes(loop_val)) {
                    return loop_val;
                }
                return false;
            });
            function iterateObj(segment, entries) {
                let shallow = segment;
                Object.entries(entries).map(ent => {
                    shallow = shallow.replace(`{${ent[0]}}`, ent[1]);
                });
                return shallow;
            }
            let outVal = [];
            let outObj = [];
            _parser.forEach((p, idx) => {
                const _iterator = iterators[idx - 1];
                const match = Object.entries(_varList)[idx];
                if (p && p.includes('render')) {
                    _copy = _copy.replace(p, match[1]);
                }
                else {
                    if (p && p.includes('for')) {
                        const _hLen = `<!--@for(${match[0]}){`;
                        const _tLen = '}-->';
                        match[1].forEach(matcher => {
                            let newIterator = _iterator;
                            //loop each submitted array item and create new element
                            newIterator = newIterator.replace(_hLen, '');
                            newIterator = newIterator.replace(_tLen, '');
                            const _el = newIterator.trim();
                            if (typeof (matcher) === 'string') {
                                outVal.push({ 'child': _el.replace('{_}', matcher), parent: _iterator });
                            }
                            else {
                                outObj.push({ 'child': iterateObj(_el, matcher), parent: _iterator });
                            }
                        });
                    }
                }
            });
            const elArr = outVal.map(x => x.child).join('');
            const valArr = outObj.map(x => x.child).join('');
            outVal.forEach((_out) => _copy = _copy.replace(_out.parent, elArr));
            outObj.forEach((_out) => _copy = _copy.replace(_out.parent, valArr));
        }
    }
    return _copy;
}
exports.default = render;
//# sourceMappingURL=render.js.map