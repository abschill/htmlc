"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parsable_1 = __importDefault(require("./parsable"));
const insert_1 = __importDefault(require("./insert"));
function renderVals(_copy, _varList, config) {
    let _dom = _copy;
    const _parser = (0, parsable_1.default)(_varList, _dom);
    _parser.forEach((p, idx) => {
        const match = Object.entries(_varList)[idx];
        if (p && p.includes('render')) {
            if (config.verbose) {
                console.log('To Insert: \n');
                console.log(match[1]);
                console.log('\nAt:');
                console.log(p);
            }
            _dom = (0, insert_1.default)(_dom, p, match[1]);
        }
    });
    return _dom;
}
exports.default = renderVals;
//# sourceMappingURL=render_vals.js.map