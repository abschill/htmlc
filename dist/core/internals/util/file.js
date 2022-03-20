"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsUtil = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const process_1 = require("process");
const __1 = require("..");
const debugger_1 = __importDefault(require("../debugger"));
class fsUtil {
    static mapData(filePath) {
        const n = filePath.split('.html');
        if (process.platform === 'win32') {
            const na = n[0].split(this.__WIN__);
            const name = na[na.length - 1];
            const rawFile = this.toStringF(filePath);
            return { path: filePath, name, rawFile };
        }
        else {
            const na = n[0].split(this.__BSD__);
            const name = na[na.length - 1];
            const rawFile = this.toStringF(filePath);
            return { path: filePath, name, rawFile };
        }
    }
    static resolveTemplates(conf) {
        const { templates = __1.DEFAULTS.templates, pathRoot = __1.DEFAULTS.pathRoot } = conf;
        const _path = (0, path_1.join)(process.cwd(), pathRoot, templates);
        try {
            return this.readDir(_path).map(p => this.mapData(p));
        }
        catch (e) {
            debugger_1.default.emit('fs::error', `Error: finding templates in ${pathRoot}/${templates} `);
            (0, process_1.emitWarning)(e);
            return;
        }
    }
    static resolvePartials(conf) {
        const { partials = __1.DEFAULTS.partials, pathRoot = __1.DEFAULTS.pathRoot } = conf;
        const _path = (0, path_1.join)(process.cwd(), pathRoot, partials);
        try {
            return this.readDir(_path).map(p => this.mapData(p));
        }
        catch (e) {
            debugger_1.default.emit('fs::error', `Error: finding partials in ${pathRoot}/${partials}`);
            (0, process_1.emitWarning)(e);
            return;
        }
    }
}
exports.fsUtil = fsUtil;
fsUtil.__WIN__ = '\\';
fsUtil.__BSD__ = '/';
fsUtil.readDir = (dir) => (0, fs_1.readdirSync)(dir)
    .filter(x => (0, fs_1.lstatSync)((0, path_1.join)(dir, x)).isFile())
    .map(x => (0, path_1.resolve)(dir, x));
fsUtil.toStringF = (filePath) => (0, fs_1.readFileSync)(filePath).toString('utf-8');
fsUtil.toJSONF = (filePath) => (0, fs_1.readFileSync)(filePath).toJSON();
//# sourceMappingURL=file.js.map