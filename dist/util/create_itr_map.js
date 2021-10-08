"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function countItr(_varList) {
    const iterable_map = Object.values(_varList).map(Array.isArray);
    const _iterable_map = iterable_map.filter(_ => _ === true);
    const num_iterables = _iterable_map === null || _iterable_map === void 0 ? void 0 : _iterable_map.length;
    return num_iterables;
}
exports.default = countItr;
//# sourceMappingURL=create_itr_map.js.map