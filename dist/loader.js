"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const init_1 = __importDefault(require("./init"));
const fs_1 = require("fs");
const internals_1 = require("./core/internals");
const debugger_1 = __importDefault(require("./core/internals/debugger"));
const compile_1 = __importDefault(require("./core/compile"));
__exportStar(require("./core/internals/types"), exports);
function Loader(config) {
    let ctx = init_1.default(config !== null && config !== void 0 ? config : internals_1._DEFAULTS);
    if (ctx.config.watch) {
        ctx.partials.forEach(file => {
            fs_1.watch(file.path, (eventType, filename) => {
                if (eventType === 'change') {
                    debugger_1.default._registerEvent(`Modified ${filename}, refresh browser to apply changes`, ctx);
                    ctx = init_1.default(config !== null && config !== void 0 ? config : internals_1._DEFAULTS);
                }
            });
        });
        ctx.templates.forEach(file => {
            fs_1.watch(file.path, (eventType, filename) => {
                if (eventType === 'change') {
                    debugger_1.default._registerEvent(`Modified ${filename}, refresh browser to apply changes`, ctx);
                    ctx = init_1.default(config !== null && config !== void 0 ? config : internals_1._DEFAULTS);
                }
            });
        });
    }
    function template(name, data) {
        return compile_1.default.compile({ template_name: name, ctx, data });
    }
    return { ctx, template };
}
exports.Loader = Loader;
//# sourceMappingURL=loader.js.map