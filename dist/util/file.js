"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsUtil = void 0;
const internals_1 = require("../core/internals");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class fsUtil {
    static readDir(dir) {
        return fs_1.default.readdirSync(dir)
            .filter(x => fs_1.default.lstatSync(path_1.default.join(dir, x)).isFile())
            .map(x => path_1.default.resolve(dir, x));
    }
    static loadUTF8(filePath) {
        return fs_1.default.readFileSync(filePath).toString('utf-8');
    }
    static mapData(filePath) {
        const n = filePath.split('.html');
        if (process.platform === 'win32') {
            const na = n[0].split('\\');
            const name = na[na.length - 1];
            const rawFile = this.loadUTF8(filePath);
            return { path: filePath, name, rawFile };
        }
        else {
            const na = n[0].split('/');
            const name = na[na.length - 1];
            const rawFile = this.loadUTF8(filePath);
            return { path: filePath, name, rawFile };
        }
    }
    static resolveTemplates(conf) {
        const { templates = internals_1.DEFAULTS.templates, pathRoot = internals_1.DEFAULTS.pathRoot } = conf;
        const _path = path_1.default.join(process.cwd(), pathRoot, templates);
        if (_path) {
            try {
                return this.readDir(_path).map(p => this.mapData(p));
            }
            catch (e) {
                throw e;
            }
        }
        else {
            throw new Error('Template Directory Resolution Failed - Template Directory not found');
        }
    }
    static resolvePartials(conf) {
        const { partials = internals_1.DEFAULTS.partials, pathRoot = internals_1.DEFAULTS.pathRoot } = conf;
        const _path = path_1.default.join(process.cwd(), pathRoot, partials);
        if (_path) {
            try {
                return this.readDir(_path).map(p => this.mapData(p));
            }
            catch (e) {
                throw e;
            }
        }
        else {
            throw new Error('Partial Directory Resolution Failed - Partial Directory not Found');
        }
    }
}
exports.fsUtil = fsUtil;
//# sourceMappingURL=file.js.map