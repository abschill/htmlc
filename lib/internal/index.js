"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FULL_DEFAULTS = exports.STATIC_DEFAULTS = exports.HCL_DEFAULTS = exports.RT_DEFAULTS = exports.DEFAULT_PATHS = void 0;
exports.DEFAULT_PATHS = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials'
};
exports.RT_DEFAULTS = {
    templateInput: {},
    partialInput: {},
    preload: true,
    discoverPaths: false,
    intlCode: 'en',
    debug: {
        logMode: 'silent',
        logStrategy: 'none'
    }
};
exports.HCL_DEFAULTS = Object.assign(Object.assign(Object.assign({}, exports.DEFAULT_PATHS), exports.RT_DEFAULTS), { watch: false, errorSuppression: false });
exports.STATIC_DEFAULTS = Object.assign(Object.assign(Object.assign({}, exports.DEFAULT_PATHS), exports.RT_DEFAULTS), { outPath: 'public', loaderFile: 'hcl-config.js', cleanup: true });
exports.FULL_DEFAULTS = {
    ssr_config: exports.HCL_DEFAULTS,
    ssg_config: exports.STATIC_DEFAULTS,
    fallbacks: {}
};
//# sourceMappingURL=index.js.map