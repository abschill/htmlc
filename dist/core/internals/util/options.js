"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./file");
const __1 = require("..");
exports.default = (config) => {
    const hydrated = __clean(config);
    return {
        config: hydrated,
        partials: file_1.fsUtil.resolvePartials(config),
        templates: file_1.fsUtil.resolveTemplates(config)
    };
};
const __clean = (config) => Object.keys(config) === Object.keys(__1._DEFAULTS) ?
    config :
    Object.assign(Object.assign({}, __1._DEFAULTS), config);
//# sourceMappingURL=options.js.map