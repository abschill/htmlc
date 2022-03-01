"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hclDebugger = exports._DEFAULTS = exports.DEFAULTS = void 0;
;
exports.DEFAULTS = {
    "_publishDefault": "dist",
    "pathRoot": "views",
    "partials": "partials",
    "templates": "pages",
    "outDefault": "public",
    "static_config": {
        "pathRoot": "views",
        "partials": "partials",
        "templates": "pages",
        "outPath": "public",
        "loaderFile": "loader.js",
        "cleanup": true
    }
};
exports._DEFAULTS = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    watch: true
};
const { log } = console;
class hclDebugger {
    constructor() { }
    static _registerEvent(...args) {
        const eventName = args[0];
        const templateName = args[2]['0'].template_name;
        const contextData = args[2]['0'].ctx;
        if (args[1].config.debug) {
            log('HCL_EVENT: ', eventName);
            log('HCL_TEMPLATE: ', templateName);
            log('HCL_CTX: ', contextData);
        }
    }
}
exports.hclDebugger = hclDebugger;
;
//# sourceMappingURL=internals.js.map