"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusObj = exports.fatalErr = exports.nonFatalErr = exports.warning = exports.status = void 0;
const chalk_1 = __importDefault(require("chalk"));
const util_1 = __importDefault(require("util"));
const status = (msg) => console.log(chalk_1.default.blueBright(msg));
exports.status = status;
const warning = (msg) => console.log(chalk_1.default.yellow(msg));
exports.warning = warning;
const nonFatalErr = (err) => console.log(chalk_1.default.red(err));
exports.nonFatalErr = nonFatalErr;
const fatalErr = (err) => { throw err; };
exports.fatalErr = fatalErr;
const statusObj = (label, _a) => {
    var o = __rest(_a, []);
    console.log(chalk_1.default.blue.bold(label));
    console.log();
    Object.entries(o).forEach(ent => {
        if (typeof (ent[1]) === 'string') {
            console.log(chalk_1.default.magenta.bold(ent[0] + ':\n' + ent[1]));
        }
        if (typeof (ent[1]) === 'object') {
            console.log(chalk_1.default.blue.bold(`${ent[0]}: ${chalk_1.default.reset.greenBright(util_1.default.inspect(ent[1]))}`));
        }
    });
};
exports.statusObj = statusObj;
//# sourceMappingURL=logger.js.map