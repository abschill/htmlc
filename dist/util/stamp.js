"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stampLog = void 0;
const { time, timeEnd, log } = console;
const get_current_line_1 = __importDefault(require("get-current-line"));
const stampLog = (msg, label) => {
    time(label);
    log('\n');
    log('~~~~~~~~~~~~~~~~~~');
    log(msg);
    log('\n');
    (0, get_current_line_1.default)();
    timeEnd(label);
};
exports.stampLog = stampLog;
//# sourceMappingURL=stamp.js.map