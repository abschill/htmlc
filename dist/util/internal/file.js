"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFileUTF = exports._files = exports.mapFileData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const mapFileData = (filePath) => {
    const n = filePath.split('.html');
    if (process.platform === 'win32') {
        const na = n[0].split('\\');
        const name = na[na.length - 1];
        const rawFile = (0, exports.loadFileUTF)(filePath);
        return { path: filePath, name, rawFile };
    }
    else {
        const na = n[0].split('/');
        const name = na[na.length - 1];
        const rawFile = (0, exports.loadFileUTF)(filePath);
        return { path: filePath, name, rawFile };
    }
};
exports.mapFileData = mapFileData;
const _files = (dir) => fs_1.default.readdirSync(dir)
    .filter(x => fs_1.default.lstatSync(path_1.default.join(dir, x)).isFile())
    .map(x => path_1.default.resolve(dir, x));
exports._files = _files;
const loadFileUTF = (_path) => {
    try {
        return fs_1.default.readFileSync(_path).toString('utf-8');
    }
    catch (e) {
        throw e;
    }
};
exports.loadFileUTF = loadFileUTF;
//# sourceMappingURL=file.js.map