"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hydrateRuntimeConfig = void 0;
const htmlc_config_1 = require("htmlc-config");
const util_1 = require("../util");
function hydrateRuntimeConfig(config) {
    const hydrated = (0, htmlc_config_1.useSSRConfig)(config);
    const partials = (0, util_1.usePartials)(hydrated);
    const templates = (0, util_1.useTemplates)(hydrated);
    return partials && templates
        ? {
            config: hydrated,
            chunks: [...partials, ...templates],
        }
        : {
            config: hydrated,
            chunks: [],
        };
}
exports.hydrateRuntimeConfig = hydrateRuntimeConfig;
__exportStar(require("htmlc-config"), exports);
//# sourceMappingURL=index.js.map