"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoader = exports.useLoader = void 0;
const config_1 = require("./config");
const fs_1 = require("fs");
const debugger_1 = require("./util/debugger");
const htmlc_compiler_1 = require("htmlc-compiler");
const htmlc_config_1 = require("htmlc-config");
function useLoader(config) {
    const hcl_config = (0, config_1.useSSRConfig)(config);
    let dbg = null;
    if (typeof hcl_config.debug === 'boolean' && hcl_config.debug === true) {
        const o = Object.assign(Object.assign({}, hcl_config), { debug: htmlc_config_1.DEBUG_BOOLTRUE });
        dbg = (0, debugger_1.createDebugger)(o);
    }
    else if (!hcl_config.debug || typeof hcl_config.debug === 'object') {
        dbg = (0, debugger_1.createDebugger)(Object.assign({ debug: htmlc_config_1.DEBUG_DEFAULTS }, hcl_config));
    }
    let ctx = (0, config_1.hydrateRuntimeConfig)(hcl_config);
    if (ctx.config.watch) {
        ctx.chunks.forEach(file => {
            (0, fs_1.watch)(file.path, (eventType, filename) => {
                if (eventType === 'change') {
                    if (ctx.config.debug === true
                        || ctx.config.debug
                            && (typeof ctx.config.debug !== 'boolean'
                                && ctx.config.debug.logMode !== 'silent'))
                        dbg.log('file:change', `Chunk Updated at: ${filename}`);
                    ctx = (0, config_1.hydrateRuntimeConfig)(hcl_config);
                }
            });
        });
    }
    function template(name, data) {
        try {
            return (0, htmlc_compiler_1.compile)({
                templateName: name,
                ctx: ctx,
                callData: data,
                debugger: dbg
            });
        }
        catch (e) {
            return `HTMLC Render Error: ${JSON.stringify(e)}`;
        }
    }
    return { ctx, template };
}
exports.useLoader = useLoader;
function createLoader(u_config) {
    return useLoader(u_config);
}
exports.createLoader = createLoader;
//# sourceMappingURL=index.js.map