"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Partial {
    constructor(config, name, path, toInsert) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.toInsert = toInsert;
        this.raw = fs_1.default.readFileSync(path).toString('utf-8');
        this.isParsed = false;
        this.parsed = null;
    }
    parse(_varList) {
        if (!this.isParsed) {
            let _copy = this.raw;
            if (this.raw.includes(`@render=`) && _varList) {
                Object.entries(_varList).forEach(vr => {
                    const _replace = `<!--@render=${vr[0]}-->`;
                    if (_copy.indexOf(_replace) !== -1) {
                        _copy = _copy.replace(_replace, vr[1]);
                    }
                });
                this.parsed = _copy;
                this.isParsed = true;
                return this;
            }
            else {
                console.log('no var list');
                return this.raw;
            }
        }
        else {
            return this.parsed;
        }
    }
    _asObject() {
        return {
            name: this.name,
            path: this.path,
            args: this.toInsert,
            raw: this.raw,
            parsed: this.parsed
        };
    }
}
exports.default = Partial;
//# sourceMappingURL=index.js.map