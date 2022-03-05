"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const internals_1 = require("./internals");
function compile(args) {
    const { templateInput = {}, partialInput = {} } = args.ctx.config;
    if (!args.data)
        args.data = {};
    internals_1.Debugger._registerEvent('init', args.ctx, arguments);
    const globalInsertions = templateInput;
    if (Object.keys(args.data).length === 0) {
        if (Object.keys(templateInput).includes(args.template_name)) {
            const insertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            internals_1.Debugger._registerEvent('insert', args.ctx, arguments);
            const { rawFile } = args.ctx.templates.filter(temp => temp.name === args.template_name)[0];
            return (0, _1.default)(args.ctx.partials, rawFile, insertions, args.ctx.config.debug);
        }
        else {
            const insertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            internals_1.Debugger._registerEvent('template::insert:args', args.ctx, arguments);
            const { rawFile } = args.ctx.templates.filter(temp => temp.name === args.template_name)[0];
            return (0, _1.default)(args.ctx.partials, rawFile, insertions, args.ctx.config.debug);
        }
    }
    else {
        const scopedInsertions = Object.assign(Object.assign({}, templateInput), args.data);
        const insertions = Object.assign(Object.assign(Object.assign({}, globalInsertions), scopedInsertions), { partialInput: Object.assign(Object.assign({}, partialInput), args.data['partialInput']) });
        internals_1.Debugger._registerEvent('insert', args.ctx, arguments);
        const { rawFile } = args.ctx.templates.filter(temp => temp.name === args.template_name)[0];
        return (0, _1.default)(args.ctx.partials, rawFile, insertions, args.ctx.config.debug);
    }
}
exports.default = compile;
//# sourceMappingURL=compile.js.map