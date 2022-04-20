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
exports.createSSGConfig = exports.createSSRConfig = exports.tryPackage = exports.tryHCL = exports.findConfig = exports.genTypedFallbacks = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const util_1 = require("../util");
function genTypedFallbacks(type, args) {
    if (type === 'ssg') {
        return Object.assign(Object.assign({}, util_1.SSG_DEFAULTS), args);
    }
    return Object.assign(Object.assign({}, util_1.SSR_DEFAULTS), args);
}
exports.genTypedFallbacks = genTypedFallbacks;
function findConfig(type) {
    return (0, util_1.wrap)(() => tryHCL(type), () => tryPackage(type));
}
exports.findConfig = findConfig;
function tryHCL(type) {
    const sig = `${type}_config`;
    const jsPath = (0, path_1.resolve)(process.cwd(), 'hcl-config.js');
    if ((0, fs_1.existsSync)(jsPath)) {
        return genTypedFallbacks(type, require(jsPath)[`${sig}`]);
    }
    else {
        const jsonPath = (0, path_1.resolve)(process.cwd(), 'hcl-config.json');
        if ((0, fs_1.existsSync)(jsonPath)) {
            return genTypedFallbacks(type, require(jsonPath)[`${sig}`]);
        }
        else {
            throw new Error('Config Path Error');
        }
    }
}
exports.tryHCL = tryHCL;
function tryPackage(type) {
    try {
        const { hcl_config } = require((0, path_1.resolve)(process.cwd(), 'package.json'));
        if (!hcl_config.ssr_config) {
            return util_1.SSR_DEFAULTS;
        }
        return type === 'ssr' ? createSSRConfig(hcl_config.ssr_config) : createSSGConfig(hcl_config.ssg_config);
    }
    catch (e) {
        return type === 'ssr' ? util_1.SSR_DEFAULTS : util_1.SSR_DEFAULTS;
    }
}
exports.tryPackage = tryPackage;
function createSSRConfig(conf) {
    if (!conf)
        return findConfig('ssr');
    if (Object.keys(conf) === Object.keys(util_1.SSR_DEFAULTS))
        return conf;
    return Object.assign(Object.assign({}, util_1.SSR_DEFAULTS), conf);
}
exports.createSSRConfig = createSSRConfig;
function createSSGConfig(conf) {
    if (!conf)
        return findConfig('ssg');
    if (Object.keys(conf) === Object.keys(util_1.SSG_DEFAULTS))
        return conf;
    return Object.assign(Object.assign({}, util_1.SSG_DEFAULTS), conf);
}
exports.createSSGConfig = createSSGConfig;
__exportStar(require("./hydrate"), exports);
__exportStar(require("./check-debug"), exports);
//# sourceMappingURL=index.js.map