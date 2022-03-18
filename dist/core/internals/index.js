"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULTS = exports._DEFAULTS = void 0;
exports._DEFAULTS = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    watch: false,
    debug: false
};
exports.DEFAULTS = Object.assign(Object.assign({}, exports._DEFAULTS), { _publishDefault: 'dist', outDefault: 'public', static_config: {
        pathRoot: 'views',
        partials: 'partials',
        templates: 'pages',
        outPath: 'public',
        loaderFile: 'loader.js',
        cleanup: true
    } });
//# sourceMappingURL=index.js.map