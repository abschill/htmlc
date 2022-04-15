"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDebugger = void 0;
const _1 = require(".");
const config_1 = require("../core/config");
const c = console.log;
function createDebugger(options) {
    if (!options.debug) {
        return;
    }
    const config = (0, config_1.checkDebug)(options.debug);
    if (config.logMode === 'silent') {
        return;
    }
    c('\x1b[42m%s\x1b[37m', 'html-chunk-loader: ', '\x1b[47m', 'debug enabled\n');
    function log(event_signature, data) {
        c(_1.FG_COLOR_ESCAPES.blue, 'html-chunk-loader:', '\x1b[37m', event_signature);
        c(data);
    }
    return { log };
}
exports.createDebugger = createDebugger;
//# sourceMappingURL=debugger.js.map