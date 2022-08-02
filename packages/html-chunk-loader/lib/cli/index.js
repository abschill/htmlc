#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find_config_1 = require("./find-config");
const quickstart_1 = require("./quickstart");
const ssg_1 = require("./ssg");
const terminal_color_1 = require("terminal-color");
switch (process.argv[2]) {
    case 'quickstart':
        (0, quickstart_1.quickstart)();
        break;
    case 'ssg':
        (0, ssg_1.ssg)();
        break;
    case 'find-config':
        console.log('ssg:');
        (0, find_config_1.findConfigCLI)('ssg');
        console.log('ssr:');
        (0, find_config_1.findConfigCLI)('ssr');
        break;
    default:
        console.log(terminal_color_1.color.fg.red('no command entered: ["locate-config", "quickstart", "ssg"]'));
        break;
}
//# sourceMappingURL=index.js.map