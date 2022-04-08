"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSSGConfig = exports.createSSRConfig = exports.tryPackage = exports.tryHCL = exports.findConfig = exports.genTypedFallbacks = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const internal_1 = require("../../internal");
function genTypedFallbacks(type, args) {
    if (type === 'ssg') {
        return Object.assign(Object.assign({}, internal_1.STATIC_DEFAULTS), args);
    }
    return Object.assign(Object.assign({}, internal_1.HCL_DEFAULTS), args);
}
exports.genTypedFallbacks = genTypedFallbacks;
function findConfig(type) {
    try {
        return tryHCL(type);
    }
    catch (e) {
        return tryPackage(type);
    }
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
            return internal_1.HCL_DEFAULTS;
        }
        return type === 'ssr' ? createSSRConfig(hcl_config.ssr_config) : createSSGConfig(hcl_config.ssg_config);
    }
    catch (e) {
        return type === 'ssr' ? internal_1.HCL_DEFAULTS : internal_1.STATIC_DEFAULTS;
    }
}
exports.tryPackage = tryPackage;
function createSSRConfig(conf) {
    if (!conf)
        return findConfig('ssr');
    if (Object.keys(conf) === Object.keys(internal_1.HCL_DEFAULTS))
        return conf;
    return Object.assign(Object.assign({}, internal_1.HCL_DEFAULTS), conf);
}
exports.createSSRConfig = createSSRConfig;
function createSSGConfig(conf) {
    if (!conf)
        return findConfig('ssg');
    if (Object.keys(conf) === Object.keys(internal_1.STATIC_DEFAULTS))
        return conf;
    return Object.assign(Object.assign({}, internal_1.STATIC_DEFAULTS), conf);
}
exports.createSSGConfig = createSSGConfig;
//# sourceMappingURL=config.js.map