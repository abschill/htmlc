"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dirTree_1 = require("./dirTree");
const engine = (config) => {
    var _a, _b, _c;
    const verbose = (_a = config === null || config === void 0 ? void 0 : config.debug) !== null && _a !== void 0 ? _a : false;
    const partialInput = (_b = config === null || config === void 0 ? void 0 : config.partialInput) !== null && _b !== void 0 ? _b : {};
    const templateInput = (_c = config === null || config === void 0 ? void 0 : config.templateInput) !== null && _c !== void 0 ? _c : {};
    const partials = (0, dirTree_1.resolvePartials)(config);
    const templates = (0, dirTree_1.resolveTemplates)(config);
    const ctx = {
        config,
        partials,
        templates
    };
    const options = {
        partialInput,
        templateInput,
        debug: verbose
    };
    return { ctx, options };
};
exports.default = engine;
//# sourceMappingURL=engine.js.map