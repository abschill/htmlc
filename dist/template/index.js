"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Template {
    constructor(config, name, path) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.raw = fs_1.default.readFileSync(path).toString('utf-8');
        this.parsed = null;
        this.preload = null;
        this._preload();
    }
    _preload() {
        let _copy = this.raw;
        this.config.partials.forEach(p => {
            _copy = _copy.replace(`<!--@render-partial=${p.name}-->`, p.parsed);
        });
        this.preload = _copy;
        return _copy;
    }
    _hasPartial(lbl) {
        const qry = `<!--@render-partial=${lbl}-->`;
        const _existsRaw = this.raw.indexOf(qry) !== -1;
        const _existsPre = this.preload.indexOf(qry) !== -1;
        return { _existsRaw, _existsPre };
    }
    render(_varList) {
        var _a;
        let _copy = (_a = this.preload) !== null && _a !== void 0 ? _a : this.raw;
        this.config.partials.forEach(p => {
            _copy = _copy.replace(`<!--@render-partial=${p.name}-->`, p.parsed);
        });
        if (_varList) {
            Object.entries(_varList).forEach(_ => {
                const e = _.flat();
                //@ts-ignore
                _copy = _copy.replace(`<!--@render=${e[0]}-->`, e[1]);
            });
            this.parsed = _copy;
            return this.parsed;
        }
        else {
            return this.preload;
        }
    }
}
exports.default = Template;
//# sourceMappingURL=index.js.map