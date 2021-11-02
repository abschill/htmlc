"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = require("./file");
const context = (config) => {
    const partials = (0, file_1.resolvePartials)(config);
    const templates = (0, file_1.resolveTemplates)(config);
    return {
        config,
        partials,
        templates
    };
};
exports.default = context;
//# sourceMappingURL=engine.js.map