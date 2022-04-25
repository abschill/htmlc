"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDebug = void 0;
const index_1 = require("../util/index");
function getDebug(opt) {
    if (typeof opt === 'boolean')
        return opt === true ? index_1.DEBUG_BOOLTRUE : index_1.DEBUG_DEFAULTS;
    return Object.assign(Object.assign({}, index_1.DEBUG_DEFAULTS), opt);
}
exports.getDebug = getDebug;
//# sourceMappingURL=check-debug.js.map