"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const iterator_1 = __importDefault(require("../util/iterator"));
const create_itr_map_1 = __importDefault(require("../util/create_itr_map"));
const loop_ast_1 = __importDefault(require("../util/loop_ast"));
const render_vals_1 = __importDefault(require("../util/render_vals"));
const insert_1 = __importDefault(require("../util/insert"));
function render(toInsert, copy) {
    let clone = copy;
    const num_iterables = (0, create_itr_map_1.default)(toInsert);
    const iterators = (0, iterator_1.default)(clone);
    clone = (0, render_vals_1.default)(clone, toInsert);
    if (Object.keys(toInsert).length > 0) {
        if (num_iterables === (iterators === null || iterators === void 0 ? void 0 : iterators.length)) {
            const ret = (0, loop_ast_1.default)(clone, toInsert);
            const { outVal, outObj } = ret;
            const valStr = outVal.map(x => x.child).join('');
            const objStr = outObj.map(x => x.child).join('');
            outVal.forEach((_out) => clone = (0, insert_1.default)(clone, _out.parent, valStr));
            outObj.forEach((_out) => clone = (0, insert_1.default)(clone, _out.parent, objStr));
        }
    }
    return clone;
}
exports.default = render;
//# sourceMappingURL=render.js.map