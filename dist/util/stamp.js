"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stamp = void 0;
const { time, timeEnd, log } = console;
const stamp = (msg, label) => {
    time(label);
    log('\n');
    log('~~~~~~~~~~~~~~~~~~');
    log(msg);
    log('\n');
    timeEnd(label);
};
exports.stamp = stamp;
//# sourceMappingURL=stamp.js.map