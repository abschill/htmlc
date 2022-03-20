"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const { log, warn, time, timeEnd } = console;
const deb = new events_1.default();
deb.on('start', () => log('HCL::debug - started'));
deb.on('file::change', (e) => log(e));
deb.on('fs::error', (e) => warn(e));
exports.default = deb;
//# sourceMappingURL=debugger.js.map