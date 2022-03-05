"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./file");
const internals_1 = require("../core/internals");
exports.default = (config) => {
    const hydrated = __clean(config);
    return {
        config: hydrated,
        partials: (0, file_1.resolvePartials)(config),
        templates: (0, file_1.resolveTemplates)(config)
    };
};
const __clean = (config) => Object.keys(config) === Object.keys(internals_1._DEFAULTS) ?
    config :
    Object.assign(Object.assign({}, internals_1._DEFAULTS), config);
//# sourceMappingURL=options.js.map