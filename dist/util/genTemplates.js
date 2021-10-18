"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const genTemplates = (conf) => {
    const _path = path_1.default.join(process.cwd(), conf._config.pathRoot, conf._config.partials);
    return _path;
};
exports.default = genTemplates;
//# sourceMappingURL=genTemplates.js.map