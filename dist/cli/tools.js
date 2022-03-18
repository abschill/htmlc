"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__write = exports.pathify = exports.getModuleFromBase = exports.readNameData = exports.ensureOutPath = exports.findConfig = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file_1 = require("../core/internals/util/file");
const internals_1 = require("../core/internals");
function findConfig() {
    var _a, _b;
    const o = (_b = (_a = JSON.parse(fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), 'package.json')).toString('utf-8'))) === null || _a === void 0 ? void 0 : _a.static_config) !== null && _b !== void 0 ? _b : internals_1.DEFAULTS.static_config;
    return Object.keys(o) === Object.keys(internals_1.DEFAULTS.static_config) ?
        o : Object.assign(Object.assign({}, internals_1.DEFAULTS.static_config), o);
}
exports.findConfig = findConfig;
function ensureOutPath(outPath) {
    return fs_1.default.existsSync(outPath) ?
        null : fs_1.default.mkdirSync(outPath);
}
exports.ensureOutPath = ensureOutPath;
function readNameData(filePath) {
    const nameSplit0 = filePath.split('.html');
    const nameSplit1 = nameSplit0[nameSplit0.length - 2];
    const nameSplit2 = process.platform === 'win32' ?
        nameSplit1.split(file_1.fsUtil.__WIN__) : nameSplit1.split(file_1.fsUtil.__BSD__);
    return nameSplit2[nameSplit2.length - 1];
}
exports.readNameData = readNameData;
function getModuleFromBase(filePath) {
    return require(path_1.default.resolve(process.cwd(), filePath));
}
exports.getModuleFromBase = getModuleFromBase;
function pathify(template, contextPath) {
    const toName = `${template.name}.html`;
    return path_1.default.resolve(path_1.default.resolve(process.cwd(), contextPath), toName);
}
exports.pathify = pathify;
function __write(args) {
    fs_1.default.writeFileSync(args.toName, args.toWrite);
    return 0;
}
exports.__write = __write;
//# sourceMappingURL=tools.js.map