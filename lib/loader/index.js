"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoader = void 0;
const hydrate_1 = require("../modules/core/hydrate");
const fs_1 = require("fs");
const debugger_1 = __importDefault(require("../internal/debugger"));
const compiler_1 = __importDefault(require("../modules/compiler"));
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
    if (hcl_config.preload)
        ctx.chunks = compiler_1.default.preloadChunksV5(ctx);
    function template(name, data) {
        return compiler_1.default.compileTemplateV1({
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