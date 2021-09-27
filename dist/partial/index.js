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
        this.parsed = null;
        this.parse();
    }
    parse() {
        if (!this.parsed) {
            if (this._toInsert) {
                try {
                    let _copy = this.raw;
                    Object.entries(this._toInsert).forEach(arg => {
                        _copy = _copy.replace(`<!--@render=${arg[0]}-->`, arg[1]);
                    });
                    this.parsed = _copy;
                    return _copy;
                }
                catch (e) {
                    throw e;
                }
            }
            else {
                this.parsed = this.raw;
                return this.raw;
            }
        }
        else {
            return this.parsed;
        }
    }
}
exports.default = Partial;
//# sourceMappingURL=index.js.map