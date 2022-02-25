"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stampLog = void 0;
const { time, timeEnd, log } = console;
const stampLog = (msg, label) => {
    time(label);
    log('\n');
    log('~~~~~~~~~~~~~~~~~~');
    log(msg);
    log('\n');
    timeEnd(label);
};
exports.stampLog = stampLog;
//# sourceMappingURL=stamp.js.map