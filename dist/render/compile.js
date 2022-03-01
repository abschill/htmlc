"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stamp_1 = require("../util/stamp");
const _1 = __importDefault(require("."));
const internals_1 = require("./internals");
function compile(args) {
    const { templateInput = {}, partialInput = {} } = args.ctx.config;
    if (!args.data)
        args.data = {};
    if (args.ctx.config.debug) {
    }
    internals_1.hclDebugger._registerEvent('init', args.ctx, arguments);
    const globalInsertions = templateInput;
    if (Object.keys(args.data).length === 0) {
        if (Object.keys(templateInput).includes(args.template_name)) {
            const insertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            if (args.ctx.config.debug)
                (0, stamp_1.stampLog)(insertions, 'spread::args|compile.ts#L35');
            const fileMeta = args.ctx.templates.filter(temp => temp.name === args.template_name)[0];
            const { rawFile } = fileMeta;
            const out = (0, _1.default)(args.ctx.partials, rawFile, insertions, args.ctx.config.debug);
            return out;
        }
        else {
            const insertions = Object.assign(Object.assign({}, globalInsertions), { partialInput });
            if (args.ctx.config.debug)
                (0, stamp_1.stampLog)(insertions, 'insertion::args|compile.ts#L44');
            const fileMeta = args.ctx.templates.filter(temp => temp.name === args.template_name)[0];
            const { rawFile } = fileMeta;
            const out = (0, _1.default)(args.ctx.partials, rawFile, insertions, args.ctx.config.debug);
            return out;
        }
    }
    else {
        const scopedInsertions = Object.assign(Object.assign({}, templateInput), args.data);
        const insertions = Object.assign(Object.assign(Object.assign({}, globalInsertions), scopedInsertions), { partialInput: Object.assign(Object.assign({}, partialInput), args.data['partialInput']) });
        if (args.ctx.config.debug)
            (0, stamp_1.stampLog)(insertions, 'insertion::args|compile.ts#L67');
        const fileMeta = args.ctx.templates.filter(temp => temp.name === args.template_name)[0];
        const { rawFile } = fileMeta;
        const out = (0, _1.default)(args.ctx.partials, rawFile, insertions, args.ctx.config.debug);
        return out;
    }
}
exports.default = compile;
//# sourceMappingURL=compile.js.map