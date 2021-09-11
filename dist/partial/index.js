"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const replaceVar_1 = __importDefault(require("../util/replaceVar"));
class Partial {
    constructor(config, name, path, varList) {
        this.config = config;
        this.name = name;
        this.path = path;
        this.varList = varList;
        this.raw = fs_1.default.readFileSync(path).toString('utf-8');
        this.isParsed = false;
        this.parsed = null;
    }
    parse(_varList) {
        if (this.raw.includes(`${this.config._config._internals.delimiter}=`)) {
            let _copy = this.raw;
            this.parsed = (0, replaceVar_1.default)(this.config, _copy, _varList);
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
            args: this.varList,
            raw: this.raw,
            parsed: this.parsed
        };
    }
}
exports.default = Partial;
//# sourceMappingURL=index.js.map