"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFileData = exports.resolveTemplates = exports.resolvePartials = exports._files = void 0;
const internals_1 = require("../core/internals");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const _files = (dir) => fs_1.default.readdirSync(dir)
    .filter(x => fs_1.default.lstatSync(path_1.default.join(dir, x)).isFile())
    .map(x => path_1.default.resolve(dir, x));
exports._files = _files;
const resolvePartials = (conf) => {
    const { partials = internals_1.DEFAULTS.partials, pathRoot = internals_1.DEFAULTS.pathRoot } = conf;
    const _path = path_1.default.join(process.cwd(), pathRoot, partials);
    if (_path) {
        try {
            const __files = (0, exports._files)(_path);
            const files = __files.map(exports.mapFileData);
            return files;
        }
        catch (e) {
            throw e;
        }
    }
    else {
        throw new Error('Partial Directory Resolution Failed - Partial Directory not Found');
    }
};
exports.resolvePartials = resolvePartials;
const resolveTemplates = (conf) => {
    const { templates = internals_1.DEFAULTS.templates, pathRoot = internals_1.DEFAULTS.pathRoot } = conf;
    const _path = path_1.default.join(process.cwd(), pathRoot, templates);
    if (_path) {
        try {
            const __files = (0, exports._files)(_path);
            const files = __files.map(exports.mapFileData);
            return files;
        }
        catch (e) {
            throw e;
        }
    }
    else {
        throw new Error('Template Directory Resolution Failed - Template Directory not found');
    }
};
exports.resolveTemplates = resolveTemplates;
const mapFileData = (filePath) => {
    const n = filePath.split('.html');
    if (process.platform === 'win32') {
        const na = n[0].split('\\');
        const name = na[na.length - 1];
        const rawFile = loadFileUTF(filePath);
        return { path: filePath, name, rawFile };
    }
    else {
        const na = n[0].split('/');
        const name = na[na.length - 1];
        const rawFile = loadFileUTF(filePath);
        return { path: filePath, name, rawFile };
    }
};
exports.mapFileData = mapFileData;
const loadFileUTF = (_path) => fs_1.default.readFileSync(_path).toString('utf-8');
//# sourceMappingURL=file.js.map