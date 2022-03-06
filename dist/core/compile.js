"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.__renderMap = void 0;
const _1 = __importDefault(require("."));
const internals_1 = require("./internals");
const abt_1 = __importDefault(require("./abt"));
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
function __renderMap(content) {
    const _map = {
        todo_keys: [],
        todo_loops: [],
        todo_partials: []
    };
    abt_1.default.forEach(token => {
        const keymap = token.array(content);
        switch (token.key) {
            case '@render':
                keymap ? _map.todo_keys = keymap : _map.todo_keys = [];
                break;
            case '@for':
                keymap ? _map.todo_loops = keymap : _map.todo_loops = [];
                break;
            case '@partial':
                keymap ? _map.todo_partials = keymap : _map.todo_partials = [];
                break;
            default:
                break;
        }
    });
    return _map;
}
exports.__renderMap = __renderMap;
//# sourceMappingURL=compile.js.map