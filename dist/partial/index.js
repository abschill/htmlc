"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const parse_1 = __importDefault(require("../util/parse"));
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
        if (this.raw.includes(`@render=`)) {
            let _copy = this.raw;
            this.parsed = (0, parse_1.default)(_copy, _varList);
            this.isParsed = true;
        }
        else {
            return;
        }
    }
    asObject() {
        return {
            //  type: this.type, 
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