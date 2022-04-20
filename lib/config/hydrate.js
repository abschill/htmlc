"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hydrateConfig = void 0;
const util_1 = require("../util");
function cleanConfig(config) {
    return Object.keys(config) === Object.keys(util_1.__DEFAULTS__) ?
        config :
        Object.assign(Object.assign({}, util_1.__DEFAULTS__), config);
}
function hydrateConfig(config) {
    const hydrated = cleanConfig(config);
    const partials = (0, util_1.findPartials)(hydrated);
    const templates = (0, util_1.findTemplates)(hydrated);
    return (partials && templates) ? {
        config: hydrated,
        chunks: [...partials, ...templates]
    } : {
        config: hydrated,
        chunks: []
    };
}
exports.hydrateConfig = hydrateConfig;
//# sourceMappingURL=hydrate.js.map