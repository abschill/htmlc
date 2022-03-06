"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Debugger = exports.DEFAULTS = exports._DEFAULTS = void 0;
exports._DEFAULTS = {
    pathRoot: 'views',
    templates: 'pages',
    partials: 'partials',
    templateInput: {},
    partialInput: {},
    watch: false,
    debug: false
};
exports.DEFAULTS = Object.assign(Object.assign({}, exports._DEFAULTS), { _publishDefault: "dist", outDefault: "public", static_config: {
        pathRoot: 'views',
        partials: 'partials',
        templates: 'pages',
        outPath: 'public',
        loaderFile: 'loader.js',
        cleanup: true
    } });
const { log, warn } = console;
class Debugger {
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
    static raise(m) {
        warn(m);
    }
    static _registerMap(rmap, imap) {
        log('HCL_EVENT: map::register');
        log(rmap);
        log(imap);
    }
}
exports.Debugger = Debugger;
//# sourceMappingURL=internals.js.map