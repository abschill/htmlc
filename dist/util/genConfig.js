"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_1 = __importDefault(require("../default"));
const logger_1 = require("./logger");
const dirTree_1 = require("./dirTree");
const engine = (config) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const verbose = (_a = config === null || config === void 0 ? void 0 : config.debug) !== null && _a !== void 0 ? _a : false;
    if (verbose) {
        (0, logger_1.statusObj)('Config: ', config);
    }
    const _config = {
        pathRoot: (_c = (_b = config === null || config === void 0 ? void 0 : config._config) === null || _b === void 0 ? void 0 : _b.pathRoot) !== null && _c !== void 0 ? _c : default_1.default === null || default_1.default === void 0 ? void 0 : default_1.default.pathRoot,
        templates: (_e = (_d = config === null || config === void 0 ? void 0 : config._config) === null || _d === void 0 ? void 0 : _d.templates) !== null && _e !== void 0 ? _e : default_1.default === null || default_1.default === void 0 ? void 0 : default_1.default.templates,
        partials: (_g = (_f = config === null || config === void 0 ? void 0 : config._config) === null || _f === void 0 ? void 0 : _f.partials) !== null && _g !== void 0 ? _g : default_1.default === null || default_1.default === void 0 ? void 0 : default_1.default.partials,
    };
    if (verbose) {
        (0, logger_1.statusObj)('Path Config: ', _config);
    }
    const partialInput = config === null || config === void 0 ? void 0 : config.partialInput;
    const templateInput = config === null || config === void 0 ? void 0 : config.templateInput;
    if (partialInput && verbose) {
        (0, logger_1.statusObj)('Partial Initials: ', partialInput);
    }
    if (templateInput && verbose) {
        (0, logger_1.statusObj)('Template Initials: ', templateInput);
    }
    const partials = (0, dirTree_1.resolvePartials)(_config);
    console.log(partials);
};
exports.default = engine;
//# sourceMappingURL=genConfig.js.map