#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ssg = void 0;
const tools_1 = require("./tools");
const __1 = require("../..");
const config_1 = require("../../config");
const util_1 = __importDefault(require("util"));
function ssg() {
    const static_config = (0, config_1.useSSGConfig)();
    process.stdout.write(util_1.default.format('\x1b[32mOutpath found: %s ✓ \x1b[0m\n', static_config.outPath) + '\n');
    (0, tools_1.ensureOutPath)(static_config.outPath);
    try {
        const ctx = (0, __1.useLoader)(static_config);
        ctx.ctx.chunks
            .filter((chunk) => chunk.type === 'template')
            .forEach((template) => {
            const fileData = {
                toName: (0, tools_1.pathify)(template, static_config.outPath),
                toWrite: ctx.template(template.name),
            };
            (0, tools_1.__write)(fileData);
            process.stdout.write(util_1.default.format('\x1b[32m%s ✓ \x1b[0m\n', 'Files Written') +
                '\n');
            return;
        });
    }
    catch (e) {
        console.warn(e);
    }
}
exports.ssg = ssg;
//# sourceMappingURL=index.js.map