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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoader = void 0;
const Config = __importStar(require("../config"));
const fs_1 = require("fs");
const debugger_1 = require("../util/debugger");
const Compiler = __importStar(require("../compiler"));
const util_1 = require("../util");
function createLoader(u_config) {
    const hcl_config = Config.createSSRConfig(u_config);
    let dbg = null;
    if (typeof hcl_config.debug === 'boolean' && hcl_config.debug === true) {
        const o = Object.assign(Object.assign({}, hcl_config), { debug: util_1.DEBUG_BOOLTRUE });
        dbg = (0, debugger_1.createDebugger)(o);
    }
    else if (!hcl_config.debug && typeof hcl_config.debug === 'object') {
        dbg = (0, debugger_1.createDebugger)(Object.assign({ debug: util_1.DEBUG_DEFAULTS }, hcl_config));
    }
    else if (!hcl_config.debug) {
        dbg = null;
    }
    let ctx = Config.hydrateConfig(hcl_config);
    if (ctx.config.watch) {
        ctx.chunks.forEach(file => {
            (0, fs_1.watch)(file.path, (eventType, filename) => {
                if (eventType === 'change') {
                    if (ctx.config.debug === true
                        || ctx.config.debug
                            && (typeof ctx.config.debug !== 'boolean'
                                && ctx.config.debug.logMode !== 'silent'))
                        dbg.log('file:change', `Chunk Updated at: ${filename}`);
                    ctx = Config.hydrateConfig(hcl_config);
                }
            });
        });
    }
    function template(name, data) {
        return Compiler.compile({
            templateName: name,
            ctx: ctx,
            callData: data,
            debugger: dbg
        });
    }
    return { ctx, template };
}
exports.createLoader = createLoader;
//# sourceMappingURL=index.js.map