#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = require("./tools");
const loader_1 = require("../loader");
const static_config = tools_1.findConfig();
tools_1.ensureOutPath(static_config.outPath);
try {
    const data = tools_1.getModuleFromBase(static_config.loaderFile);
    const ctx = loader_1.Loader(Object.assign(Object.assign({}, static_config), { templateInput: data.templateInput, partialInput: data.partialInput }));
    ctx.ctx.templates.forEach(template => {
        const fileData = {
            toName: tools_1.pathify(template, static_config.outPath),
            toWrite: ctx.template(template.name)
        };
        tools_1.__write(fileData);
        return;
    });
}
catch (e) {
    console.warn(e);
}
//# sourceMappingURL=index.js.map