"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./internals/util/file");
const internals_1 = require("./internals");
const clean = (config) => Object.keys(config) === Object.keys(internals_1._DEFAULTS) ?
    config :
    Object.assign(Object.assign({}, internals_1._DEFAULTS), config);
exports.default = (config) => {
    const hydrated = clean(config);
    const partials = file_1.fsUtil.resolvePartials(config);
    const templates = file_1.fsUtil.resolveTemplates(config);
    return (partials && templates) ? {
        config: hydrated,
        partials,
        templates
    } : {
        config: hydrated,
        partials: [],
        templates: []
    };
};
//# sourceMappingURL=hydrate.js.map