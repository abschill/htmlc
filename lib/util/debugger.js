"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDebugger = void 0;
const _1 = require(".");
const c = console;
function cleanArgs(args) {
    if (args !== true)
        return Object.assign(Object.assign({}, _1.DEBUG_DEFAULTS), args);
    return _1.DEBUG_DEFAULTS;
}
function createDebugger(options) {
    if (!options.debug) {
        return;
    }
    const config = cleanArgs(options.debug);
    if (config.logMode === 'silent') {
        return;
    }
    c.log(_1.FG_COLOR_ESCAPES.green, 'html-chunk-loader: config loaded\n');
    c.log(_1.FG_COLOR_ESCAPES.green, config);
    function log(event_signature, data) {
        c.log(_1.FG_COLOR_ESCAPES.blue, `html-chunk-loader: ${event_signature}`);
        c.log(data);
    }
    return { log };
}
exports.createDebugger = createDebugger;
//# sourceMappingURL=debugger.js.map