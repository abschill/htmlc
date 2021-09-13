"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const parse_1 = __importDefault(require("../util/parse"));
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
        if (_copy.indexOf(`@render-partial=`)) {
            this.config.getPartials().forEach(p => {
                const qry = `<!--@render-partial=${p.name}-->`;
                if (_copy.includes(qry)) {
                    _copy = _copy.replace(qry, p.parsed);
                }
            });
            this.parsed = (0, parse_1.default)(_copy, _varList);
        }
    }
}
exports.default = Template;
//# sourceMappingURL=index.js.map