"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const render_1 = __importDefault(require("./render"));
class Partial {
    constructor(name, path, toInsert, config) {
        this.name = name;
        this._toInsert = toInsert;
        this.path = path;
        this.raw = fs_1.default.readFileSync(path).toString('utf-8');
        this.parsed = this.render();
        this.config = config;
    }
    render() {
        if (this._toInsert) {
            try {
                let copy = this.raw;
                this.parsed = (0, render_1.default)(this._toInsert, copy);
                return this.parsed;
            }
            catch (e) {
                throw e;
            }
        }
        else {
            return this.raw;
        }
    }
}
exports.default = Partial;
//# sourceMappingURL=index.js.map