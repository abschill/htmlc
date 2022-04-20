"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDebug = void 0;
const index_1 = require("../util/index");
function checkDebug(opt) {
    if (typeof opt === 'boolean') {
        return opt === true ? index_1.DEBUG_BOOLTRUE : index_1.DEBUG_DEFAULTS;
    }
    else {
        return Object.assign(Object.assign({}, index_1.DEBUG_DEFAULTS), opt);
    }
}
exports.checkDebug = checkDebug;
//# sourceMappingURL=check-debug.js.map