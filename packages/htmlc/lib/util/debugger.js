"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDebugger = void 0;
const terminal_color_1 = require("terminal-color");
const config_1 = require("../config");
const _ = console.log;
function createDebugger(options) {
    if (!options.debug) {
        return;
    }
    const config = (0, config_1.useDebug)(options.debug);
    if (config.logMode === 'silent' || config.logMode === 'considerate') {
        return;
    }
    _(terminal_color_1.color.fg.blue('html-chunk-loader:'));
    _(terminal_color_1.color.fg.green('debug enabled'));
    function log(event_signature, data) {
        _(terminal_color_1.color.fg.blue('htmlc::event_signature: '), event_signature);
        _(data);
    }
    function err(event_signature, data) {
        _(terminal_color_1.color.fg.red('htmlc::event_signature: '), event_signature);
        _(data);
    }
    return { log, err };
}
exports.createDebugger = createDebugger;
//# sourceMappingURL=debugger.js.map