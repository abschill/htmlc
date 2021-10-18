"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const dirTree_1 = require("./dirTree");
const engine = (config) => {
    var _a;
    const verbose = (_a = config === null || config === void 0 ? void 0 : config.debug) !== null && _a !== void 0 ? _a : false;
    if (verbose) {
        (0, logger_1.statusObj)('Config: ', config);
    }
    if (verbose) {
        (0, logger_1.statusObj)('Path Config: ', config);
    }
    const partialInput = config === null || config === void 0 ? void 0 : config.partialInput;
    const templateInput = config === null || config === void 0 ? void 0 : config.templateInput;
    if (partialInput && verbose) {
        (0, logger_1.statusObj)('Partial Initials: ', partialInput);
    }
    if (templateInput && verbose) {
        (0, logger_1.statusObj)('Template Initials: ', templateInput);
    }
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