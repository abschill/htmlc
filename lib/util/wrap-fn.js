"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = void 0;
function wrap(t, c) {
    try {
        return t();
    }
    catch (_) {
        return c();
    }
}
exports.wrap = wrap;
//# sourceMappingURL=wrap-fn.js.map