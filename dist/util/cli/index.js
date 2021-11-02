#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
const conf = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'package.json')).toString('utf-8'));
const loader_1 = require("../../loader");
const file_1 = require("../file");
const { static_config = {
    "pathRoot": "views",
    "partials": "partials",
    "templates": "pages",
    "outPath": "public",
    "loaderFile": "loader.js",
    "cleanup": true
} } = conf;
const inp = require(path.join(process.cwd(), static_config.loaderFile));
const outPath = path.join(process.cwd(), static_config.outPath);
const myLoader = (0, loader_1.loader)(Object.assign(Object.assign({}, static_config), { templateInput: inp, partialInput: inp }));
const toLoad = (0, file_1._files)(path.join(process.cwd(), static_config.pathRoot, static_config.templates));
toLoad.forEach(pathToRead => {
    const nameSplit = pathToRead.split('.html');
    const nameSplit2 = nameSplit[nameSplit.length - 2].split('\\');
    const name = nameSplit2[nameSplit2.length - 1];
    if (fs.existsSync(outPath) && fs.access(outPath)) {
        fs.writeFileSync(path.resolve(outPath, `${name}.html`), myLoader.template(name));
    }
    else {
        fs.mkdirSync(outPath);
        fs.writeFileSync(path.resolve(outPath, `${name}.html`), myLoader.template(name));
    }
});
//# sourceMappingURL=index.js.map