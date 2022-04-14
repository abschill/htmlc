"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDebugger = void 0;
const { log, warn, error } = console;
function createDebugger(options) {
    if (!options.debug) {
        return;
    }
    const config = options.debug;
    if (config.logMode === 'silent') {
        return;
    }
    console.log(config);
    function log(event, msg) {
        console.log(event);
        console.log(msg);
    }
    return { log };
}
exports.createDebugger = createDebugger;
//# sourceMappingURL=debugger.js.map