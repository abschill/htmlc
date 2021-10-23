"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dirTree_1 = require("./dirTree");
const engine = (config) => {
    const partials = (0, dirTree_1.resolvePartials)(config);
    const templates = (0, dirTree_1.resolveTemplates)(config);
    return {
        config,
        partials,
        templates
    };
};
exports.default = engine;
//# sourceMappingURL=engine.js.map