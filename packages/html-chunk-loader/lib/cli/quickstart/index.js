#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quickstart = void 0;
const htmlc_config_1 = require("htmlc-config");
const fs_1 = require("fs");
const path_1 = require("path");
const { log } = console;
const demoChunks = [
    {
        type: 'partial',
        filename: 'head.html',
        content: '<head><title>Hello World</title></head>',
    },
    {
        type: 'template',
        filename: 'home.html',
        content: '<!--@partial=head--><main><h1>My HTML Template</h1></main>',
    },
];
function createPath(path) {
    log(`Creating Directory at ${path}`);
    (0, fs_1.mkdirSync)(path);
}
function quickstart() {
    const { pathRoot, partials, templates } = htmlc_config_1.__DEFAULTS__;
    const joinedRoot = (0, path_1.join)(process.cwd(), pathRoot);
    const joinedPartials = (0, path_1.join)(joinedRoot, partials);
    const joinedTemplates = (0, path_1.join)(joinedRoot, templates);
    if (!(0, fs_1.existsSync)(joinedRoot))
        createPath(joinedRoot);
    if (!(0, fs_1.existsSync)(joinedPartials))
        createPath(joinedPartials);
    if (!(0, fs_1.existsSync)(joinedTemplates))
        createPath(joinedTemplates);
    demoChunks.forEach((chunk) => {
        if (chunk.type === 'partial') {
            const partial = (0, path_1.resolve)(joinedPartials, chunk.filename);
            if (!(0, fs_1.existsSync)(partial))
                (0, fs_1.writeFileSync)(partial, chunk.content);
        }
        else {
            const template = (0, path_1.resolve)(joinedTemplates, chunk.filename);
            if (!(0, fs_1.existsSync)(template))
                (0, fs_1.writeFileSync)(template, chunk.content);
        }
    });
    const configFile = (0, path_1.resolve)(process.cwd(), 'hcl-config.js');
    if (!(0, fs_1.existsSync)(configFile)) {
        const jsonString = JSON.stringify(htmlc_config_1.FULL_DEFAULTS, null, 4);
        const moduleString = `module.exports = ${jsonString}`;
        (0, fs_1.writeFileSync)(configFile, moduleString);
    }
    log('Done.');
}
exports.quickstart = quickstart;
//# sourceMappingURL=index.js.map