"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debugger = void 0;
const { log, warn, time, timeEnd } = console;
class Debugger {
    static _registerEvent(...args) {
        const eventName = args[0];
        const templateName = args[2]['0'].template_name;
        const contextData = args[2]['0'].ctx;
        if (args[1].config.debug) {
            log('HCL_EVENT: ', eventName);
            log('HCL_TEMPLATE: ', templateName);
            log('HCL_CTX: ', contextData);
        }
    }
    static raise(m) {
        warn(m);
    }
    static stamp(msg, label) {
        time(label);
        log('\n');
        log('~~~~~~~~~~~~~~~~~~');
        log(msg);
        log('\n');
        timeEnd(label);
    }
    static _registerMap(rmap, imap) {
        log('HCL_EVENT: map::register');
        log(rmap);
        log(imap);
    }
    static _finalize(args) {
        log(args);
    }
}
exports.Debugger = Debugger;
//# sourceMappingURL=debugger.js.map