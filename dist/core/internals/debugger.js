"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { log, warn, time, timeEnd } = console;
class Debugger {
    static _registerEvent(...args) {
        const eventName = args[0];
        const meta = args[1];
        if (args[1].config.debug) {
            log('HCL_EVENT: ', eventName);
            log('\n');
            log('IEVENT_DATA:', meta);
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
exports.default = Debugger;
//# sourceMappingURL=debugger.js.map