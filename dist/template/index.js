"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const replaceVar_1 = __importDefault(require("../util/replaceVar"));
class Template {
    constructor(config, name, path) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.raw = fs_1.default.readFileSync(path).toString('utf-8');
        this.parsed = null;
    }
    parse(_varList) {
        let _copy = this.raw;
        if (_copy.indexOf(`$${this.config._config._internals.delimiter}-partial=`)) {
            this.config.getPartials().forEach(p => {
                const qry = `<!--$${this.config._config._internals.delimiter}-partial=${p.name}-->`;
                if (_copy.includes(qry)) {
                    _copy = _copy.replace(qry, p.parsed);
                }
            });
            this.parsed = (0, replaceVar_1.default)(this.config, _copy, _varList);
        }
    }
}
exports.default = Template;
//# sourceMappingURL=index.js.map