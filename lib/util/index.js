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
exports.FULL_DEFAULTS = exports.SSG_DEFAULTS = exports.SSR_DEFAULTS = exports.__DEFAULTS__ = exports.DEBUG_BOOLTRUE = exports.DEBUG_DEFAULTS = void 0;
const types_1 = require("../types");
exports.DEBUG_DEFAULTS = {
    logMode: 'silent',
    logStrategy: 'silent',
    logFile: null
};
exports.DEBUG_BOOLTRUE = {
    logMode: 'verbose',
    logStrategy: 'stdout',
    logFile: null
};
exports.__DEFAULTS__ = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    discoverPaths: true,
    intlCode: (0, types_1.toLocale)('en'),
    errorSuppression: false,
    debug: exports.DEBUG_DEFAULTS
};
exports.SSR_DEFAULTS = Object.assign(Object.assign({}, exports.__DEFAULTS__), { watch: false });
exports.SSG_DEFAULTS = Object.assign(Object.assign({}, exports.__DEFAULTS__), { outPath: 'public', loaderFile: 'hcl-config.js', cleanup: true });
exports.FULL_DEFAULTS = {
    ssr_config: exports.SSR_DEFAULTS,
    ssg_config: exports.SSG_DEFAULTS,
    fallbacks: {}
};
__exportStar(require("./color-escape"), exports);
__exportStar(require("./fs"), exports);
__exportStar(require("./html"), exports);
__exportStar(require("./event-map"), exports);
__exportStar(require("./wrap-fn"), exports);
//# sourceMappingURL=index.js.map