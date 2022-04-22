#!/usr/bin/env node
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConfigCLI = void 0;
const config_1 = require("../../config");
function findConfigCLI(mode) {
    return (0, config_1.findConfig)(mode);
}
exports.findConfigCLI = findConfigCLI;
console.log('\x1b[42mhtml-chunk-loader config found\x1b[0m:\n');
console.log(findConfigCLI((_a = process.argv[2]) !== null && _a !== void 0 ? _a : 'ssr'));
//# sourceMappingURL=index.js.map