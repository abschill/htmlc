"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTemplates = exports.resolvePartials = void 0;
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const default_1 = __importDefault(require("../default"));
const resolvePartials = (conf) => {
    const { partials = default_1.default.partials, pathRoot = default_1.default.pathRoot } = conf;
    const _path = path_1.default.join(process.cwd(), pathRoot, partials);
    if (_path) {
        try {
            const __files = (0, file_1._files)(_path);
            const files = __files.map(file_1.mapFileData);
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
    const { templates = default_1.default.templates, pathRoot = default_1.default.pathRoot } = conf;
    const _path = path_1.default.join(process.cwd(), pathRoot, templates);
    if (_path) {
        try {
            const __files = (0, file_1._files)(_path);
            const files = __files.map(file_1.mapFileData);
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
//# sourceMappingURL=dirTree.js.map