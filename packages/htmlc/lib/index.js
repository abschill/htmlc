"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoader = exports.prepareChunks = exports.useConfig = exports.DefaultConfig = void 0;
const util_1 = require("./util");
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const index_1 = require("htmlc-compiler/lib/parser/index");
exports.DefaultConfig = {
    chunks: 'views',
    partials: 'partials',
    pages: 'pages',
    preloads: {},
};
function useConfig(root, options) {
    const match = (0, node_fs_1.readdirSync)(root).filter((file) => file === 'htmlc.json');
    if (match.length === 0)
        return Object.assign(Object.assign({}, exports.DefaultConfig), options);
    const file = (0, node_fs_1.readFileSync)((0, node_path_1.resolve)(root, match[0]));
    const config = JSON.parse(file.toString());
    return Object.assign(Object.assign(Object.assign({}, exports.DefaultConfig), config), options);
}
exports.useConfig = useConfig;
function prepareChunks(raw) {
    const prepared = [];
    for (const page of raw) {
        const content = (0, node_fs_1.readFileSync)(page).toString();
        const name = page.split('/').pop().split('.').shift();
        prepared.push({
            name,
            path: page,
            raw: content,
            _tokens: (0, index_1.tokenize)(content),
        });
    }
    return prepared;
}
exports.prepareChunks = prepareChunks;
function useLoader(options) {
    const cwd = process.cwd();
    const config = useConfig(cwd, options !== null && options !== void 0 ? options : {});
    const rawChunks = (0, util_1.readValidFSTree)(config.chunks);
    const rawPartials = (0, util_1.readValidFSTree)((0, node_path_1.join)(config.chunks, config.partials));
    const rawPages = (0, util_1.readValidFSTree)((0, node_path_1.join)(config.chunks, config.pages));
    const chunkData = {
        pages: prepareChunks(rawPages),
        partials: prepareChunks(rawPartials),
    };
    return {
        config,
        _basePath: cwd,
        _chunkData: chunkData,
        _rawChunks: rawChunks,
        _rawPartials: rawPartials,
        _rawPages: rawPages,
        _ffOptions: options,
    };
}
exports.useLoader = useLoader;
//# sourceMappingURL=index.js.map