"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTIAL_TYPE = void 0;
const fs_1 = __importDefault(require("fs"));
var PARTIAL_TYPE;
(function (PARTIAL_TYPE) {
    PARTIAL_TYPE[PARTIAL_TYPE["header"] = 0] = "header";
    PARTIAL_TYPE[PARTIAL_TYPE["heading"] = 1] = "heading";
    PARTIAL_TYPE[PARTIAL_TYPE["content"] = 2] = "content";
    PARTIAL_TYPE[PARTIAL_TYPE["footer"] = 4] = "footer";
    PARTIAL_TYPE[PARTIAL_TYPE["scripts"] = 5] = "scripts";
    PARTIAL_TYPE[PARTIAL_TYPE["lazy"] = 6] = "lazy";
})(PARTIAL_TYPE = exports.PARTIAL_TYPE || (exports.PARTIAL_TYPE = {}));
class Partial {
    constructor(path, type) {
        this.path = path;
        this.type = type;
    }
    render() {
        console.log(fs_1.default.readFileSync(this.path).toString('utf-8'));
        console.log(this.type);
    }
}
exports.default = Partial;
//# sourceMappingURL=index.js.map