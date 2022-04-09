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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoader = void 0;
const hydrate_1 = require("../modules/core/hydrate");
const fs_1 = require("fs");
const debugger_1 = __importDefault(require("../internal/debugger"));
const Compiler = __importStar(require("../modules/compiler/v2"));
const config_1 = require("../modules/core/config");
function createLoader(u_config) {
    const hcl_config = (0, config_1.createSSRConfig)(u_config);
    const dbg = (0, debugger_1.default)(hcl_config);
    let ctx = (0, hydrate_1.hydrateConfig)(hcl_config);
    if (ctx.config.watch) {
        dbg.event('watch:init', 'watch enabled');
        ctx.chunks.forEach(file => {
            (0, fs_1.watch)(file.path, (eventType, filename) => {
                if (eventType === 'change') {
                    dbg.event('file:change', filename);
                    ctx = (0, hydrate_1.hydrateConfig)(hcl_config);
                }
            });
        });
    }
    function template(name, data) {
        return Compiler.compile({
            template_name: name,
            caller_ctx: ctx,
            caller_data: data,
            debug: dbg
        });
    }
    return {
        ctx,
        template
    };
}
exports.createLoader = createLoader;
//# sourceMappingURL=index.js.map