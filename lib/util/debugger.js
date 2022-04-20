"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDebugger = void 0;
const _1 = require(".");
const config_1 = require("../config");
const _ = console.log;
function createDebugger(options) {
    if (!options.debug) {
        return;
    }
    const config = (0, config_1.checkDebug)(options.debug);
    if (config.logMode === 'silent' || config.logMode === 'considerate') {
        return;
    }
    _(_1.FG_COLOR_ESCAPES.blue, 'html-chunk-loader:');
    _(_1.FG_COLOR_ESCAPES.green, 'debug enabled');
    function log(event_signature, data) {
        _(_1.FG_COLOR_ESCAPES.blue, 'hcl_debug::event_signature: ', _1.FG_COLOR_ESCAPES.white.replace('%s', ''), event_signature);
        _(data);
    }
    return { log };
}
exports.createDebugger = createDebugger;
//# sourceMappingURL=debugger.js.map