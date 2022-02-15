"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./file");
exports.default = (config) => ({
    config,
    partials: (0, file_1.resolvePartials)(config),
    templates: (0, file_1.resolveTemplates)(config)
});
//# sourceMappingURL=options.js.map