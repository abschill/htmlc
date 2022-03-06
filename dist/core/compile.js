"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.__renderMap = void 0;
const _1 = __importDefault(require("."));
const internals_1 = require("./internals");
const abt_1 = __importDefault(require("./abt"));
const parser_1 = __importDefault(require("./parser"));
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
function resolve(file, renderMap, insertionMap, debug) {
    let copy = file;
    const outVal = [];
    const outObj = [];
    internals_1.Debugger._registerMap(renderMap, insertionMap);
    Object.entries(renderMap).forEach((itemlist) => {
        if (itemlist[1]) {
            itemlist[1].forEach(r => {
                switch (itemlist[0]) {
                    case 'todo_keys':
                        const name = r.split('render=')[1].split('-->')[0];
                        const globals = insertionMap;
                        let replaceVal = insertionMap[name];
                        if (!replaceVal) {
                            try {
                                replaceVal = globals[name];
                            }
                            catch (e) {
                                internals_1.Debugger.raise(`Failed to find ${name} to insert into ${file}`);
                                replaceVal = '';
                            }
                        }
                        copy = copy.replace(r, replaceVal);
                        break;
                    case 'todo_loops':
                        const loopName = r.split('(')[1].split(')')[0];
                        let toInsert = insertionMap[loopName];
                        let elChild = r.replace(parser_1.default.FOR_H(loopName), '').replace(parser_1.default.FOR_T(), '')
                            .trimStart().replace(/\s\s+/gi, '');
                        toInsert === null || toInsert === void 0 ? void 0 : toInsert.forEach((insertion) => {
                            if (typeof (insertion) === 'string') {
                                outVal.push({ replacer: r, insertion: parser_1.default.replaceAnonLoopBuf({ target: elChild, key: insertion }) });
                            }
                            else if (typeof (insertion) === 'object') {
                                const entries = Object.entries(insertion);
                                if (entries.length > 0)
                                    outObj.push({ replacer: r, insertion: parser_1.default.replacedNamedLoopBuf(elChild, entries) });
                            }
                            else {
                                internals_1.Debugger.raise(`warning: insertion ${loopName} has an unrecognized value of`);
                                internals_1.Debugger.raise(insertion);
                            }
                        });
                        break;
                    case 'todo_partials':
                        break;
                    default:
                        break;
                }
            });
        }
        else {
            internals_1.Debugger.raise(`Warning: key ${itemlist} is missing a value to insert`);
        }
    });
    if (debug) {
    }
    const valStr = outVal.map((val) => val.insertion).join('');
    const objStr = outObj.map((obj) => obj.insertion).join('');
    outVal.forEach((_out) => copy = copy.replace(_out.replacer, valStr));
    outObj.forEach((_out) => copy = copy.replace(_out.replacer, objStr));
    if (debug) {
    }
    return { raw: file, renderMap, insertionMap, render: copy };
}
exports.resolve = resolve;
//# sourceMappingURL=compile.js.map