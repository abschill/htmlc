#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findConfigCLI = void 0;
const htmlc_config_1 = require("htmlc-config");
const findConfigCLI = (mode) => {
    const config = (0, htmlc_config_1.useConfig)(mode);
    console.log('\x1b[32mhtml-chunk-loader config found\x1b[0m:\n');
    console.log(config);
};
exports.findConfigCLI = findConfigCLI;
//# sourceMappingURL=index.js.map