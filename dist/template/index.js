"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const render_1 = __importDefault(require("./render"));
class Template {
    constructor(config, name, path) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.raw = fs_1.default.readFileSync(path).toString('utf-8');
        this.parsed = null;
    }
    render(_varList) {
        let _copy = this.raw;
        this.parsed = (0, render_1.default)(_varList, _copy, this.config);
        return this.parsed;
    }
}
exports.default = Template;
//# sourceMappingURL=index.js.map