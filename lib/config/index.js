"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDebug = exports.hydrateRuntimeConfig = exports.findSSGConfig = exports.findSSRConfig = exports.tryPackage = exports.tryHCL = exports.findConfig = exports.genTypedFallbacks = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const util_1 = require("../util");
function genTypedFallbacks(type, args) {
    return type === 'ssg' ? Object.assign(Object.assign({}, util_1.SSG_DEFAULTS), args) : Object.assign(Object.assign({}, util_1.SSR_DEFAULTS), args);
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
        return type === 'ssr' ? findSSRConfig(hcl_config.ssr_config) : findSSGConfig(hcl_config.ssg_config);
    }
    catch (e) {
        return type === 'ssr' ? util_1.SSR_DEFAULTS : util_1.SSR_DEFAULTS;
    }
}
exports.tryPackage = tryPackage;
function findSSRConfig(conf) {
    if (!conf)
        return findConfig('ssr');
    if (Object.keys(conf) === Object.keys(util_1.SSR_DEFAULTS))
        return conf;
    return Object.assign(Object.assign({}, util_1.SSR_DEFAULTS), conf);
}
exports.findSSRConfig = findSSRConfig;
function findSSGConfig(conf) {
    if (!conf)
        return findConfig('ssg');
    if (Object.keys(conf) === Object.keys(util_1.SSG_DEFAULTS))
        return conf;
    return Object.assign(Object.assign({}, util_1.SSG_DEFAULTS), conf);
}
exports.findSSGConfig = findSSGConfig;
function hydrateRuntimeConfig(config) {
    const hydrated = findSSRConfig(config);
    const partials = (0, util_1.findPartials)(hydrated);
    const templates = (0, util_1.findTemplates)(hydrated);
    return (partials && templates) ? {
        config: hydrated,
        chunks: [...partials, ...templates]
    } : {
        config: hydrated,
        chunks: []
    };
}
exports.hydrateRuntimeConfig = hydrateRuntimeConfig;
function getDebug(opt) {
    if (typeof opt === 'boolean')
        return opt === true ? util_1.DEBUG_BOOLTRUE : util_1.DEBUG_DEFAULTS;
    return Object.assign(Object.assign({}, util_1.DEBUG_DEFAULTS), opt);
}
exports.getDebug = getDebug;
//# sourceMappingURL=index.js.map