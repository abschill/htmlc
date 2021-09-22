"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Partial {
    constructor(name, path, toInsert) {
        this.name = name;
        this._toInsert = toInsert;
        this.raw = fs_1.default.readFileSync(path).toString('utf-8');
        this.isParsed = false;
        this.parsed = null;
        if (this._toInsert) {
            this.parse();
        }
    }
    parse() {
        if (!this.isParsed && this._toInsert) {
            try {
                let _copy = this.raw;
                Object.entries(this === null || this === void 0 ? void 0 : this._toInsert).forEach(arg => {
                    _copy = _copy.replace(`<!--@render=${arg[0]}-->`, arg[1]);
                });
                this.isParsed = true;
                this.parsed = _copy;
                return _copy;
            }
            catch (e) {
                throw e;
            }
        }
        else {
            return this.parsed;
        }
    }
    _asObject() {
        return {
            name: this.name,
            args: this._toInsert,
            raw: this.raw,
            parsed: this.parsed
        };
    }
}
exports.default = Partial;
//# sourceMappingURL=index.js.map