"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hydrateChunks = exports.hydrateConfig = void 0;
const fs_1 = require("../../internal/util/fs");
const internal_1 = require("../../internal");
const clean = (config) => Object.keys(config) === Object.keys(internal_1.HCL_DEFAULTS) ?
    config :
    Object.assign(Object.assign({}, internal_1.HCL_DEFAULTS), config);
const hydrateConfig = (config) => {
    const hydrated = clean(config);
    const partials = (0, fs_1.findPartials)(hydrated);
    const templates = (0, fs_1.findTemplates)(hydrated);
    return (partials && templates) ? {
        config: hydrated,
        chunks: [...partials, ...templates]
    } : {
        config: hydrated,
        chunks: []
    };
};
exports.hydrateConfig = hydrateConfig;
const hydrateChunks = (ctx, chunks) => {
    return Object.assign(Object.assign({}, ctx), chunks);
};
exports.hydrateChunks = hydrateChunks;
//# sourceMappingURL=hydrate.js.map