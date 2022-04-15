"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__write = exports.pathify = exports.ensureOutPath = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function ensureOutPath(outPath) {
    return (0, fs_1.existsSync)(outPath) ?
        null : (0, fs_1.mkdirSync)(outPath);
}
exports.ensureOutPath = ensureOutPath;
function pathify(template, contextPath) {
    const toName = `${template.name}.html`;
    return path_1.default.resolve(path_1.default.resolve(process.cwd(), contextPath), toName);
}
exports.pathify = pathify;
function __write(args) {
    (0, fs_1.writeFileSync)(args.toName, args.toWrite);
    return 0;
}
exports.__write = __write;
//# sourceMappingURL=tools.js.map